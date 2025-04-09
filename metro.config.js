const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);
  const metroConfig = {
    ...defaultConfig,
    resolver: {
      ...defaultConfig.resolver,
      extraNodeModules: {
        "#assets": `${__dirname}/src/assets`,
        "#blocks": `${__dirname}/src/blocks`,
        "#components": `${__dirname}/components`,
        "#hooks": `${__dirname}/src/hooks`,
        "#navigation": `${__dirname}/src/navigation`,
        "#screens": `${__dirname}/src/screens`,
        "#services": `${__dirname}/src/services`,
        "#styles": `${__dirname}/src/styles`,
        "#types": `${__dirname}/src/types`,
      },
    },
  };

  return metroConfig;
})();
