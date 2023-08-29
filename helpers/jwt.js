const jwt = require('jsonwebtoken');

const generarJWT = (uid, nombre, role) => {

    return new Promise((resolve, reject) => {

        const payload = { uid, nombre, role };

        //GENERACIÓN DEL TOKEN

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '30m' },

            (error, token) => {
                if (error) {
                    console.log(error);
                    reject('Fallo al generar token');
                };
                // Se escribe la información del token en una cookie y se envía
                res.cookie('miToken', token, {
                    httpOnly: true, // la cookie solo es accesible en el servidor
                    maxAge: 3600000, // expira en 1 hora
                    
                });
                resolve(token);
                
                
            });
    });
    
};

module.exports = {
    generarJWT
};