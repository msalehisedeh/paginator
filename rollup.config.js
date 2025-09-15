import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import css from 'rollup-plugin-css-only';
import image from '@rollup/plugin-image';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true
  },
  external: [],
  plugins: [
    resolve({
      extensions: ['.js', '.ts', '.json'],
      moduleDirectories: ['node_modules'],
      only: [/^\.{0,2}\//],
      preferBuiltins: false,
      browser: true
    }),
    commonjs(),
    json(),
    typescript({ tsconfig: './tsconfig.json' }),
    css({ output: 'bundle.css' }),
    image(),
    copy({
      targets: [
        { src: 'node_modules/@awesome.me/webawesome/dist/styles', dest: 'dist' },
        { src: 'src/shoelace', dest: 'dist' },
        { src: 'src/index.js', dest: 'dist' },
        { src: 'src/index.html', dest: 'dist' }
      ]
    })
  ]
};