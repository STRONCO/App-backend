// routes.js
import express from 'express';
import { obtenerCitas } from '../controllers/citaController.js';


const router = express.Router();

// Ruta para obtener todas las citas
router.get('/Proxima-cita', obtenerCitas);

export default router;
