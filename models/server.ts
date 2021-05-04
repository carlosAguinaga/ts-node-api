import express, { Application } from "express";
import userRoutes from "../routes/usuarios";
import cors from 'cors';
import db from "../db/connection";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    usuarios: "/api/usuarios",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    // métodos iniciales
    this.dbConnection()
    this.middelwares()
    this.routes();
  }

  routes() {
    this.app.use(this.apiPaths.usuarios, userRoutes);
  }

  // TODO: conectar base de datos

  async dbConnection () {
    try {
      await db.authenticate();
      console.log('Database online')
    } catch (error) {
      throw new Error(error);
    }
  }

  middelwares () {

    // cors
    this.app.use(cors())

    // lectura del body
    this.app.use(express.json())

    // Carpeta Publica
    this.app.use(express.static('public'))

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto" + this.port);
    });
  }
}

export default Server;
