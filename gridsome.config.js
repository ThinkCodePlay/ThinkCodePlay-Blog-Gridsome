// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'ThinkCodePlay',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/pages/markdown/**/*.md',
        typeName: 'Post',
        resolveAbsolutePaths: true,
        remark: {
          // remark options
        }
      }
    }
  ],
  transformers: {
    remark: {
      // global remark options
    }
  }
}
