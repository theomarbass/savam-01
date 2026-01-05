import { IUsuarioService } from "@/types/usuariosType";
import { Request, Response } from "express";

export class UsuarioController {
    private usuarioService: IUsuarioService

    constructor(usuarioService: IUsuarioService) {
        this.usuarioService = usuarioService;
    }

    storeUsuario = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = await this.usuarioService.createUsuario(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            res.status(500).json({ message: "Error al crear usuario", error: error instanceof Error ? error.message : String(error) });
        }
    }

    indexListUsuario = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuarios = await this.usuarioService.findUsuarios();
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener usuarios", error: error instanceof Error ? error.message : String(error) });
        }
    }

    indexListUsuarioById = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = await this.usuarioService.findByIdUsuario(req.params.id);
            if (!usuario) {
                res.status(404).json({ message: "Usuario no encontrado" });
                return;
            }
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener usuario", error: error instanceof Error ? error.message : String(error) });
        }
    }

    updateUsuarioById = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = await this.usuarioService.updateUsuario(req.params.id, req.body);
            if (!usuario) {
                res.status(404).json({ message: "Usuario no encontrado" });
                return;
            }
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar usuario", error: error instanceof Error ? error.message : String(error) });
        }
    }

    deleteUsuarioById = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = await this.usuarioService.deleteUsuario(req.params.id);
            if (!usuario) {
                res.status(404).json({ message: "Usuario no encontrado" });
                return;
            }
            res.status(200).json({ message: "Usuario eliminado exitosamente", usuario });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar usuario", error: error instanceof Error ? error.message : String(error) });
        }
    }
}