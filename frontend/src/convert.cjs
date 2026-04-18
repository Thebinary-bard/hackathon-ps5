const fs = require('fs');
let html = fs.readFileSync('landing_raw.html', 'utf8');
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
let bodyContent = bodyMatch ? bodyMatch[1] : '';

// JSX fixes:
bodyContent = bodyContent.replace(/class=/g, 'className=');
bodyContent = bodyContent.replace(/for=/g, 'htmlFor=');
bodyContent = bodyContent.replace(/<!--[\s\S]*?-->/g, ''); // strip comments
bodyContent = bodyContent.replace(/<img(.*?)(\/?)>/g, (match, attrs, slash) => slash ? match : `<img${attrs}/>`);
bodyContent = bodyContent.replace(/<hr(.*?)(\/?)>/g, (match, attrs, slash) => slash ? match : `<hr${attrs}/>`);
bodyContent = bodyContent.replace(/<br(.*?)(\/?)>/g, (match, attrs, slash) => slash ? match : `<br${attrs}/>`);
bodyContent = bodyContent.replace(/<input(.*?)(\/?)>/g, (match, attrs, slash) => slash ? match : `<input${attrs}/>`);
bodyContent = bodyContent.replace(/style="([^"]*)"/g, (match, styleAttr) => {
  if (styleAttr === "font-variation-settings: 'FILL' 1;") {
    return "style={{fontVariationSettings: \"'FILL' 1\"}}";
  }
  return match;
});
bodyContent = bodyContent.replace(/<button([^>]*)>\s*Get Started\s*<\/button>/g, '<Link to="/auth"><button$1>Get Started</button></Link>');

const component = `import React from 'react';\nimport { Link } from 'react-router-dom';\n\nexport default function LandingPage() {\n  return (\n    <div className="bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed">\n      ${bodyContent}\n    </div>\n  );\n}\n`;

fs.writeFileSync('LandingPage.jsx', component);
