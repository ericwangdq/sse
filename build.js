const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "index.html");
const destDir = path.join(__dirname, "dist");
const dest = path.join(destDir, "index.html");

// write date time to html content
const dateTime = new Date().toLocaleString();
console.log(`Building at ${dateTime}`);

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Github Action Deploy Page</title>
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        document.querySelector(
          "h1"
        ).textContent = 'Hello, World! ${dateTime}';
      });
    </script>
  </head>
  <body>
    <h1></h1>
  </body>
</html>
`;

// Write the HTML content to index.html
fs.writeFileSync(src, htmlContent);

// Ensure dist directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy index.html to dist
fs.copyFileSync(src, dest);

console.log(`Copied ${src} to ${dest}`);
