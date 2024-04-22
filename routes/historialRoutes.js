import express  from "express";
import { guardarPago, 
    obtenerHistorial,
eliminarPago }
    from "../controllers/historialController.js";
import checkAuth from "../middleware/authMiddleware.js";


const router = express.Router();

// Ruta para guardar un nuevo pago
router.post('/almacenar', guardarPago);

// Ruta para obtener el historial de pagos de un cliente
router.get('/', obtenerHistorial);
router.delete('/:id', checkAuth, eliminarPago)

export default router;
