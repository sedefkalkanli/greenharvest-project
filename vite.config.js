import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

function htmlPartials() {
  return {
    name: 'html-partials',
    transformIndexHtml(html) {
      return html.replace(/<load\s+src="([^"]+)"\s*\/>/g, (_, src) => {
        const file = path.resolve(process.cwd(), src);
        return fs.readFileSync(file, 'utf8');
      });
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [htmlPartials()],
});
