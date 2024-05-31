import "./index.css";
import Axios from "axios";
import { useState } from "react";

function App() {
  const trashIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-trash"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        stroke-width="1"
        stroke="#ff2825"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 7l16 0" />
        <path d="M10 11l0 6" />
        <path d="M14 11l0 6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </svg>
    );
  };

  const editIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-edit"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#ffbf00"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
        <path d="M16 5l3 3" />
      </svg>
    );
  };

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [antiguedad, setAntiguedad] = useState(0);
  const [btnActualizar, setBtnActualizar] = useState(0);
  const [idUpdate, setIdUpdate] = useState(0);

  const [listaEmpleados, setlistaEmpleados] = useState([]);

  const clearData = () => {
    setNombre("");
    setEdad(0);
    setPais("");
    setCargo("");
    setAntiguedad(0);
  };

  //Crear un nuevo usuario
  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      antiguedad: antiguedad,
    })
      .then(() => {
        alert("Empleado registrado");
        getEmpleados();
        clearData();
      })
      .catch((error) => {
        console.log(`Error al registrar usuario --> ${error}`);
      });
  };

  const addDumyInfo = () => {
    setNombre("Missael");
    setEdad(27);
    setPais("Mexico");
    setCargo("Developer");
    setAntiguedad(2);
  };

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/listar").then((response) => {
      setlistaEmpleados(response.data);
    });
  };

  const deleteEmpleado = (id) => {
    console.log(id);
    Axios.delete(`http://localhost:3001/borra/${id}`).then((res) => {
      alert(`Exito`);
      getEmpleados();
    });
  };

  //Habilita el formulario para editar
  const updateEmpleado = (id, nombre, edad, pais, cargo, antiguedad) => {
    //abilitar boton!
    setBtnActualizar(1);
    setIdUpdate(id);
  };
  //Envia la solicitud de actualizar al Back
  const sendUpdate = () => {
    Axios.put(`http://localhost:3001/actualiza/${idUpdate}`, {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      antiguedad: antiguedad,
    })
      .then(() => {
        alert("Exito al actualizar");
        getEmpleados();
      })
      .catch((error) => {
        alert("Error alv ", error);
      });
    setBtnActualizar(0);
  };

  return (
    <div className="App">
      <div className="datos">
        <label>
          Nombre:
          <input
            type="text"
            onChange={(e) => {
              setNombre(e.target.value);
            }}
            value={nombre}
          ></input>
        </label>
        <label>
          Edad:
          <input
            type="number"
            onChange={(e) => {
              setEdad(e.target.value);
            }}
            value={edad}
          ></input>
        </label>
        <label>
          Pais:
          <input
            type="text"
            onChange={(e) => {
              setPais(e.target.value);
            }}
            value={pais}
          ></input>
        </label>
        <label>
          Cargo:
          <input
            type="text"
            onChange={(e) => {
              setCargo(e.target.value);
            }}
            value={cargo}
          ></input>
        </label>
        <label>
          Antiguedad:
          <input
            type="number"
            onChange={(e) => {
              setAntiguedad(e.target.value);
            }}
            value={antiguedad}
          ></input>
        </label>
        <button onClick={() => add()}>Registrar</button>
        <button onClick={addDumyInfo}>dummy info</button>
        <button onClick={getEmpleados}>Listar</button>
        {btnActualizar ? (
          <button
            onClick={() => {
              sendUpdate();
            }}
          >
            Actualizar registro:
          </button>
        ) : (
          ""
        )}

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Pais</th>
              <th>Borrar</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {listaEmpleados.map((val, key) => {
              return (
                <tr>
                  <td>{val.Nombre}</td>
                  <td>{val.Edad}</td>
                  <td>{val.Pais}</td>
                  <td>
                    <button
                      className="operationButton"
                      onClick={() => {
                        deleteEmpleado(val.id);
                      }}
                    >
                      {trashIcon()}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        updateEmpleado(
                          val.id,
                          val.nombre,
                          val.edad,
                          val.pais,
                          val.cargo,
                          val.antiguedad
                        );
                      }}
                    >
                      {editIcon()}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
