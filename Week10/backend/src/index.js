const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { setupWebSocket } = require('./websocket');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
setupWebSocket(server);

mongoose.connect('mongodb+srv://omnistack:gSXNg8SDfbpwCyFU@cluster0-f9vku.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
});

app.use(cors({}));
app.use(express.json());
app.use(routes);

server.listen(3333);
