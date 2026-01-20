import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "./../config/axios";
import Alerta from "./../components/Alerta";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  //Extraer el token de la URL
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setAlerta({
          msg: "Coloca tu Nuevo Password"
        });
        setTokenValido(true);

      } catch (error) {
        setAlerta({
          msg: "Hubo un error con el enlace",
          error: true
        });
      }
    }
    comprobarToken();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if(password.length < 6) {
      setAlerta ({
        msg: "El Password debe tener minimo 6 caracteres",
        error: true
      });
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const {data} = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg
      });
      setPasswordModificado(true);
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
          Reestablce tu Paasword y No Pierdas Acceso a tus <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className="bg-white shadow-lg px-5 py-10 rounded-xl mt-10 md:mt-5">
          {msg && <Alerta
            alerta={alerta}
          />}

          {tokenValido && (
            <form onSubmit={handleSubmit}>
           
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Tu Nuevo Password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
              </div>
              <input type="submit" value="Reestablcer Password" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
            </form>
          )}

          {passwordModificado && (
            <Link to="/" className="text-gray-500 block text-center">Iniciar sesion</Link>
          )}
          
          
        </div>
    </>
  )
}

export default NuevoPassword;