import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const BACKUP_DIR = path.resolve(projectRoot, 'backup_assets/models_original_highres');
const TARGET_DIR = path.resolve(projectRoot, 'public/assets/models');

if (!fs.existsSync(BACKUP_DIR)) {
  console.error(`Fehler: High-Res-Backup-Verzeichnis existiert nicht: ${BACKUP_DIR}`);
  process.exit(1);
}

const args = process.argv.slice(2);
const available = fs.readdirSync(BACKUP_DIR).filter(f => f.toLowerCase().endsWith('.glb'));

if (args.length === 0) {
  console.log('Verwendung: node scripts/restore-highres-model.js <Modellname oder Teilname>');
  console.log('Beispiel:   node scripts/restore-highres-model.js "fantasy tree"');
  console.log('            node scripts/restore-highres-model.js --all');
  console.log('\nVerfügbare High-Res-Originale:');
  for (const m of available) {
    const sizeMB = (fs.statSync(path.resolve(BACKUP_DIR, m)).size / (1024 * 1024)).toFixed(2);
    console.log(` - ${m} (${sizeMB} MB)`);
  }
  process.exit(0);
}

const query = args[0].trim();

if (query === '--all') {
  console.log(`Stelle alle ${available.length} Original-Modelle wieder her...`);
  for (const file of available) {
    fs.copyFileSync(path.resolve(BACKUP_DIR, file), path.resolve(TARGET_DIR, file));
    console.log(`✓ Wiederhergestellt: ${file}`);
  }
  console.log('\nAlle Original-Modelle wurden erfolgreich nach public/assets/models/ wiederhergestellt.');
  process.exit(0);
}

const matches = available.filter(f => f.toLowerCase().includes(query.toLowerCase()));

if (matches.length === 0) {
  console.error(`Kein High-Res-Modell gefunden, das zu "${query}" passt.`);
  process.exit(1);
}

for (const match of matches) {
  const src = path.resolve(BACKUP_DIR, match);
  const dest = path.resolve(TARGET_DIR, match);
  fs.copyFileSync(src, dest);
  const sizeMB = (fs.statSync(dest).size / (1024 * 1024)).toFixed(2);
  console.log(`✓ Original wiederhergestellt: ${match} (${sizeMB} MB) -> ${dest}`);
}
