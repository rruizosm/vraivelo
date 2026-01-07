import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = __dirname;
console.log('Current Directory:', root);

const checks = [
    'index.html',
    'vite.config.js',
    'src/main.jsx',
    'node_modules/vite/package.json'
];

checks.forEach(file => {
    const p = path.join(root, file);
    try {
        if (fs.existsSync(p)) {
            const stats = fs.statSync(p);
            console.log(`[OK] ${file} exists (Size: ${stats.size}, Type: ${stats.isFile() ? 'File' : 'Dir'})`);
            try {
                fs.accessSync(p, fs.constants.R_OK);
                console.log(`[OK] ${file} is readable`);
            } catch {
                console.error(`[ERR] ${file} is NOT readable`);
            }
        } else {
            console.error(`[ERR] ${file} does NOT exist`);
        }
    } catch (err) {
        console.error(`[ERR] Error checking ${file}:`, err.message);
    }
});

try {
    console.log('[Content] src directory:', fs.readdirSync(path.join(root, 'src')));
} catch (e) {
    console.log('[ERR] Reading src dir:', e.message);
}
