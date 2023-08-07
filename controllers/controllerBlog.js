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

//BORRAR NOTICIA

const borrarNoticia = async (req, res) => {

    const id = await req.params.id;
    try {
        const existe = await Noticia.findByIdAndDelete(id);

        if (existe) {
            return res.status(200).json({

                ok: true,
                data: existe,
                msg: "noticia eliminada"
            })
        } else {
            return res.status(400).jason({
                msg: "La noticia que buscas no existe"

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



module.exports = {
    obtenerNoticias,
    crearNoticia,
    borrarNoticia,

};