module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "solid-native/babel-preset"],
  };
};
