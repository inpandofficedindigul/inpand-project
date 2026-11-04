const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const inputPng = path.join(__dirname, '..', 'public', 'images', 'inpand-mark.png');
const publicDir = path.join(__dirname, '..', 'public');

if (!fs.existsSync(inputPng)) {
  console.error('Source icon not found:', inputPng);
  process.exit(1);
}

console.log('Generating crisp favicon PNG sizes via ffmpeg Lanczos...');

const sizes = [
  { file: 'favicon-16x16.png', size: 16 },
  { file: 'favicon-32x32.png', size: 32 },
  { file: 'favicon-48x48.png', size: 48 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'android-chrome-192x192.png', size: 192 },
  { file: 'android-chrome-512x512.png', size: 512 },
];

for (const { file, size } of sizes) {
  const dest = path.join(publicDir, file);
  const cmd = `ffmpeg -y -i "${inputPng}" -vf "scale=${size}:${size}:flags=lanczos" "${dest}"`;
  execSync(cmd, { stdio: 'ignore' });
  const stat = fs.statSync(dest);
  console.log(`✓ Generated ${file} (${size}x${size}, ${stat.size} bytes)`);
}

// Build proper multi-size favicon.ico containing 16x16, 32x32, 48x48
console.log('Generating multi-resolution favicon.ico (16, 32, 48)...');
const icoSizes = [16, 32, 48];
const pngBuffers = icoSizes.map(s => {
  const p = path.join(publicDir, `favicon-${s}x${s}.png`);
  return {
    size: s,
    buffer: fs.readFileSync(p),
  };
});

// ICO header (6 bytes)
// 2 bytes reserved (0), 2 bytes type (1 = icon), 2 bytes count
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngBuffers.length, 4);

let currentOffset = 6 + (16 * pngBuffers.length);
const dirEntries = [];
const imageBuffers = [];

for (const { size, buffer } of pngBuffers) {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0); // width
  entry.writeUInt8(size === 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // color count
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bpp
  entry.writeUInt32LE(buffer.length, 8); // image size
  entry.writeUInt32LE(currentOffset, 12); // image offset
  dirEntries.push(entry);
  imageBuffers.push(buffer);
  currentOffset += buffer.length;
}

const icoBuffer = Buffer.concat([header, ...dirEntries, ...imageBuffers]);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
console.log(`✓ Generated favicon.ico (${icoBuffer.length} bytes, 3 sub-images)`);

// Generate favicon.svg
console.log('Generating vector favicon.svg...');
const svg192Data = fs.readFileSync(path.join(publicDir, 'android-chrome-192x192.png')).toString('base64');
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <style>
      @media (prefers-color-scheme: dark) {
        .bg-fill { fill: #0F172A; }
      }
      @media (prefers-color-scheme: light) {
        .bg-fill { fill: transparent; }
      }
    </style>
  </defs>
  <rect width="512" height="512" rx="100" class="bg-fill" />
  <image href="data:image/png;base64,${svg192Data}" x="16" y="16" width="480" height="480" preserveAspectRatio="xMidYMid meet" />
</svg>
`;
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf8');
console.log('✓ Generated favicon.svg');

// Generate site.webmanifest
console.log('Generating site.webmanifest...');
const manifest = {
  name: "INPAND Technologies Portfolio",
  short_name: "INPAND Portfolio",
  description: "Explore INPAND Technologies' portfolio of websites, software applications, and digital solutions.",
  start_url: "/",
  display: "standalone",
  background_color: "#F7F7F5",
  theme_color: "#315EFB",
  icons: [
    {
      src: "/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png"
    },
    {
      src: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png"
    },
    {
      src: "/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png"
    },
    {
      src: "/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png"
    }
  ]
};
fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2), 'utf8');
console.log('✓ Generated site.webmanifest');

