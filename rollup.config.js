// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'example/chain.ts',
    output: {
        file: 'example/chain.js',
        format: 'iife'
    },
    plugins: [
        typescript(),
    ],
};