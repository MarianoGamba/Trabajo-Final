var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
var nodemailer = require('nodemailer')
var novedadesModel = require('../models/novedadesModel');
var cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/', async function(req, res, next){
   var novedades = await novedadesModel.getNovedades();
  novedades = novedades.splice(0,5);
  novedades = novedades.map(novedad => {
    if (novedad.img_id) {
      const imagen = cloudinary.url(novedad.img_id, {
        width: 460,
        crop: 'fill'
      });
      return {
        ...novedad,
        imagen
      }
    } else {
      return {
        ...novedad,
        imagen: '/images/noimage.png '
      }
    }
  });
  res.render('index',{
    novedades
  });
});

varnodemailer = require("nodemailer");

router.post('/', async(req, res, next) => {

    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var mail = req.body.mail;
    var escribinos = req.body.escribinos;
    var telefono = req.body.telefono;

    console.log(req. body);

    var obj = {
      to: 'mariano.gamba77@gmail.com',
      subject: 'CONTACTO WEB',
      html: nombre + "se contacto a través de la web y quiere más información a este correo : " + mail + ".<br> Además, hizo este comentario : " + escribinos + ".<br> Su tel es: " + telefono
    }

    var transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    var info = await transport.sendMail(obj);

    res.render('index', {
      message: 'Mensaje enviado correctamente'
    });
});


module.exports = router;
