// const path = require('path')
import path from 'path'

const webconfig = 
{
  entry: './src/index.ts',
  // target:'web',
  name:'client',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'browser.js',
    path: path.resolve('./dist/browser'),
    libraryTarget: 'umd',
  },
};


const serverconfig = 
{
  entry: './src/index.ts',
  // target:'node',
  devtool: 'inline-source-map',
  name: 'server',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'node.js',
    path: path.resolve('./dist/node'),
    libraryTarget: 'commonjs',
  },
};

// module.exports  = [webconfig,serverconfig];

export default [webconfig,serverconfig];