import { use, useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {
  //Estados
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({msg: "Todos los campos son obligatorios"});
      return;
    }

    if(password !== repetirPassword) {
      setAlerta({ msg: "Los passwords no coinciden"});
      return;
    }

    if(password.length < 6) {
      setAlerta({msg: "El password es muy corto, agrega minimo 6 caracteres"});
      return;
    }
    setAlerta({});

    //Comunicarnos con el backend para agregar el veterinario
    try {
      await clienteAxios.post("/veterinarios", { nombre, email, password });
      setAlerta({
        msg: "Creado correctamente, revisa tu email",
        error: false
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
    
  }

  const { msg } = alerta;


  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu Cuenta y Administra tus <span className="text-black">Pacientes</span>
        </h1>
      </div>

        <div className="bg-white shadow-lg px-5 py-10 rounded-xl mt-10 md:mt-5">
          {msg && <Alerta
            alerta = {alerta}
          />}
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
              <input 
                type="text" 
                placeholder="Tu Nombre" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={nombre}
                onChange={e=> setNombre(e.target.value)}
              />
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
              <input 
                type="email" 
                placeholder="Tu Email" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
              <input 
                type="password" 
                placeholder="Tu Password" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={e=> setPassword(e.target.value)}
              />
            </div>

            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Repitir Password</label>
              <input 
                type="password" 
                placeholder="Repite tu password" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={repetirPassword}
                onChange={e=> setRepetirPassword(e.target.value)}
              />
            </div>

            <input type="submit" value="Crear cuenta" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
          </form>

          <nav className="lg:flex lg:justify-between mt-10">
            <Link to="/" className="text-gray-500 block text-center">Ya tienes una cuenta? Inicia sesion</Link>
            <Link to="/olvide-password" className="text-gray-500 block text-center">Olvide mi password</Link>
          </nav>
        </div>

    </>
  )
}

export default Registrar;
