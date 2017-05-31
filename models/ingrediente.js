var mongoose = require('mongoose');

Schema = mongoose.Schema;

var IngredienteSchema = new Schema({
	nombre : String,

	created_date: { type: Date, default: Date.now },
	updated_date: { type: Date, default: Date.now }
});

mongoose.model('Ingrediente', IngredienteSchema);
