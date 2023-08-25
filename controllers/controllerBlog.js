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

//BUSCAR NOTICIA POR NOMBRE
const buscarNoticia = async(req, res) => {
const titulo=await req.params.titulo;

try {
    const existe = await Noticia.findOne({titulo:titulo});

    if (existe) {
        return res.status(200).json({
            ok:true,
            data:existe
        })
    }else {
        return res.status(400).json({
            msg: "no hay noticias con ese título"
        })
    }
} catch (error) {
    console.log(error);
    return res.status(500).json({
        ok:false,
        msg:"contacta con los admin"
    })
}

}

//REOGER NOTICIAS POR CREADOR
const buscarNoticiasCreador = async(req, res) => {
    const creador=await req.params.creador;
    
    try {
        const existe = await Noticia.find({creador:creador});
    
        if (existe) {
            return res.status(200).json({
                ok:true,
                data:existe
            })
        }else {
            return res.status(400).json({
                msg: "no hay noticias con ese creador"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:"contacta con los admin"
        })
    }
    
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
            noticia: noticiaGuardada,
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


//
// ACTUALIZAR NOTICIA

const actualizarNoticia = async (req, res) => {
const id = await req.params.id;

try {
    const existe = await Noticia.find({_id:id});
    const noticiaActualizada = await Noticia.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if (existe) {
return res.status(200).json({

    ok:true,
    noticia:noticiaActualizada,
    msg: "noticia actualizada"
})
    }
    return res.status(400).jason ({
        ok:false,
        msg:"esa noticia no existe"
    })
} catch (error) {
    console.log(error);
    return res.status(500).json({
        ok:false,
        msg:"contacta con los admin"
    })
}

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
    buscarNoticia,
    crearNoticia,
    borrarNoticia,
    actualizarNoticia,
    buscarNoticiasCreador
};