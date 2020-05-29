module.exports = {
  root: true,
  extends: ['artwithaliens'],
  plugins: ['@next/next'],
  globals: {
    paypal: true,
  },
  settings: {
    linkComponents: ['Button', 'Link'],
  },
  rules: {
    camelcase: 'off',
    '@next/next/no-css-tags': 'error',
    '@next/next/no-sync-scripts': 'error',
  },
};
