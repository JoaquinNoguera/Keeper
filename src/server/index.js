import express from 'express';
import  html from './routes/html';
import api from './routes/api';
import connect from './db';
import cookieParser from "cookie-parser";
import path from 'path';

const app = express();


app.use(express.static(path.join(__dirname,'views')));
app.set("port", process.env.PORT);

connect();

app.use(express.json());
app.use(cookieParser());
app.use('/api',api);
app.use('*',html);

app.listen(
    app.get("port"),
    console.log(`Server is running`)
);


