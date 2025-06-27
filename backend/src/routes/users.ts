import { Router, Request, Response, RequestHandler } from "express";
import UsersController from "../controllers/users";

const router = Router();

router.get("/", (async (req: Request, res: Response) => {
  await UsersController.getUsers(req, res);
}));

router.get("/fields", (async (req: Request, res: Response) => {
  await UsersController.getFields(req, res);
}));

router.delete("/:id", (async (req: Request, res: Response) => {
  await UsersController.deleteUser(req, res);
}));

export default router;
  