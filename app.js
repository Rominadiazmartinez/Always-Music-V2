import pkg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pkg;
 
const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
}
const pool = new Pool(config );


const nuevoAlumno = async (nombre, rut, curso, nivel) => {
  try {
    let query = {
      text: "INSERT INTO alumnos VALUES($1, $2, $3, $4)",
      values: [nombre, rut, curso, nivel]
    } 
    const result = await pool.query(query)
    console.log("Usuario creado con éxito")
  } catch (error) {
    console.log("Hubo un problema al consultar la base de datos :(")
  }
    
}

const buscarAlumno = async (rut) => {
  try {
    let query = {
      rowMode: "array",
      text: "SELECT * FROM alumnos WHERE rut = $1",
      values: [rut]
    } 
    const result = await pool.query(query)
    console.log("Usuario encontrado")
    console.log(result.rows)
  } catch (error) {
    console.log("Hubo un problema al consultar la base de datos :(")
  }
    
}

const alumnosRegistrados = async () => {
  try {
    let query ={
      rowMode: "array",
      text: "SELECT * FROM alumnos"
    }
    const result = await pool.query(query)
    console.log("Usuarios encontrados con éxito");
    console.log(result.rows)
  } catch (error) {
    console.log("Hubo un problema al consultar la base de datos :(")
  }
    
}

const actualizarDatos = async (nombre, rut) => {
  try {
    let query = {
      text: "UPDATE alumnos SET nombre = $1 WHERE rut = $2",
      values: [nombre, rut]
    }
    const result = await pool.query(query)
    console.log("Usuario modificado con éxito")
  } catch (error) {
    console.log("Hubo un problema al consultar la base de datos :(")
  }
    
}

const eliminarAlumno = async (rut) => {
  try {
    let query = {
      text: "DELETE from alumnos WHERE rut = $1",
      values: [rut]
    }
    const result = await pool.query(query)
    console.log("Usuario eliminado con éxito")
  } catch (error) {
    console.log("Hubo un problema al consultar la base de datos :(")
  }
    
}

let argumentos = process.argv.slice(2)

let comando = argumentos[0]

switch(comando) {
  case "crear":
    let nombre = argumentos[1]
    let rut = argumentos[2]
    let curso = argumentos[3]
    let nivel = argumentos[4]
    nuevoAlumno(nombre, rut, curso, nivel)  
    break;

  case "buscar":
    let rutBuscar = argumentos[1]
    buscarAlumno(rutBuscar); 
    break;

  case "registrados":
    alumnosRegistrados()
    break;

  case "actualizar":
    let nombreActualizado = argumentos[1]
    let rutActualizar = argumentos[2]
    actualizarDatos(nombreActualizado, rutActualizar)
    break;

  case "eliminar":
    let rutEliminar = argumentos[1]
    eliminarAlumno(rutEliminar)  
    break;

  default:
    console.log("Opción no reconocida");
}












