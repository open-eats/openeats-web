
const browserSupportsAllFeatures = () => {
  return !!window.Intl;
};

const loadPolyFills = (callback) => {
  let js = document.createElement('script');
  js.src = 'https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.' + process.env.LOCALE;
  js.onload = function() {
    callback();
  };
  document.head.appendChild(js);
};

module.exports.loadPolyFills = loadPolyFills;
module.exports.browserSupportsAllFeatures = browserSupportsAllFeatures;
