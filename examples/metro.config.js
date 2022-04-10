const { sourceExts } = require("metro-config/src/defaults/defaults");

module.exports = {
  resolver: {
    sourceExts: [...sourceExts, "cjs"],
  },
};
