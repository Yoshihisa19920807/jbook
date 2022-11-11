import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache',
});

(async () => {
  await fileCache.setItem('color', 'red');
})();

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);

        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }
        console.log('hoge999');
        console.log(args);

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(args.path, 'http://unpkg.com' + args.resolveDir + '/')
              .href,
          };
        }

        return {
          namespace: 'a',
          path: `https://www.unpkg.com/${args.path}`,
        };
        // else if (args.path === 'tiny-test-pkg') {
        //   return {
        //     path: 'https://www.unpkg.com/tiny-test-pkg@1.0.0/index.js',
        //     namespace: 'a',
        //   };
        // }
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
            // contents: `
            //   const react = require('react');
            //   const reactDOM = require('react-dom');
            //   console.log(react, reactDOM);
            // `,
            contents: `
              import React, {useState} from 'react@16.0.0';
              console.log(React, useState);
            `,
          };
        }

        // Check to see if we have already fetched this file
        // and if it is in the chache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        // if it is, return it immediately
        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get(args.path);
        // Store response in cache
        // console.log(data, request);
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, request);
        return result;
      });
    },
  };
};
