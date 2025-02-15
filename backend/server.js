const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const assetRoutes = require('./routes/assetRoutes');
const seedAssets = require('./seeders/assetSeeder');
const config = require('./config');
const http = require('http');
const initSocket = require('./utils/socket');

const app = express();
const server = http.createServer(app);
const io = initSocket(server);

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
}));
app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use('/api/assets', assetRoutes);

mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB')
        seedAssets(30)
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

server.listen(5000, () => {
    console.log('Backend server running on http://localhost:5000');
});
