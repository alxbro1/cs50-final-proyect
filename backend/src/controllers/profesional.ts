import { Request, Response } from "express";
import ProfessionalService from "../services/profesional";

export default class ProfessionalController {
  async getProfessionals(req: Request, res: Response) {
    const professionals = await ProfessionalService.getProfessionals();
    return res.json(professionals);
  }
  async createProfessional(req: Request, res: Response) {
    const data = req.body;
    const newProfessional = await ProfessionalService.createProfessional(data);
    res.status(201).json(newProfessional);
  }
  async deleteProfessional(req: Request, res: Response) {
    const { id } = req.params;
    const deletedProfessional = await ProfessionalService.deleteProfessional(
      Number(id)
    );
    if (!deletedProfessional) {
      return res.status(404).json({ error: "Professional not found" });
    }
    res.status(204).send();
  }

  async getFields(req: Request, res: Response) {
    const fields = await ProfessionalService.getFields();
    return res.json(fields);
  }
}
