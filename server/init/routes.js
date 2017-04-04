/**
 * Routes which should not go through the render middleware
 * @param {object} app - Express app
 */
export default (app) => {
  app.get('/test/a/different/route', (req, res) => res.send('Hello World!'));
};
