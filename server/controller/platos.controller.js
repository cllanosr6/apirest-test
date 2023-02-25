const { request, response } = require('express');

const { consulta } = require('./query');
const { formatoFecha } = require('../tools/util.tools');

const listaPlatos = async (req = request, res = response) => {
    const sql = "SELECT * FROM platos";
    const resp = await consulta(sql, []);
    if (resp.ok) {
        return res.json(resp.data);
    }

    return res.status(400).json({
        msg_error: "Error al recuperar la lista de plato"
    });
}

const agregarPlato = async (req = request, res = response) => {
    const { nombre, precio, color, fecha, inicio_actividad, campos } = req.body;
    const sql = "INSERT INTO platos (nombre, precio, color, fecha, inicio_actividad, campos, oferta) VALUES (?, ?, ?, ?, ?, ?, 1);";
    const resp = await consulta(sql, [nombre, precio, color, formatoFecha(fecha, 'YYYY-MM-DD'), formatoFecha(inicio_actividad, 'YYYY-MM-DD HH:mm:ss'), campos]);
    console.log(resp);
    if (resp.ok) {
        return res.json({
            msg: "Plato agregado correctamente"
        });
    }
    
    return res.status(400).json({
        msg_error: "Error al agregar el plato"
    });
}

const modificarPlato = async (req = request, res = response) => {
    const { nombre, precio, color, fecha, inicio_actividad, campos, id } = req.body;
    const sql = "UPDATE platos SET nombre = ?, precio = ?, color = ?, fecha = ?, inicio_actividad = ?, campos = ? WHERE id = ?;";
    const resp = await consulta(sql, [nombre, precio, color, formatoFecha(fecha, 'YYYY-MM-DD'), formatoFecha(inicio_actividad, 'YYYY-MM-DD HH:mm:ss'), campos, id]);
    if (resp.ok) {
        return res.json({
            msg: "Plato modificado correctamente"
        });
    }

    return res.status(400).json({
        msg_error: "Error al modificar el plato"
    });
}

const eliminarPlato = async (req = request, res = response) => {
    const { id } = req.body;
    console.log(id);
    const sql = "UPDATE platos SET oferta = 0 WHERE id = ?;";
    const resp = await consulta(sql, [id]);
    if(resp.ok) {
        return res.json({
            msg: "Plato eliminado correctamente"
        });
    }

    return res.status(400).json({
        msg_error: "Error al eliminar el plato"
    });

}

module.exports = {
    listaPlatos,
    agregarPlato,
    modificarPlato,
    eliminarPlato
}