module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['macros'],
    ['inline-dotenv'],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          'app.json': './app.json',
          'package.json': './package.json',
        },
      },
    ],
  ],
};
