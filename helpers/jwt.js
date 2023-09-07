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

                resolve(token);console.log(token)
                // Se escribe la información del token en una cookie y se envía
               
                
                
                
            });
    });
    
};

module.exports = {
    generarJWT
};