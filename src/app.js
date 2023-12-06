const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
  res.io = io;
  next();
});

app.get('/', (req, res) => {
  res.render('home', { products: [] });
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products: [] });
});

io.on('connection', (socket) => {
  console.log('Cliente conectado');
  // Puedes agregar más lógica según sea necesario para manejar eventos de WebSocket
});

const port = 8080;
http.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
