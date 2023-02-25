const moment = require('moment');

const formatoFecha = (fecha, formato) => {
    const fechaDate = new Date(fecha);
    const fechaFormateada = moment(fechaDate).format(formato);
    return fechaFormateada;
}

module.exports = {
    formatoFecha
}