import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import http from 'http';
import { normalizePort } from './core/config'

import busboy from 'connect-busboy'
import busboyBodyParser from 'busboy-body-parser'


import indexRouter from './routes/index'
import usersRouter from './routes/users'


let app = express();
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(busboy());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(busboyBodyParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
server.listen(port);
server.on('listening',  () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
});

export default app
