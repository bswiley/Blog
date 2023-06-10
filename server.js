const mime = require('mime');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const { format_time } = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

handlebars.registerHelper('format_time', format_time);
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
app.use(express.static('public', {
  setHeaders: (res, path)=> {
    if (mime.getType(path)=== 'application/javascript') {
      res. setHeader('content-Type', 'application/javascript');
          }
  }
}));