const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
    resolver: {
        assetExts: [...defaultConfig.resolver.assetExts, 'tflite', 'pte', 'bin', 'pt'],
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
