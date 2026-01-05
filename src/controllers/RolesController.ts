import { Request, Response } from "express";
import { IRolesService } from "@/types/rolesType";

export class RolesController {
  private rolesService: IRolesService;

  constructor(rolesService: IRolesService) {
    this.rolesService = rolesService;
  }

  // Crear un nuevo rol
  storeRoles = async (req: Request, res: Response): Promise<void> => {
    try {
      const nuevoRol = await this.rolesService.createRoles(req.body);
      res.status(201).json(nuevoRol);
    } catch (error) {
      res.status(500).json({ message: "Error al crear el rol", error });
    }
  };

  // Obtener todos los roles
  indexListRoles = async (req: Request, res: Response): Promise<void> => {
    try {
      const roles = await this.rolesService.findRoles();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los roles", error });
    }
  };

  // Obtener un rol por ID
  indexListRolesById = async (req: Request, res: Response): Promise<void> => {
    try {
      const rol = await this.rolesService.findByIdRoles(req.params.id);
      if (!rol) {
        res.status(404).json({ message: "Rol no encontrado" });
        return;
      }
      res.status(200).json(rol);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el rol", error });
    }
  };

  // Actualizar un rol por ID
  updateRolesById = async (req: Request, res: Response): Promise<void> => {
    try {
      const rolActualizado = await this.rolesService.updateRoles(
        req.params.id,
        req.body
      );
      if (!rolActualizado) {
        res.status(404).json({ message: "Rol no encontrado" });
        return;
      }
      res.status(200).json(rolActualizado);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el rol", error });
    }
  };

  // Eliminar un rol por ID
  deleteRolesById = async (req: Request, res: Response): Promise<void> => {
    try {
      const rolEliminado = await this.rolesService.deleteRoles(req.params.id);
      if (!rolEliminado) {
        res.status(404).json({ message: "Rol no encontrado" });
        return;
      }
      res.status(200).json({ message: "Rol eliminado exitosamente", rol: rolEliminado });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el rol", error });
    }
  };
}
