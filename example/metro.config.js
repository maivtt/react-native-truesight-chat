const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');
const escape = require('escape-string-regexp');
const pak = require('../package.json');
const { getDefaultConfig } = require('metro-config');

const root = path.resolve(__dirname, '..');

const modules = Object.keys({
  ...pak.peerDependencies,
});

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig('.');

  return {
    projectRoot: __dirname,
    watchFolders: [root],

    // We need to make sure that only one version is loaded for peerDependencies
    // So we blacklist them at the root, and alias them to the versions in example's node_modules
    resolver: {
      blacklistRE: blacklist(
        modules.map(
          (m) =>
            new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)
        )
      ),

      extraNodeModules: modules.reduce((acc, name) => {
        acc[name] = path.join(__dirname, 'node_modules', name);
        return acc;
      }, {}),

      sourceExts: [...sourceExts, 'css', 'sass', 'scss', 'svg', 'json'],
      assetExts: assetExts.filter(
        (ext) => !ext.match(/(svg|sass|scss|css|json)$/)
      ),
    },

    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      babelTransformerPath: require.resolve('./transformer.config.js'),
    },
  };
})();
