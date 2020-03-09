const express = require('express');

const html = require('./routes/html')

const api = require('./routes/api');

const config = require('./env');

const connect = require('./db');

const path = require('path');

const {port} = config;

const app = express();

app.use(express.static(path.join(__dirname,'client')));

connect();

app.use('/api',api);
app.use('*',html);

app.listen(port,console.log(`Server is running in port ${port}`));


