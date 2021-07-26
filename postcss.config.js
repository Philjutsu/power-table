module.exports = {
  modules: true,
  plugins: {
    'postcss-import': {
    	path: './src'
    },
    'postcss-global-theme': {
        theme: ['dark', 'light']
    },
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 5%']
    },
    'precss': {}
  }
};