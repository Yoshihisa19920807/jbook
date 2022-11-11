import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);

        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        } else if (args.path === 'tiny-test-pkg') {
          return {
            path: 'https://www.unpkg.com/tiny-test-pkg@1.0.0/index.js',
            namespace: 'a',
          };
        }
      });

      // 読み込んだファイルの中にimportなど別のファイルの読み込みがある場合また呼ばれる
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        // ファイルを読み込む前に偽ファイルを返している
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            // ここにimport, require, etcが入っているのでonLoadに戻る
            // contents: `
            //   import message from 'tiny-test-pkg';
            //   console.log(message);
            // `,
            contents: `
              const message = require('tiny-test-pkg');
              console.log(message);
            `,
          };
        }
        console.log('hoge');
        const { data } = await axios.get(args.path);
        console.log(data);
        return {
          loader: 'jsx',
          // ここにimportが入っているのでonLoadに戻る
          contents: data,
        };
      });
    },
  };
};
