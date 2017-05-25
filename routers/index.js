module.exports = app => {
  app.get('/', (req, res) => {
    res.redirect('/disk');
  })
  
  app.use('/', require('./loadPage.js'));
  app.use('/api', require('./api.js'));
}