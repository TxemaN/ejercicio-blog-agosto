const Noticia = require("../models/BlogModel");

//RECOGER TODAS LAS NOTICIAS

const obtenerNoticias = async (req, res) => {

    try {
        const noticias = await Noticia.find();
        return res.status(200).json({
            ok: true,
            msg: "lista de noticias",
            data: noticias

        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "error, contacta con el admin"

        });

    };
}
//CREAR NOTICIA

const crearNoticia = async (req, res) => {
    const noticia = new Noticia(req.body);

    try {
        const { titulo } = noticia;
        const existe = await Noticia.findOne({ titulo: titulo })
        if (existe) {
            return res.status(400).json({
                ok: false,
                msg: "esa noticia ya fue publicada",
            });
        };
        const noticiaGuardada = await noticia.save()
        return res.status(201).json({
            ok: true,
            pelicula: noticiaGuardada,
            msg: "Noticia agregada"

        });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg: "error, contacta con el admin"

            });

        };
    }


module.exports = {
        obtenerNoticias,
        crearNoticia

    };