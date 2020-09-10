const express = require('express');
const connect = require('./db');
const cookieParser = require("cookie-parser");
const graphQLServer =  require("./graphql");
const cors = require('cors')
//inizialiación de express
const app = express();

app.set("port", process.env.PORT);

//midelware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/",graphQLServer);

//conexión a la base de datos
connect();

//Abrir el setvidor el en puerto configurado en las variables de entorno
app.listen(
    app.get("port"),
    console.log(`Server is running in port ${app.get("port")}`)
);


