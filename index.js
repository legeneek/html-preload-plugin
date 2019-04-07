class PreloadPlugin {
  constructor(options) {
    this.options = Object.assign({}, options)
  }
  apply (compiler) {
    compiler.hooks.emit.tap('PreloadPlugin', (compilation) => {
      const files = Object.keys(compilation.assets)
      const fontReg = /\.otf|ttf|woff(2)?$/i
      let fonts = []
      let html, asset
      files.map((name) => {
        if (fontReg.test(name)) {
          fonts.push(name)
        }
        if (/\.html$/.test(name)) {
          asset = compilation.assets[name]
          html = asset.source()
        }
      })
      if (!html) {
        throw new Error('no html resouce')
      }
      const publicPath = compilation.options.output.publicPath || ''
      // attention hardcode
      const tag = '</title>'
      const index = html.indexOf(tag) + tag.length
      const links = fonts.map(name => {
        return `\n<link rel="preload" as="font" crossorigin href="${publicPath}/${name}">\n`
      })
      html = html.slice(0, index) + links.join('') + html.slice(index)

      asset.source = () => html
      asset.size = () => html.length
    })
  }
}

module.exports = PreloadPlugin