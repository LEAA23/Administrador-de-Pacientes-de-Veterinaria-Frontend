import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "./../components/Alerta";

const ConfirmarCuenta = () => {
  //Definir los states
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  //extraemos los parametros de la url
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async() => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const {data} = await clienteAxios(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        }) ;
      }
      
      setCargando(false);
    }
    confirmarCuenta();
  }, []);


  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu Cuenta y Administra tus <span className="text-black">Pacientes</span>
        </h1>
      </div>

        <div className="bg-white shadow-lg px-5 py-10 rounded-xl mt-10 md:mt-5">
          {!cargando && <Alerta
            alerta={alerta}

          />}

          {cuentaConfirmada && (
            <Link to="/" className="block text-center my-5 text-gray-500">Iniciar Sesion</Link>
          )}
        </div>

    </>
  )
}

export default ConfirmarCuenta;
