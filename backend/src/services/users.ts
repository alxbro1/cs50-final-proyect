import prisma from "../config/db";

export default class UsersService {
  static async getUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

  static async deleteUser(id: number) {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return deletedUser;
  }

  static async getFields() {
    const fields = [
      { label: "ID", name: "id", type: "string" },
      { label: "Name", name: "name", type: "string" },
      { label: "Email", name: "email", type: "string" },
      { label: "Role", name: "role", type: "string" },
      { label: "Created At", name: "createdAt", type: "date" },
      { label: "Updated At", name: "updatedAt", type: "date" },
    ];
    return fields;
  }
}
