const fs = require('fs');
const { execSync } = require('child_process');

const buf = fs.readFileSync('public/assets/models/7wegehuette_clean.glb');
const jsonLen = buf.readUInt32LE(12);
const gltf = JSON.parse(buf.toString('utf8', 20, 20 + jsonLen));
const binOffset = 20 + jsonLen + 8;

const prim = gltf.meshes[0].primitives[0];
const posAcc = gltf.accessors[prim.attributes.POSITION];
const idxAcc = gltf.accessors[prim.indices];

const posBv = gltf.bufferViews[posAcc.bufferView];
const idxBv = gltf.bufferViews[idxAcc.bufferView];

const posStart = binOffset + (posBv.byteOffset || 0) + (posAcc.byteOffset || 0);
const idxStart = binOffset + (idxBv.byteOffset || 0) + (idxAcc.byteOffset || 0);

const verts = [];
for (let i = 0; i < posAcc.count; i++) {
  verts.push({
    x: buf.readFloatLE(posStart + i * 12),
    y: buf.readFloatLE(posStart + i * 12 + 4),
    z: buf.readFloatLE(posStart + i * 12 + 8)
  });
}

const tris = [];
for (let i = 0; i < idxAcc.count / 3; i++) {
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
  tris.push([a, b, c]);
}

let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" style="background:#111;">\n';

svg += '<text x="50" y="40" fill="#fff" font-family="sans-serif" font-size="20">Draufsicht (Top-Down: X horizontal [-0.42..0.42], Z vertikal [-0.5..0.5])</text>\n';
svg += '<rect x="50" y="50" width="500" height="500" fill="#222" stroke="#444"/>\n';
for (const [a, b, c] of tris) {
  const v1 = verts[a], v2 = verts[b], v3 = verts[c];
  const p1 = ((v1.x + 0.45) / 0.9) * 500 + 50;
  const q1 = ((v1.z + 0.55) / 1.1) * 500 + 50;
  const p2 = ((v2.x + 0.45) / 0.9) * 500 + 50;
  const q2 = ((v2.z + 0.55) / 1.1) * 500 + 50;
  const p3 = ((v3.x + 0.45) / 0.9) * 500 + 50;
  const q3 = ((v3.z + 0.55) / 1.1) * 500 + 50;
  svg += `<polygon points="${p1.toFixed(1)},${q1.toFixed(1)} ${p2.toFixed(1)},${q2.toFixed(1)} ${p3.toFixed(1)},${q3.toFixed(1)}" fill="none" stroke="#69f" stroke-width="0.5" opacity="0.4"/>\n`;
}

svg += '<text x="600" y="40" fill="#fff" font-family="sans-serif" font-size="20">Vorderansicht (Front: X horizontal, Y vertikal [0..0.6])</text>\n';
svg += '<rect x="600" y="50" width="500" height="350" fill="#222" stroke="#444"/>\n';
for (const [a, b, c] of tris) {
  const v1 = verts[a], v2 = verts[b], v3 = verts[c];
  const p1 = ((v1.x + 0.45) / 0.9) * 500 + 600;
  const q1 = 400 - (v1.y / 0.65) * 350;
  const p2 = ((v2.x + 0.45) / 0.9) * 500 + 600;
  const q2 = 400 - (v2.y / 0.65) * 350;
  const p3 = ((v3.x + 0.45) / 0.9) * 500 + 600;
  const q3 = 400 - (v3.y / 0.65) * 350;
  svg += `<polygon points="${p1.toFixed(1)},${q1.toFixed(1)} ${p2.toFixed(1)},${q2.toFixed(1)} ${p3.toFixed(1)},${q3.toFixed(1)}" fill="none" stroke="#f96" stroke-width="0.5" opacity="0.4"/>\n`;
}

svg += '<text x="600" y="420" fill="#fff" font-family="sans-serif" font-size="20">Seitenansicht (Side: Z horizontal, Y vertikal)</text>\n';
svg += '<rect x="600" y="430" width="500" height="350" fill="#222" stroke="#444"/>\n';
for (const [a, b, c] of tris) {
  const v1 = verts[a], v2 = verts[b], v3 = verts[c];
  const p1 = ((v1.z + 0.55) / 1.1) * 500 + 600;
  const q1 = 780 - (v1.y / 0.65) * 350;
  const p2 = ((v2.z + 0.55) / 1.1) * 500 + 600;
  const q2 = 780 - (v2.y / 0.65) * 350;
  const p3 = ((v3.z + 0.55) / 1.1) * 500 + 600;
  const q3 = 780 - (v3.y / 0.65) * 350;
  svg += `<polygon points="${p1.toFixed(1)},${q1.toFixed(1)} ${p2.toFixed(1)},${q2.toFixed(1)} ${p3.toFixed(1)},${q3.toFixed(1)}" fill="none" stroke="#6f9" stroke-width="0.5" opacity="0.4"/>\n`;
}

svg += '</svg>';
fs.writeFileSync('public/assets/models/huette_clean_views.svg', svg);
execSync('magick public/assets/models/huette_views.svg public/assets/models/huette_clean_views.png');
console.log('Done!');
