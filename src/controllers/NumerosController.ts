import { Request, Response } from "express";
import { INumerosService } from "@/types/numerosType";

export class NumerosController {
  private numerosService: INumerosService;

  constructor(numerosService: INumerosService) {
    this.numerosService = numerosService;
  }

  // Crear un nuevo rol
  storeNumeros = async (req: Request, res: Response): Promise<void> => {
    try {
      const nuevoRol = await this.numerosService.createNumeros(req.body);
      res.status(201).json(nuevoRol);
    } catch (error) {
      res.status(500).json({ message: "Error al crear el rol", error });
    }
  };

  // Obtener todos los Numeros
  indexListNumeros = async (req: Request, res: Response): Promise<void> => {
    try {
      const Numeros = await this.numerosService.findNumeros();
      res.status(200).json(Numeros);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los Numeros", error });
    }
  };

  // Obtener un rol por ID
  indexListNumerosById = async (req: Request, res: Response): Promise<void> => {
    try {
      const rol = await this.numerosService.findByIdNumeros(req.params.id);
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
  updateNumerosById = async (req: Request, res: Response): Promise<void> => {
    try {
      const rolActualizado = await this.numerosService.updateNumeros(
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
}