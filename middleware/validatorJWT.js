const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    const tok = req.header('x-token');

    if (!tok) {

        return res.status(401).json({
            ok: false,
            msn: "Token not found"
        });
    };

    try {

        const payload = jwt.verify(tok, process.env.JWT_SECRET);
        req.uid = payload.uid;
        req.nombre = payload.nombre;
        req.role = payload.role;
        // console.log(req.uid)
        res.cookie('miToken', tok, {
            httpOnly: true, // la cookie solo es accesible en el servidor
            maxAge: 3600000, // expira en 1 hora

        });
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    };
    next();
};


module.exports = { validarJWT };