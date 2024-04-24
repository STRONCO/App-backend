import mongoose from "mongoose";

const historialPagoSchema = mongoose.Schema({
  clienteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente'
  },
  clienteNombre: {
    type: String,
    require: false
  },
  fechaPago: {
    type: Date,
    default: Date.now
  },
  monto: {
    type: Number,
    required: true
  },
  formaPago: {
    type: String,
    require: false,
  },
  deudanetaHisto: {
    type: String,
    required: false,
  },
  vencimiento:{
    type: Date,
    required: true,
  }

});

const HistorialPagos = mongoose.model('HistorialPagos', historialPagoSchema);

export default HistorialPagos
