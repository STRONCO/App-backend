import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import generarId from '../helpers/generarId.js';

const nutriologoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    telefono:{
        type: String,
        default:null,
    },
    web: {
        type: String,
        default:null,
    },
    token:{
        type: String,
        default: generarId(),
    },
    confirmado:{
        type: Boolean,
        default: false
    }
});

nutriologoSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
});

nutriologoSchema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
};

const Nutriologo = mongoose.model("Nutriologo", nutriologoSchema) ;
export default Nutriologo;
