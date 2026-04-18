const fs = require('fs');

function htmlToJsx(htmlStr) {
  return htmlStr
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/style="([^"]*)"/g, (match, p1) => {
      if (!p1.trim()) return '';
      if (p1.includes('font-variation-settings:')) {
        return `style={{ fontVariationSettings: "'FILL' 1" }}`;
      }
      return '';
    })
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<input([^>]+)>/g, (match, p1) => {
      if (p1.endsWith('/')) return match;
      return `<input${p1} />`;
    })
    .replace(/<img([^>]+)>/g, (match, p1) => {
      if (p1.endsWith('/')) return match;
      return `<img${p1} />`;
    })
    .replace(/<hr([^>]+)>/g, (match, p1) => {
      if (p1.endsWith('/')) return match;
      return `<hr${p1} />`;
    });
}

try {
  const rawHtml = fs.readFileSync('dashboard_raw.html', 'utf8');
  let body = rawHtml.substring(rawHtml.indexOf('<body'), rawHtml.lastIndexOf('</body>') + 7);
  body = body.replace(/<body[^>]*>/, '').replace(/<\/body>/, '');
  let jsx = htmlToJsx(body);

  const dashCode = `import React from 'react';\nimport { Link } from 'react-router-dom';\n\nexport default function DashboardPage() {\n  return (\n    <div className="bg-background text-on-background font-body antialiased min-h-screen">\n${jsx}\n    </div>\n  );\n}\n`;

  fs.writeFileSync('src/DashboardPage.jsx', dashCode);
  console.log("DashboardPage.jsx created");
} catch (e) {
  console.error(e);
}
