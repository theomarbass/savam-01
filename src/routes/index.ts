    import { Router } from "express";
    import usuariosRoutes from "@/routes/UsuariosRouter";
    import rolesRoutes from "@/routes/RolesRouter";
    import numerosRoutes from "@/routes/NumerosRouter";
    import suscriptorRoutes from "@/routes/SuscriptorRouter";
    import authenticationRouter from "@/routes/AuthenticationRouter";
    // 1. IMPORTAMOS NUESTRO NUEVO ENRUTADOR
    import consultaRouter from "./ConsultaRouter";

    export default () => {
      const router = Router();

      // Rutas para Usuarios
      usuariosRoutes(router);

      // Rutas para Roles
      rolesRoutes(router);

      // Rutas para Numeros
      numerosRoutes(router);

      // Rutas para Suscriptor
      suscriptorRoutes(router);

      // Rutas para Autenticacion
      router.use(authenticationRouter);

      // 2. LE DECIMOS A LA API QUE USE EL NUEVO ENRUTADOR
      router.use(consultaRouter);

      return router;
    };
    