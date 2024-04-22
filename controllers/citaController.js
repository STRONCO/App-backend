import Paciente from '../models/Paciente.js';

const obtenerCitas = async (req, res) => {
    try {
        const pacientes = await Paciente.find({}, 'nombre fechaproxcita'); // Obtener solo el nombre y la fecha de la próxima cita de cada paciente
        
        // Organizar las citas por fecha
        const citasPorFecha = {};
        pacientes.forEach(paciente => {
            const fechaCita = paciente.fechaproxcita.toISOString().split('T')[0]; // Convertir la fecha a formato YYYY-MM-DD
            if (!citasPorFecha[fechaCita]) {
                citasPorFecha[fechaCita] = [];
            }
            citasPorFecha[fechaCita].push(paciente.nombre);
        });
        
        res.json(citasPorFecha);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener citas" });
    }
}

export { obtenerCitas }

