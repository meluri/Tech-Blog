const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const userRoutes = require('./controllers/userRoutes');
const postRoutes = require('./controllers/postRoutes');
const homeRoutes = require('./controllers/homeRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Handlebars setup
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Session setup
const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(homeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App running on port ${PORT}`));
});