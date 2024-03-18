import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/print-react-component/',
  locales: [{ id: 'en-US', name: 'English' }],
  themeConfig: {
    name: 'Print React Component',
    prefersColor: {
      default: 'auto',
      switch: true,
    },
    socialLinks: {
      github: 'https://github.com/bowencool/print-react-component',
    },
  },
});
