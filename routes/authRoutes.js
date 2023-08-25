const express = require("express")
const { check } = require('express-validator');
const { createUser, loginUser, renewToken, obtenerEditores, borrarEditor, obtenerEditor } = require('../controllers/controllerAuth')
const { validarEx } = require('../middleware/validation');
const { validarJWT } = require('../middleware/validatorJWT');
const router = express.Router();
//OBTENER DITORES
router.get("/", obtenerEditores)
//Ruta panel usuario


//POST REGISTER
router.get('/register',
    [
        check('email', 'Email obligatorio').isEmail(),
        check('nombre', 'Nombre obligatorio').not().isEmpty(),
        check('password').notEmpty().withMessage('Contraseña obligatòria').isLength({ min: 6 }).withMessage('minimo 6 caracteres').matches(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/).withMessage('La contraseña debe contener pelo menos 1 mayuscula y 1 numero'),
        check('passConfirm').not().isEmpty(),
        validarEx
    ],
    createUser);


//POST LOGIN
router.get('/login',
    [
        check('email', 'Email obligatorio').isEmail(),
        check('password', 'Password obligatorio').not().isEmpty(),
        validarEx
    ],
    loginUser);


//RENEW TOKEN
router.get('/renew', validarJWT, renewToken)

//ENCONTRAR EDITOR POR ID
router.get("/:id", obtenerEditor)

//BORRAR EDITOR
router.delete("/:id", borrarEditor)





module.exports = router