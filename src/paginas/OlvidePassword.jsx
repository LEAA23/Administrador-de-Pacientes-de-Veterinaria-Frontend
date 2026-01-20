import { Link } from "react-router-dom";
import { useState } from "react";
import clienteAxios from "./../config/axios"
import Alerta from "./../components/Alerta";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if(email === "") {
      setAlerta({ msg: "El Email es Obligatorio", error: true });
      return;
    }

    try {
      const {data} = await clienteAxios.post("/veterinarios/olvide-password", {email});
      setAlerta({ msg: data.msg })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu Acceso y no Pierdas tus <span className="text-black">Pacientes</span>
        </h1>
      </div>

        <div className="bg-white shadow-lg px-5 py-10 rounded-xl mt-10 md:mt-5">
          {msg && <Alerta
            alerta={alerta}
          />}
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Tu Email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
            </div>
            <input type="submit" value="Enviar instrucciones" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
          </form>

          <nav className="lg:flex lg:justify-between mt-10">
            <Link to="/" className="text-gray-500 block text-center">Ya tienes una cuenta? Inicia sesion</Link>
            <Link to="/registrar" className="text-gray-500 block text-center">No tienes cuenta? Registrate</Link>
          </nav>
        </div>
    </>
  )
}

export default OlvidePassword;
