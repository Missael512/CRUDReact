//Para comunicar el cliente con el servidor, se ocupa axios

//Servidor de nodejs

const express = require("express");
const MySql = require("mysql");
const PORT = 3001;
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

//Conexion a base de datos
const db = MySql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "usuarioscrud",
});

//Metodo para crear un nuevo usario
//Desde el cliente se hace una solicitud de tipo POST a http://localhost:3001/create
app.post("/create", (req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const pais = req.body.pais;
  const cargo = req.body.cargo;
  const antiguedad = req.body.antiguedad;

  db.query(
    "INSERT INTO empleados(nombre,edad,pais,cargo,antiguedad) VALUES(?,?,?,?,?)",
    [nombre, edad, pais, cargo, antiguedad],
    (err, result) => {
      if (err) {
        console.log("Error al registrar: ", err);
      } else {
        res.send("Empleado registrado!");
      }
    }
  );
});

//Metodo listar
app.get("/listar", (req, res) => {
  db.query("SELECT * FROM empleados", (err, result) => {
    if (err) {
      console.log("Error al registrar: ", err);
    } else {
      res.send(result); //Retorna el resultado!
    }
  });
});

//Borrar usuario

app.delete("/borra/:id", (req, res) => {
  const ID = parseInt(req.params.id);
  console.log(ID)

  db.query("DELETE FROM empleados WHERE id = ?", [ID], (error, results) => {
    if (error) {
      console.log("Error al borrar", error);
      res.status(500).send("Error al borrar");
    } else {
      res.send("OK, elemento borrado");
    }
  });
});

//Actualizar Query

app.put("/actualiza/:id",(req,res)=>{
  const id = parseInt(req.params.id);
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const pais = req.body.pais;
  const cargo = req.body.cargo;
  const antiguedad = req.body.antiguedad;

  db.query("UPDATE empleados SET nombre = ?,edad = ?,pais = ?,cargo = ?,antiguedad = ? WHERE id = ?",[nombre, edad, pais, cargo, antiguedad,id]
    ,(error,resp)=>{
      if (error) {
        resp.status(500).send("Error al actualizar");
      } else {
        res.send("OK, elemento actualizado!");
      }
    }
  )
})

app.listen(PORT, () => {
  console.log("ALIVE");
});
