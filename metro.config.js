const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  "#assets": `${__dirname}/src/assets`,
  "#blocks": `${__dirname}/src/blocks`,
  "#components": `${__dirname}/src/components`,
  "#hooks": `${__dirname}/src/hooks`,
  "#navigation": `${__dirname}/src/navigation`,
  "#screens": `${__dirname}/src/screens`,
  "#services": `${__dirname}/src/services`,
  "#styles": `${__dirname}/src/styles`,
  "#types": `${__dirname}/src/types`,
};

module.exports = config;
