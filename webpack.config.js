// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/Game.js', 
  output: {
    filename: 'bundle.js',  
    path: path.resolve(__dirname, './public/dist'), 
    
  },
  watch: false,
};
