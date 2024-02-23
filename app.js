import express, { json, urlencoded } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// importation du code des sous routeurs
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import notesRouter from './routes/notes.js';

var app = express();

// view engine setup
// app.set('views', join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
// app.use(static(join(__dirname, 'public')));
app.use(bodyParser.json());

// Initialisation du Router
app.use('/notes', notesRouter);
app.use('/users', usersRouter);
app.use('/', (req, res) => res.send('la bienvenue!'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.send(err);
});

app.listen(3000, () => console.log("Serveur API démarré"));
