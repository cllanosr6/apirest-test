const db = require('../db/mariadb');

const consulta = async (query, values) => {
    let dbconn;
    try {
        dbconn = await db.mariaDbConnection();
        const result = await dbconn.query(query, values);
        dbconn.end();
        return {
            ok: true,
            data: result
        };
    } catch (err) {
        if (dbconn) {
            dbconn.release();
        }
        dbconn.end();
        return {
            ok: true,
            error: err
        };
    }
};

module.exports = {
    consulta,
};