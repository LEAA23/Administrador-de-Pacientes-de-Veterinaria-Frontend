import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "./../components/Alerta";
import clienteAxios from "./../config/axios";
import useAuth from "./../hooks/useAuth"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const {setAuth} = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if(email === "" || password =="") {
      setAlerta({
        msg: "El email y el Password No Pueden estar Vacios",
        error: true
      });
      return;
    }

    try {
      const url = `/veterinarios/login`;
      const {data} = await clienteAxios.post(url, { email, password });
      setAuth(data);
      localStorage.setItem("token", data.token);
      navigate("/admin")
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const { msg } = alerta;

  return (
    <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">
            Inicia Sesion y Administra tus <span className="text-black">Pacientes</span>
          </h1>
        </div>

        <div className="bg-white shadow-lg px-5 py-10 rounded-xl mt-10 md:mt-5">
          {msg && <Alerta
            alerta={alerta}
          />}
          <form onSubmit={handleSubmit}>
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
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <input type="submit" value="Iniciar sesion" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
          </form>

          <nav className="lg:flex lg:justify-between mt-10">
            <Link to="/registrar" className="text-gray-500 block text-center">No tienes cuenta? Registrate</Link>
            <Link to="/olvide-password" className="text-gray-500 block text-center">Olvide mi password</Link>
          </nav>
        </div>
    </>
  )
}

export default Login;
