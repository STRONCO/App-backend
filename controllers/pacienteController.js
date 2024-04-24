import Paciente from "../models/Paciente.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import fs from "fs-extra";

const agregarPaciente = async (req, res) => {
  const paciente = new Paciente(req.body);
  paciente.nutriologo = req.nutriologo._id;
  try {
    console.log(req.nutriologo._id);
    const pacienteGuardado = await paciente.save();
    res.json(pacienteGuardado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerPacientes = async (req, res) => {
  /* const result = await Paciente.find().select('nombre formadepago anticipo'); */
  const pacientes = await Paciente.find()
    .where("nutriologo")
    .equals(req.nutriologo);
  res.json(pacientes);
};

const obtenerPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if (!paciente) {
    return res.status(404).json({ msg: "No encontrado" });
  }

  if (paciente.nutriologo._id.toString() !== req.nutriologo._id.toString()) {
    return res.json({ msg: "Accion no valida" });
  }
  res.json(paciente);
};

const actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if (!paciente) {
    return res.status(404).json({ msg: "No encontrado" });
  }
  if (paciente.nutriologo._id.toString() !== req.nutriologo._id.toString()) {
    return res.json({ msg: "Accion no valida" });
  }
  //console.log(req.files);
  // try {
  //   if (req.files?.imagen) {
  //     const result = await uploadImage(req.files.imagen.tempFilePath);
  //     //console.log("resultImage", result);
  //     paciente.imagen = {
  //       public_id: result.public_id,
  //       secure_url: result.secure_url,
  //     };

  //     await fs.unlink(req.files.imagen.tempFilePath);
  //   } else {
  //     console.log("nothing");
  //   }
  // } catch (error) {
  //   console.error("Error uploading image:", error);
  //   return res.status(500).json({ msg: "Error en el servidor" });
  // }
  if(req.file){
    const {filename} = req.file
    paciente.setImagen(filename)
  }
  //Actualizar Paciente
  paciente.nombre = req.body.nombre || paciente.nombre;
  paciente.telefono = req.body.telefono || paciente.telefono;
  paciente.direccionDeEntrega =
    req.body.direccionDeEntrega || paciente.direccionDeEntrega;
  paciente.ejercicio = req.body.ejercicio || paciente.ejercicio;
  paciente.padecimiento = req.body.padecimiento || paciente.padecimiento;
  paciente.alergias = req.body.alergias || paciente.alergias;
  paciente.pago = req.body.pago || paciente.pago;
  paciente.formadepago = req.body.formadepago || paciente.formadepago;
  paciente.noconsume = req.body.noconsume || paciente.noconsume;
  paciente.fecha = req.body.fecha || paciente.fecha;
  paciente.fechaproxcita = req.body.fechaproxcita || paciente.fechaproxcita;
  paciente.fechavencimiento =
    req.body.fechavencimiento || paciente.fechavencimiento;
  paciente.fechainiciopaquete =
    req.body.fechainiciopaquete || paciente.fechainiciopaquete;
  paciente.tipopaquete = req.body.tipopaquete || paciente.tipopaquete;
  paciente.anticipo = req.body.anticipo || paciente.anticipo;
  paciente.adeudoneto = req.body.adeudoneto || paciente.adeudoneto;
  paciente.especial = req.body.especial || paciente.especial;
  paciente.mesa = req.body.mesa || paciente.mesa;
  paciente.diasadeber = req.body.diasadeber || paciente.diasadeber;
  paciente.imagen = req.body.imagen || paciente.imagen;

  try {
    const pacienteActualizado = await paciente.save();
    res.json(pacienteActualizado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if (!paciente) {
    return res.status(404).json({ msg: "No encontrado" });
  }
  if (paciente.nutriologo._id.toString() !== req.nutriologo._id.toString()) {
    return res.json({ msg: "Accion no valida" });
  }
  if (paciente.imagen?.public_id) {
    await deleteImage(paciente.imagen.public_id);
  }

  try {
    await paciente.deleteOne();

    res.json({ msg: "Paciente Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
