module.exports = {
     entry: 'index.ts',
     output: {
       dir: 'dist',
       format: 'esm',
     },
     plugins: ['@bun/plugin-typescript'],
   };