// Es el encargado de trabajar el modelo de datos

const mongoose = require('mongoose'); // Importacion del mongoose
const uniqueValidator = require('mongoose-unique-validator');


let rolesValidos = {
    values: ['ADMIN_ROL', 'USER_ROL'],
    message: '{VALUE} no es un rol válido'
}

//Obtener el cascaron de schemas
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']

    },
    password: {
        type: String,
        require: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});



usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject(); //Tiene todas las propiedades y metodos
    delete userObject.password;

    return userObject;
}
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
})



module.exports = mongoose.model('usuario', usuarioSchema);