const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');//Faz a conexão entre o back e o front 

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://octagon:Senha123@cluster0-gtqsa.mongodb.net/test?retryWrites=true&w=majority', {
   useNewUrlParser: true,
});

//Tornando variavel disponivel na aplicação toda
app.use((req, res, next) => {
   req.io = io;

   next();//Garante que este middleware será executado e os próximos também
})

app.use(cors());//Permissão de acesso do backend;

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(3333);