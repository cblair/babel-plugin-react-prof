# babel-plugin-react-prof
A babel plugin for render statistics on your configured components. This is useful for finding components
that are unnecessarily re-rendering. This may be a concern especially in environments with limited resources
(i.e. React Native).

Once configured (see Config below), render your page and then you can get stats through `globalThis`:

```
globalThis.getSortedByRenderCount()
```

Gives you:

```
(26) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
0: {name: "Link", renderCount: 344}
1: {name: "Paragraph", renderCount: 154}
...
```

To reset counts:

```
globalThis.reset()
```

## Disclaimer
DO NOT run this plugin in production. It is not intended to run on client facing code. If you do, run with
proper fall backs and at your own risk.

## Install

```
npm install --save-dev babel-plugin-react-prof
```

## Config

### webpack
Config like normal to add babel plugins via babel-loader (take from 
https://webpack.js.org/loaders/babel-loader/):

```
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['babel-plugin-react-prof']
        }
      }
    }
  ]
}
```

### react-app-rewired
Config each of the following:

#### babel.config.js

```
module.exports = {
  presets: [
    ["react-app", { "absoluteRuntime": false }]
  ],
  plugins: [
    "babel-plugin-react-prof"
  ]
};
```

#### config-overrides.js
Install:

```
npm install --save-dev @babel/preset-env
```

Add the following:

```
...
  config.module.rules = config.module.rules.concat(
    {
      test: /\.m?js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        }
      }
    }
  );
...
```

Example of a full config-overrides.js:

```
const rewireYarnWorkspaces = require("react-app-rewire-yarn-workspaces");

module.exports = function override(config, env) {
  config.output.publicPath = "/my-public-path/";

  config.module.rules = config.module.rules.concat(
    {
      test: /\.m?js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        }
      }
    }
  );

  return rewireYarnWorkspaces(config, env);
};
```

