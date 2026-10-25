import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const CLI_PATH = path.resolve(projectRoot, 'node_modules/@gltf-transform/cli/bin/cli.js');
const SOURCE_DIR = path.resolve(projectRoot, 'backup_assets/models_original_highres');
const TARGET_DIR = path.resolve(projectRoot, 'public/assets/models');
const TEMP_DIR = path.resolve(projectRoot, '.temp_model_opt');

if (!fs.existsSync(SOURCE_DIR)) {
  console.error(`Fehler: Quellordner nicht gefunden: ${SOURCE_DIR}`);
  process.exit(1);
}

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

function runGltfTransform(command, args) {
  const result = spawnSync('node', [CLI_PATH, command, ...args], {
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (result.status !== 0) {
    throw new Error(`gltf-transform ${command} fehlgeschlagen:\n${result.stderr || result.stdout}`);
  }
}

function formatBytes(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

const files = fs.readdirSync(SOURCE_DIR).filter(file => file.toLowerCase().endsWith('.glb'));

console.log(`Starte Optimierung von ${files.length} GLB-Dateien...`);
console.log(`- Maximale Texturauflösung: 1024x1024 (Lanczos3)`);
console.log(`- Texturkompression: WebP (Qualität 85)`);
console.log(`- Datenbereinigung: Prune & Dedup\n`);

let totalOriginalBytes = 0;
let totalOptimizedBytes = 0;
const results = [];

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const sourcePath = path.resolve(SOURCE_DIR, file);
  const targetPath = path.resolve(TARGET_DIR, file);
  const originalSize = fs.statSync(sourcePath).size;
  totalOriginalBytes += originalSize;

  const tmp1 = path.resolve(TEMP_DIR, `step1_${i}.glb`);
  const tmp2 = path.resolve(TEMP_DIR, `step2_${i}.glb`);
  const tmp3 = path.resolve(TEMP_DIR, `step3_${i}.glb`);
  const finalTmp = path.resolve(TEMP_DIR, `final_${i}.glb`);

  process.stdout.write(`[${i + 1}/${files.length}] ${file} (${formatBytes(originalSize)})... `);

  try {
    // 1. Resize Texturen auf max 1024x1024
    runGltfTransform('resize', [sourcePath, tmp1, '--width', '1024', '--height', '1024']);

    // 2. WebP Texturkompression mit Qualität 85
    runGltfTransform('webp', [tmp1, tmp2, '--quality', '85']);

    // 3. Prune unbenutzte Elemente
    runGltfTransform('prune', [tmp2, tmp3]);

    // 4. Dedup redundante Daten
    runGltfTransform('dedup', [tmp3, finalTmp]);

    // Nach public kopieren
    fs.copyFileSync(finalTmp, targetPath);

    const optimizedSize = fs.statSync(targetPath).size;
    totalOptimizedBytes += optimizedSize;
    const savingsPercent = (((originalSize - optimizedSize) / originalSize) * 100).toFixed(1);

    console.log(`-> ${formatBytes(optimizedSize)} (-${savingsPercent}%)`);

    results.push({
      file,
      originalSize,
      optimizedSize,
      savingsPercent: parseFloat(savingsPercent),
    });
  } catch (err) {
    console.error(`\nFEHLER bei ${file}:`, err.message);
  } finally {
    for (const tmp of [tmp1, tmp2, tmp3, finalTmp]) {
      if (fs.existsSync(tmp)) {
        try { fs.unlinkSync(tmp); } catch {}
      }
    }
  }
}

// Bereinige temporäres Verzeichnis
if (fs.existsSync(TEMP_DIR)) {
  try { fs.rmdirSync(TEMP_DIR); } catch {}
}

const totalSavingsPercent = (((totalOriginalBytes - totalOptimizedBytes) / totalOriginalBytes) * 100).toFixed(1);
const totalSavingsMB = ((totalOriginalBytes - totalOptimizedBytes) / (1024 * 1024)).toFixed(2);

console.log('\n=============================================');
console.log('OPTIMIERUNG ABGESCHLOSSEN');
console.log('=============================================');
console.log(`Gesamtgröße Original:   ${formatBytes(totalOriginalBytes)}`);
console.log(`Gesamtgröße Optimiert:  ${formatBytes(totalOptimizedBytes)}`);
console.log(`Eingespart:             ${totalSavingsMB} MB (${totalSavingsPercent}%)`);
console.log('=============================================\n');
