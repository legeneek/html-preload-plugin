# html-preload-plugin

add preload link for your assets, `only support font files so far`.

## install

```
npm i -D html-preload-plugin
```

## usage

use it after html-webpack-plugin 

**webpack.config.js**

```
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlPreloadPlugin = require('html-preload-plugin')

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    // other plugins...
    new HtmlPreloadPlugin()
  ]
}
```
