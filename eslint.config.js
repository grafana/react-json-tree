import eslintJs from '.config/eslint.js.config.base.mjs';
import eslintTsReact from '.config/eslint.ts.react.config.base.mjs';
import eslintTsReactJest from '.config/eslint.ts.react.jest.config.base.mjs';

export default [
  ...eslintJs,
  ...eslintTsReact(import.meta.dirname),
  ...eslintTsReactJest(import.meta.dirname),
  {
    ignores: ['examples', 'lib'],
  },
];
