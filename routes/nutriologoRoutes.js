import express from "express";
import {
  registrar,
  perfil,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  actualizarPerfil,
  actualizarPassword,
} from "../controllers/nutriologoController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

//Publico
router.post("/", registrar);
router.get("/login/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/login/olvide-password", olvidePassword);
router.route("/login/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

//Privado
router.get("/perfil", checkAuth, perfil);
router.put("/perfil/:id", checkAuth, actualizarPerfil);
router.put("/actualizar-password", checkAuth, actualizarPassword);

export default router;
