// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const defaultConfig = getDefaultConfig(__dirname);

// allow Firebase’s CommonJS bundles
defaultConfig.resolver.sourceExts.push('cjs');

// disable strict package‐exports resolution so firebase/auth resolves as JS
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;