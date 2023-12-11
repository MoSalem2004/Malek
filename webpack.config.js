module.exports = {
  // ... أعدادات webpack الأخرى

  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
    },
  },
};
