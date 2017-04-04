const assets = {};

assets.javascript = {
  app: '/dist/app.js',
};

// If we are not in Development, load css file, when we are at development,
// they are loaded dynamically.
if (!__DEVELOPMENT__) {
  assets.styles = {
    app: '/dist/app.css',
  };
}

export default assets;
