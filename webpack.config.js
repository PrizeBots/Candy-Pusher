// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/Game.js', 
  output: {
    filename: 'bundle.js',  
    path: path.resolve(__dirname, './public/dist'), 
    
  },
  watch: false,
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
};
