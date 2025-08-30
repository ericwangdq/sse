const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "index.html");
const destDir = path.join(__dirname, "dist");
const dest = path.join(destDir, "index.html");

// Ensure dist directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy index.html to dist
fs.copyFileSync(src, dest);

console.log(`Copied ${src} to ${dest}`);
