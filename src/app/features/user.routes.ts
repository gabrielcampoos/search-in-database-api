import { Router } from "express";
import { UserController } from "./controller";

export default () => {
  const router = Router();

  router.get("/user", UserController.listAllUsers);

  return router;
};
