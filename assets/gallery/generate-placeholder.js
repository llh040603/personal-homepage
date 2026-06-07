const fs = require('fs');
const path = require('path');

// Create simple SVG placeholders and convert to data URLs
for (let i = 1; i <= 12; i++) {
  const svg = `
    <svg width="280" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="200" fill="#808080"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="30" font-family="Arial, sans-serif">Photo ${i}</text>
    </svg>
  `;

  // For web compatibility, we'll create minimal JPEG-like files
  // But since we can't encode JPEG without libraries, let's use a different approach
  // We'll create HTML files that can be screenshot, or use base64 SVG

  const base64 = Buffer.from(svg.trim()).toString('base64');
  const dataUrl = `data:image/svg+xml;base64,${base64}`;

  console.log(`Photo ${i}: ${dataUrl.substring(0, 50)}...`);
}

console.log('\nNote: SVG placeholders created. For JPEG, use screenshot tool or image editor.');
