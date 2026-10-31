import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['coverage/**', 'dist/**', 'node_modules/**', 'public/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { languageOptions: { globals: { document: 'readonly', window: 'readonly', navigator: 'readonly', File: 'readonly', HTMLCanvasElement: 'readonly', CanvasRenderingContext2D: 'readonly', ShareData: 'readonly', URL: 'readonly', Image: 'readonly', createImageBitmap: 'readonly', process: 'readonly', console: 'readonly', Buffer: 'readonly' } } },
);
