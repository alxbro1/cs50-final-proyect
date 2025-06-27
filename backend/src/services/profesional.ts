import prisma from "../config/db";

export default class ProfessionalService {
  static async getProfessionals() {
    const professionals = await prisma.professional.findMany();
    return professionals;
  }

  static async createProfessional(data: { name: string }) {
    const newProfessional = await prisma.professional.create({
      data,
    });
    return newProfessional;
  }

  static async deleteProfessional(id: number) {
    const deletedProfessional = await prisma.professional.delete({
      where: { id },
    });
    return deletedProfessional;
  }

  static async getFields() {
    const fields = [{ label: "ID", name: "id" }, { label: "Name", name: "name" }];
    return fields;
  }
}
