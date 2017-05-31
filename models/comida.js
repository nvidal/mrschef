var mongoose = require('mongoose');
var IngredienteSchema = require('./ingrediente');
var Config = require('../config');

Schema = mongoose.Schema;

var ComidaSchema = new Schema({
	nombre : String,
	foto : { type : String, default : Config.defaultImg },
	tipo : { type : String, enum: ['Comida', 'Merienda'] },
	comentario : String,
	ingredientes : [IngredienteSchema],

	created_date: { type: Date, default: Date.now },
	updated_date: { type: Date, default: Date.now }
});

mongoose.model('Comida', ComidaSchema);
