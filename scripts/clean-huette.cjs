const fs = require('fs');

function cleanHuette(inputFile, outputFile) {
  const buf = fs.readFileSync(inputFile);
  const jsonLen = buf.readUInt32LE(12);
  const gltf = JSON.parse(buf.toString('utf8', 20, 20 + jsonLen));
  const binOffset = 20 + jsonLen + 8;

  const prim = gltf.meshes[0].primitives[0];
  const posAcc = gltf.accessors[prim.attributes.POSITION];
  const normAcc = gltf.accessors[prim.attributes.NORMAL];
  const uvAcc = gltf.accessors[prim.attributes.TEXCOORD_0];
  const idxAcc = gltf.accessors[prim.indices];

  const posBv = gltf.bufferViews[posAcc.bufferView];
  const normBv = gltf.bufferViews[normAcc.bufferView];
  const uvBv = gltf.bufferViews[uvAcc.bufferView];
  const idxBv = gltf.bufferViews[idxAcc.bufferView];

  const posStart = binOffset + (posBv.byteOffset || 0) + (posAcc.byteOffset || 0);
  const normStart = binOffset + (normBv.byteOffset || 0) + (normAcc.byteOffset || 0);
  const uvStart = binOffset + (uvBv.byteOffset || 0) + (uvAcc.byteOffset || 0);
  const idxStart = binOffset + (idxBv.byteOffset || 0) + (idxAcc.byteOffset || 0);

  const oldVertCount = posAcc.count;
  const oldTriCount = idxAcc.count / 3;

  // Lese alle Vertices, Normalen und UVs
  const oldVerts = [];
  for (let i = 0; i < oldVertCount; i++) {
    oldVerts.push({
      x: buf.readFloatLE(posStart + i * 12),
      y: buf.readFloatLE(posStart + i * 12 + 4),
      z: buf.readFloatLE(posStart + i * 12 + 8),
      nx: buf.readFloatLE(normStart + i * 12),
      ny: buf.readFloatLE(normStart + i * 12 + 4),
      nz: buf.readFloatLE(normStart + i * 12 + 8),
      u: buf.readFloatLE(uvStart + i * 8),
      v: buf.readFloatLE(uvStart + i * 8 + 4)
    });
  }

  // Identifiziere Tisch & halbes Fahrrad: x <= -0.10, z >= 0.33, y <= 0.25
  const isTableVertex = (v) => {
    return v.x <= -0.10 && v.z >= 0.33 && v.y <= 0.25;
  };

  const oldTris = [];
  for (let i = 0; i < oldTriCount; i++) {
    let a, b, c;
    if (idxAcc.componentType === 5123) {
      a = buf.readUInt16LE(idxStart + i * 6);
      b = buf.readUInt16LE(idxStart + i * 6 + 2);
      c = buf.readUInt16LE(idxStart + i * 6 + 4);
    } else {
      a = buf.readUInt32LE(idxStart + i * 12);
      b = buf.readUInt32LE(idxStart + i * 12 + 4);
      c = buf.readUInt32LE(idxStart + i * 12 + 8);
    }
    oldTris.push([a, b, c]);
  }

  // Filtere Dreiecke: Behalte nur Dreiecke, die KEINEN Tisch-Vertex enthalten
  const keptTris = [];
  const keptVertexFlags = new Uint8Array(oldVertCount);

  for (const [a, b, c] of oldTris) {
    if (isTableVertex(oldVerts[a]) || isTableVertex(oldVerts[b]) || isTableVertex(oldVerts[c])) {
      continue; // Entferne Tisch-/Fahrrad-Dreieck
    }
    keptTris.push([a, b, c]);
    keptVertexFlags[a] = 1;
    keptVertexFlags[b] = 1;
    keptVertexFlags[c] = 1;
  }

  console.log(`Original: ${oldVertCount} Verts, ${oldTriCount} Dreiecke`);
  console.log(`Bereinigt: ${keptTris.length} Dreiecke behalten (${oldTriCount - keptTris.length} Dreiecke entfernt)`);

  // Erstelle neue Vertices und Index-Mapping
  const newIndexMap = new Int32Array(oldVertCount).fill(-1);
  const newVerts = [];

  for (let i = 0; i < oldVertCount; i++) {
    if (keptVertexFlags[i]) {
      newIndexMap[i] = newVerts.length;
      newVerts.push(oldVerts[i]);
    }
  }

  console.log(`Neue Vertices: ${newVerts.length} (${oldVertCount - newVerts.length} entfernt)`);

  // Erstelle neue Index-Liste
  const newTris = keptTris.map(([a, b, c]) => [newIndexMap[a], newIndexMap[b], newIndexMap[c]]);

  // Berechne Bounding Box der neuen Vertices
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;

  for (const v of newVerts) {
    if (v.x < minX) minX = v.x; if (v.x > maxX) maxX = v.x;
    if (v.y < minY) minY = v.y; if (v.y > maxY) maxY = v.y;
    if (v.z < minZ) minZ = v.z; if (v.z > maxZ) maxZ = v.z;
  }
  console.log('Neue Bounding Box:');
  console.log('X:', [minX, maxX]);
  console.log('Y:', [minY, maxY]);
  console.log('Z:', [minZ, maxZ]);

  // Baue neuen Binärpuffer:
  // Layout in Originaldatei:
  // BV 0: Image (BaseColor)
  // BV 1: POSITIONS
  // BV 2: NORMALS
  // BV 3: TEXCOORDS
  // BV 4: INDICES
  // Prüfen wir das Layout in Originaldatei:
  const imgBv = gltf.bufferViews[gltf.images[0].bufferView];
  const imgData = buf.subarray(binOffset + (imgBv.byteOffset || 0), binOffset + (imgBv.byteOffset || 0) + imgBv.byteLength);

  function pad4(len) {
    const rem = len % 4;
    return rem === 0 ? len : len + (4 - rem);
  }

  // Neue Buffer-Bestandteile
  const posBuf = Buffer.alloc(newVerts.length * 12);
  const normBuf = Buffer.alloc(newVerts.length * 12);
  const uvBuf = Buffer.alloc(newVerts.length * 8);

  for (let i = 0; i < newVerts.length; i++) {
    const v = newVerts[i];
    posBuf.writeFloatLE(v.x, i * 12);
    posBuf.writeFloatLE(v.y, i * 12 + 4);
    posBuf.writeFloatLE(v.z, i * 12 + 8);

    normBuf.writeFloatLE(v.nx, i * 12);
    normBuf.writeFloatLE(v.ny, i * 12 + 4);
    normBuf.writeFloatLE(v.nz, i * 12 + 8);

    uvBuf.writeFloatLE(v.u, i * 8);
    uvBuf.writeFloatLE(v.v, i * 8 + 4);
  }

  // Indices: Verwende UNSIGNED_INT (4 Bytes) oder UNSIGNED_SHORT (2 Bytes)
  const useUint16 = newVerts.length < 65535;
  const idxBuf = Buffer.alloc(newTris.length * 3 * (useUint16 ? 2 : 4));
  for (let i = 0; i < newTris.length; i++) {
    const [a, b, c] = newTris[i];
    if (useUint16) {
      idxBuf.writeUInt16LE(a, i * 6);
      idxBuf.writeUInt16LE(b, i * 6 + 2);
      idxBuf.writeUInt16LE(c, i * 6 + 4);
    } else {
      idxBuf.writeUInt32LE(a, i * 12);
      idxBuf.writeUInt32LE(b, i * 12 + 4);
      idxBuf.writeUInt32LE(c, i * 12 + 8);
    }
  }

  // Zusammenbau des neuen Binär-Chunks
  const parts = [];
  let cur = 0;

  // BV 0: Image
  const newImgOffset = cur;
  parts.push(imgData);
  cur += imgData.length;
  let p = pad4(cur) - cur; if (p > 0) { parts.push(Buffer.alloc(p)); cur += p; }

  // BV 1: POS
  const newPosOffset = cur;
  parts.push(posBuf);
  cur += posBuf.length;
  p = pad4(cur) - cur; if (p > 0) { parts.push(Buffer.alloc(p)); cur += p; }

  // BV 2: NORM
  const newNormOffset = cur;
  parts.push(normBuf);
  cur += normBuf.length;
  p = pad4(cur) - cur; if (p > 0) { parts.push(Buffer.alloc(p)); cur += p; }

  // BV 3: UV
  const newUvOffset = cur;
  parts.push(uvBuf);
  cur += uvBuf.length;
  p = pad4(cur) - cur; if (p > 0) { parts.push(Buffer.alloc(p)); cur += p; }

  // BV 4: IDX
  const newIdxOffset = cur;
  parts.push(idxBuf);
  cur += idxBuf.length;
  p = pad4(cur) - cur; if (p > 0) { parts.push(Buffer.alloc(p)); cur += p; }

  // Aktualisiere GLTF JSON Metadaten
  gltf.bufferViews[gltf.images[0].bufferView].byteOffset = newImgOffset;
  gltf.bufferViews[gltf.images[0].bufferView].byteLength = imgData.length;

  gltf.bufferViews[posAcc.bufferView].byteOffset = newPosOffset;
  gltf.bufferViews[posAcc.bufferView].byteLength = posBuf.length;

  gltf.bufferViews[normAcc.bufferView].byteOffset = newNormOffset;
  gltf.bufferViews[normAcc.bufferView].byteLength = normBuf.length;

  gltf.bufferViews[uvAcc.bufferView].byteOffset = newUvOffset;
  gltf.bufferViews[uvAcc.bufferView].byteLength = uvBuf.length;

  gltf.bufferViews[idxAcc.bufferView].byteOffset = newIdxOffset;
  gltf.bufferViews[idxAcc.bufferView].byteLength = idxBuf.length;

  posAcc.count = newVerts.length;
  posAcc.min = [minX, minY, minZ];
  posAcc.max = [maxX, maxY, maxZ];

  normAcc.count = newVerts.length;
  uvAcc.count = newVerts.length;

  idxAcc.count = newTris.length * 3;
  idxAcc.componentType = useUint16 ? 5123 : 5125;

  gltf.buffers[0].byteLength = cur;

  let newJsonStr = JSON.stringify(gltf);
  while (Buffer.byteLength(newJsonStr) % 4 !== 0) newJsonStr += ' ';
  const newJsonBuf = Buffer.from(newJsonStr, 'utf8');

  const newBinData = Buffer.concat(parts);
  const totalLength = 12 + 8 + newJsonBuf.length + 8 + newBinData.length;
  const outBuf = Buffer.alloc(totalLength);

  outBuf.writeUInt32LE(0x46546C67, 0); // glTF
  outBuf.writeUInt32LE(2, 4);          // version 2
  outBuf.writeUInt32LE(totalLength, 8); // total size

  outBuf.writeUInt32LE(newJsonBuf.length, 12);
  outBuf.writeUInt32LE(0x4E4F534A, 16); // JSON
  newJsonBuf.copy(outBuf, 20);

  const binChunkOffset = 20 + newJsonBuf.length;
  outBuf.writeUInt32LE(newBinData.length, binChunkOffset);
  outBuf.writeUInt32LE(0x004E4942, binChunkOffset + 4); // BIN\0
  newBinData.copy(outBuf, binChunkOffset + 8);

  fs.writeFileSync(outputFile, outBuf);
  console.log(`Fertig! Neue Datei geschrieben: ${outputFile} (${(outBuf.length / 1024).toFixed(1)} kB)`);
}

cleanHuette('public/assets/models/7wegehuette.glb', 'public/assets/models/7wegehuette_clean.glb');
