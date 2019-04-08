module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties'
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          ie: 11
        },
        useBuiltIns: "usage",
        corejs: 3
      }
    ]
  ]
};
