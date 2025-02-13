const path = require('path');

module.exports = {
  i18n: {
    locales: ['az', 'ru', 'en'],
    defaultLocale: 'az',
    localeDetection: false,
  },
  localePath: path.resolve('./public/locales'),
};
