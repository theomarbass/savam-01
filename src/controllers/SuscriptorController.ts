import { Request, Response } from "express";
import { ISuscriptorService } from "@/types/suscriptorType";

export class SuscriptorController {
  private suscriptorService: ISuscriptorService;

  constructor(suscriptorService: ISuscriptorService) {
    this.suscriptorService = suscriptorService;
  }

  // Crear un nuevo rol
  storeSuscriptor = async (req: Request, res: Response): Promise<void> => {
    try {
      const nuevoSuscriptor = await this.suscriptorService.createSuscriptor(req.body);
      res.status(201).json(nuevoSuscriptor);
    } catch (error) {
      res.status(500).json({ message: "Error al crear el suscriptor", error });
    }
  };

  // Obtener todos los Numeros
  indexListSuscriptor = async (req: Request, res: Response): Promise<void> => {
    try {
      const suscriptor = await this.suscriptorService.findSuscriptor();
      res.status(200).json(suscriptor);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los suscriptor", error });
    }
  };

  // Obtener un rol por ID
  indexListSuscriptorById = async (req: Request, res: Response): Promise<void> => {
    try {
      const suscriptor = await this.suscriptorService.findByIdSuscriptor(req.params.id);
      if (!suscriptor) {
        res.status(404).json({ message: "Suscriptor no encontrado" });
        return;
      }
      res.status(200).json(suscriptor);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el suscriptor", error });
    }
  };

  // Actualizar un rol por ID
  updateSuscriptorById = async (req: Request, res: Response): Promise<void> => {
    try {
      const suscriptorActualizado = await this.suscriptorService.updateSuscriptor(
        req.params.id,
        req.body
      );
      if (!suscriptorActualizado) {
        res.status(404).json({ message: "Suscriptor no encontrado" });
        return;
      }
      res.status(200).json(suscriptorActualizado);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el suscriptor", error });
    }
  };
}