module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [
            ".ios.js",
            ".android.js",
            ".js",
            ".jsx",
            ".json",
            ".tsx",
            ".ts",
            ".native.js",
          ],
          alias: {
            "#assets": "./src/assets",
            "#backdrops": "./src/backdrops",
            "#blocks": "./src/blocks",
            "#components": "./src/components",
            "#hooks": "./src/hooks",
            "#modals": "./src/modals",
            "#navigation": "./src/navigation",
            "#screens": "./src/screens",
            "#services": "./src/services",
            "#styles": "./src/styles",
            "#utils": "./src/utils",
            "#types": "./src/types",
          },
        },
      ],
    ],
  };
};
