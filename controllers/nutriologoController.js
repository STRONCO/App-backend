import Nutriologo from "../models/Nutriologo.js";
import generarJWT from "../helpers/generarJWT.js";
import generarID from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {
  const { email, nombre } = req.body;

  //Checar si hay duplicados
  const existeUsuario = await Nutriologo.findOne({ email });
  if (existeUsuario) {
    const error = new Error("Usuario ya registardo");
    return res.status(400).json({ msg: error.message });
  }

  try {
    //Save new Nutriologo Profile
    const nutriologo = new Nutriologo(req.body);
    const nutriologoGuardado = await nutriologo.save();

    //Enviar el email
    emailRegistro({
      email,
      nombre,
      token: nutriologoGuardado.token,
    });

    res.json(nutriologoGuardado);
  } catch (error) {
    console.log(error);
  }
};

const perfil = (req, res) => {
  const { nutriologo } = req;
  res.json({ nutriologo });
};

const confirmar = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmar = await Nutriologo.findOne({ token });

  if (!usuarioConfirmar) {
    const error = new Error("Inicia Sesión, token validado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();

    res.json({ msg: "Cuenta confirmada correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  //Comprobar si usuario exite
  const usuario = await Nutriologo.findOne({ email });

  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  //Comprobar confirmación
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  //Revisar el password
  if (await usuario.comprobarPassword(password)) {
    console.log(usuario);
    //Autenticar
    res.json({
      _id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario.id),
    });
  } else {
    const error = new Error("La contraseña es incorrecta");
    return res.status(403).json({ msg: error.message });
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;

  const existeNutriologo = await Nutriologo.findOne({ email });

  if (!existeNutriologo) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    existeNutriologo.token = generarID();
    await existeNutriologo.save();

    //ENVIAR EMAIL CON INSTRUCCIONES
    emailOlvidePassword({
      email,
      nombre: existeNutriologo.nombre,
      token: existeNutriologo.token,
    });

    res.json({ msg: "Se ha enviado intrucción al email" });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Nutriologo.findOne({ token });

  if (tokenValido) {
    res.json({ msg: "Token valido el usuario existe" });
  } else {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message });
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const nutriologo = await Nutriologo.findOne({ token });

  if (!nutriologo) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    nutriologo.token = null;
    nutriologo.password = password;
    await nutriologo.save();
    res.json({ msg: "Contraseña modificada correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const actualizarPerfil = async (req, res) => {
  const nutriologo = await Nutriologo.findById(req.params.id);
  if (!nutriologo) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  const { email } = req.body;
  if (nutriologo.email !== req.body.email) {
    const existeEmail = await Nutriologo.findOne({ email });
    if (existeEmail) {
      const error = new Error("Email en uso");
      return res.status(400).json({ msg: error.message });
    }
  }

  try {
    nutriologo.nombre = req.body.nombre;
    nutriologo.email = req.body.email;
    nutriologo.web = req.body.web;
    nutriologo.telefono = req.body.telefono;

    const nutriologoActualizado = await nutriologo.save();
    res.json(nutriologoActualizado);
  } catch (error) {
    console.log(error);
  }
};

const actualizarPassword = async (req, res) => {
  //Leer datos
  const { id } = req.nutriologo;
  const { pwd_actual, pwd_nuevo } = req.body;

  //Comprobar usuario existe
  const nutriologo = await Nutriologo.findById(id);
  if (!nutriologo) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  //Comprobar su password
  if (await nutriologo.comprobarPassword(pwd_actual)) {
    nutriologo.password = pwd_nuevo;
    await nutriologo.save();
    res.json({ msg: "Contraseña Guardada Correctamente" });
  } else {
    const error = new Error("La contraseña actual es incorrecta");
    return res.status(400).json({ msg: error.message });
  }
  //Almacenar el nuevo password
};

export {
  registrar,
  perfil,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  actualizarPerfil,
  actualizarPassword,
};
