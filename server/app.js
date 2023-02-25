require('./config/config');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());
app.use(cors());
//Configuracion global de rutas
app.use('/api', require('./routes/platos'));

app.get('/', (req, res) => {
    res.json({
        msg: "Servidor online"
    });
})

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto: ", process.env.PORT);
})