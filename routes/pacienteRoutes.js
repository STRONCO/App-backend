import express from "express";
import fileUpload from "express-fileupload";
import {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "../controllers/pacienteController.js";
import checkAuth from "../middleware/authMiddleware.js";
import upload from "../libs/storage.js";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, upload.single("imagen"), agregarPaciente)
  .get(checkAuth, obtenerPacientes);

router
  .route("/:id")
  .get(checkAuth, obtenerPaciente)
  .put(checkAuth, upload.single("imagen"), actualizarPaciente)
  .delete(checkAuth, eliminarPaciente);

export default router;
