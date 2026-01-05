    import { IAuthenticationService, IAuthenticationController } from "@/types/authType";
    import { Request, Response } from "express";

    export class AuthenticationController implements IAuthenticationController {
      private authenticationService: IAuthenticationService;

      constructor(authenticationService: IAuthenticationService) {
        this.authenticationService = authenticationService;
      }

      login = async (req: Request, res: Response): Promise<void> => {
        try {
          // 1. Lee los datos en minúscula (como vienen de la app)
          const { usuario, password } = req.body;

          if (!usuario || !password) {
            res.status(400).json({ message: "Usuario y Password son requeridos" });
            return;
          }

          // 2. Llama al servicio de verificación "traduciendo" las propiedades a mayúscula
          const authResponse = await this.authenticationService.verificacion({ Usuario: usuario, Password: password });

          if (!authResponse) {
            res.status(401).json({ message: "Credenciales inválidas" });
            return;
          }

          res.status(200).json(authResponse);
        } catch (error) {
          res.status(500).json({ message: "Error en el servidor", error: error instanceof Error ? error.message : String(error) });
        }
      }
    }
    