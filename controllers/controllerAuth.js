const Editor = require('../models/EditorBlog');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const panelUsuario = async (req, res) => {

    try {
        const editor = await Editor.find();
        if (!editor) {
            return res.json({ message: 'Ese editor no existe' })
        }
        return res.json({ editor: editor })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "error, contacta con el admin"

        });

    };
}

//GET VER TODOS LOS EDITORES
const obtenerEditores = async (req, res) => {

    try {
        const editores = await Editor.find();
        return res.status(200).json({
            ok: true,
            msg: "lista de editores",
            data: editores

        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "error, contacta con el admin"

        });

    };
}
//
//OBTENER Editor

const obtenerEditor = async (req, res) => {
    const id = await req.params.id;
    try {
        const existe = await Editor.findOne({ _id: id });
        if (existe) {
            return res.status(200).json({
                ok: true,
                msg: "datos editor",
                data: existe

            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "error, contacta con el admin"

        });

    };
}
//BORRAR EDITOR
const borrarEditor = async (req, res) => {

    const id = await req.params.id;
    try {
        const existe = await Editor.findByIdAndDelete(id);

        if (existe) {
            return res.status(200).json({

                ok: true,
                data: existe,
                msg: "editor eliminado"
            })
        } else {
            return res.status(400).jason({
                msg: "El editor que buscas no existe"

            });

        };

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "contacta con los admin"
        });

    };

}


//POST CREAR USER
const createUser = async (req, res) => {

    const { email, password, passConfirm, nombre, role, date } = req.body;

    try {
        let user = await Editor.findOne({ email: email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe usuario'
            });
        };

        if (password != passConfirm) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no coincide'
            })
        };

        const newUser = { email, nombre, password, role, date };
        user = new Editor(newUser)

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        const saveUser = await user.save();

        return res.status(201).json({
            ok: true,
            data: saveUser,
            msg: "Editor guardado"
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Consulta con los administradores'
        });
    };
};

//POST LOGIN USER
const loginUser = async (req, res,) => {
    const { email, password } = req.body;

    try {
        let user = await Editor.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Ese usuario no existe'
            });
        };
        let passOk = await bcrypt.compare(password, user.password)

        if (!passOk) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no coincide'
            });
        };
        const token = await generarJWT(user.id, user.nombre, user.role);
        res.cookie('miToken', token);
        res.status(200).json({
            ok: true,
            uid: user.id,
            nombre: user.nombre,
            email: user.email,
            role: user.role,
            token
            
        }, )
        
        

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Esto no esta chutando'
        });
    };
};

//RENEW
const renewToken = async (req, res) => {
    const { uid, nombre } = req

    const token = await generarJWT(uid, nombre);

    res.status(200).json({
        ok: true,
        msg: "token renovado",
        user: {
            uid,
            nombre,
            token
        }
    });
};


//PANEL USUARIO



module.exports = {
    createUser,
    loginUser,
    renewToken,
    obtenerEditores,
    obtenerEditor,
    borrarEditor,
    panelUsuario
}