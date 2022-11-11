import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache',
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
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
            // contents: `
            //   import React, {useState} from 'react';
            //   console.log(React, useState);
            // `,
            contents: inputCode,
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

        const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';

        console.log('data');
        console.log(data);
        // g option indicates you replace all the corresponding characters
        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents =
          fileType === 'css'
            ? //  // alt
              // `
              //   const style = document.createElement('style');
              //   //  Store the value inside double back quotes after expanding?
              //   style.innerText=\`${data}\`;
              //   document.head.appendChild(style);
              // `
              `
                const style = document.createElement('style');
                style.innerText = '${escaped}';
                document.head.appendChild(style);
              `
            : data;
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        // Store response in cache
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
