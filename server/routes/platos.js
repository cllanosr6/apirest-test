const express = require('express');
const app = express();

const { 
    listaPlatos,
    agregarPlato,
    modificarPlato,
    eliminarPlato } = require('../controller/platos.controller');

app.get('/listaPlatos', listaPlatos);

app.post('/agregarPlato', agregarPlato);

app.put('/modificarPlato', modificarPlato)

app.delete('/eliminarPlato', eliminarPlato);

module.exports = app;