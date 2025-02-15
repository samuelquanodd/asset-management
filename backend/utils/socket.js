// /utils/socket.js
const { addTag, removeTag } = require('../controllers/assetController');

const socketIo = require('socket.io');

const initSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');
    var self = socket;

    socket.on('addTag', (socket) => {
      addTag(self, socket);
    });

    socket.on('removeTag', (socket) => {
      removeTag(self, socket);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};

module.exports = initSocket;
