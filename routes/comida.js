var express = require('express');
var router = express.Router();
var config = require('../config');

// GET getAll
router.get('/', function(req, res){
	Comida = mongoose.model('Comida');
	Comida.find({}).sort( {nombre : -1} ).exec(function(err, comidas){
		if (err) throw err;

		res.json(comidas);
	});
});

// GET getOne
router.get('/:id', function(req, res){
	Comida = mongoose.model('Comida');
	Comida.findOne({ _id: req.params.id }, 
		function(err, comida){
			if (err) throw err;

			res.json(comida);
	});
});

// POST -> new
router.post('/', function(req, res){
	var nombre = req.body.nombre;
	var foto = req.body.foto;
	var tipo = req.body.tipo;
	var comentario = req.body.comentario;

	if (nombre == null || nombre === ""){
		res.json("Ingrese el nombre de la comida");
	}
	else if (tipo == null || tipo === ""){
		res.json("Seleccione Comida o Merienda");
	}
	else{
		if( foto == null || foto === ""){
			var comidaJson = {
				nombre : nombre,
				tipo : tipo,
				comentario : comentario,
			}
		}
		else{
			var comidaJson = {
				nombre : nombre,
				tipo : tipo,
				comentario : comentario,
				foto : foto
			}
		}
		Comida = mongoose.model('Comida');
		Comida.create( comidaJson,
		function(err, comida){
			if (err) throw err;

			res.json(comida);
		});
	}
});

// PUT editOne
router.put('/:id', function(req, res){
	var nombre = req.body.nombre;
	var foto = req.body.foto;
	var tipo = req.body.tipo;
	var comentario = req.body.comentario;

	if (nombre == null || nombre === ""){
		res.json("Ingrese el nombre de la comida");
	}
	else if (tipo == null || tipo === ""){
		res.json("Seleccione Comida o Merienda");
	}
	else{
		if( foto == null || foto === ""){
			var comidaJson = {
				nombre : nombre,
				tipo : tipo,
				comentario : comentario,
			}
		}
		else{
			var comidaJson = {
				nombre : nombre,
				tipo : tipo,
				comentario : comentario,
				foto : foto
			}
		}
		Comida = mongoose.model('Comida');
		Comida.update( { _id: req.params.id },
			comidaJson,
			function(err, comida) {
				if(err) throw err;

				res.json(comida);
			})
		}
});

// DELETE delete
router.delete('/:id', function(req, res){
	Comida = mongoose.model('Comida');
	Comida.remove({ _id: req.params.id }, 
		function(err, comida){
			if (err) throw err;

			res.json(comida);
	});
});

module.exports = router;