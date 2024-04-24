import HistorialPagos from "../models/HistorialPagos.js";
import Paciente from "../models/Paciente.js";

const guardarPago = async (req, res) => {
  try {
    const { id, nombre, anticipo, formadepago, adeudoneto, fechavencimiento } = req.body;
    const pago = new HistorialPagos({
      clienteId: id,
      clienteNombre: nombre,
      monto: anticipo,
      formaPago: formadepago,
      deudanetaHisto: adeudoneto,
      vencimiento: fechavencimiento,
    });
    await pago.save();
    res.status(201).json({ mensaje: "Pago guardado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al guardar el pago" });
  }
};

const obtenerHistorial = async (req, res) => {
  try {
    const historialPago = await HistorialPagos.find();
    res.json(historialPago);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarPago = async (req, res) => {
  const { id } = req.params;
  const historial = await HistorialPagos.findById(id);
  if (!historial) {
    return res.status(404).json({ msg: "No encontrado" });
  }

  // if (historial.nutriologo._id.toString() !== req.nutriologo._id.toString()) {
  //   return res.json({ msg: "Accion no valida" });
  // }

  try {
    await historial.deleteOne();
    res.json({ msg: "Pago Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export { guardarPago, obtenerHistorial, eliminarPago };
