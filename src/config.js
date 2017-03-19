const environment = {
  development: { isProduction: false },
  production: { isProduction: true },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '8080',
  app: {
    title: 'React App Template',
    description: 'Template for creating React + Redux universal applications.',
    homeUrl: '',
    head: {
      titleTemplate: 'React App Template - %s',
      meta: [
        { name: 'description', content: 'Template for creating React + Redux universal applications' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'React App Template' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'React App Template' },
        { property: 'og:description', content: 'Template for creating React + Redux universal applications' },
        { property: 'og:site', content: 'Rodrigo' },
      ],
    },
  },
}, environment);
