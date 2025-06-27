import { Request, Response } from "express";
import UsersService from "../services/users";

export default class UsersController {
  static async getUsers(req: Request, res: Response) {
    const users = await UsersService.getUsers();
    return res.json(users);
  }
  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const deletedUser = await UsersService.deleteUser(
      Number(id)
    );
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(204).send();
  }

  static async getFields(req: Request, res: Response) {
    const fields = await UsersService.getFields();
    return res.json(fields);
  }
}