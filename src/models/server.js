import express from "express";
import { config } from 'dotenv';
import cors from "cors";
import { sequelize } from "../database/configdb.js"
import defaultRoutes from "../routes/default.js"
// import recetasRoutes from "../routes/recetas.js"
// import usuariosRoutes from "../routes/usuarios.js"
import ingredientesRoutes from "../routes/ingredientes.js"

class Server {
  constructor() {
    //Inicializacion Del Server
    this.app = express();
    config();
    this.port = process.env.PORT;
    
    this.dbConnection();

    //Middlewares
    this.middlewares();


    //Rutas Del Server
    this.routes();
  }

  async dbConnection(){
    try{
      await sequelize.authenticate();
      console.log("bd todo bien")
    }catch(error){
      throw new Error( error );
    }
  }


  middlewares() {
    //CORS
    this.app.use(cors());
    //ParseJSON
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: "50mb" }));
  }


  routes() {
    this.app.use("/", defaultRoutes);
    // this.app.use("/api/recetas", recetasRoutes)
    // this.app.use("/api/usuarios", usuariosRoutes)
    this.app.use("/api/ingredientes", ingredientesRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server Running On PORT ==> ", this.port);
    });
  }
}

export default Server
