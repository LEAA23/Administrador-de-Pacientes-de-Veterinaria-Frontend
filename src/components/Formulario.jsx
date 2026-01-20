import { useState, useEffect } from "react";
import Alerta from "./../components/Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [alerta, setAlerta] = useState({});

  const [id, setId] = useState(null);

  //La primer ejecucion paciente === null
  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if(paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(new Date(paciente.fecha).toISOString());
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [paciente]);

  const handleSubmit = e => {
    e.preventDefault();

    if([nombre, propietario, email, fecha, sintomas].includes("")) {
      setAlerta({
        msg: "Los Campos No Pueden ir Vacios",
        error: true
      });
      return;
    }

    guardarPaciente({nombre, propietario, email, fecha, sintomas, id});
    setAlerta({
      msg: "Guardado Correctamente"
    });
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
    setId("");

  }

  const { msg } = alerta;

  return (
    <>
      <p className="text-lg text-center mb-10">
        Agrega tus Pacientes y <span className="font-bold text-indigo-500">Administralos</span>
      </p>

      <form
        className="bg-white mb-10 py-10 px-5 lg:mb-0 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        {msg && <Alerta
          alerta={alerta}
        />}
        <div className="mb-5">
          <label 
            htmlFor="nombre"
            className="text-gray-700 uppercase font-bold"
          >Nombre Mascota</label>
          <input 
            type="text" 
            id="nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Nombre de la Mascota"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
          >Nombre Propietario</label>
          <input 
            type="text" 
            id="propietario"
            value={propietario}
            onChange={e => setPropietario(e.target.value)}
            placeholder="Nombre del Propieatario"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="email"
            className="text-gray-700 uppercase font-bold"
          >Email del Propietario</label>
          <input 
            type="email" 
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email del Propietario"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="fecha"
            className="text-gray-700 uppercase font-bold"
          >Fecha de Alta</label>
          <input 
            type="date" 
            id="fecha"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
          >Sintomas</label>
          <textarea
            id="sintomas"
            placeholder="Sintomas de la Mascota"
            value={sintomas}
            onChange={e => setSintomas(e.target.value)}
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>

        <input 
        type="submit"
        className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
        value={id ? "Actualizar Paciente" : "Agregar Paciente"} 
        />
      </form>
    </>
  )
}

export default Formulario;