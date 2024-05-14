import { Request, Response } from "express";
import { ListAllUsersUsecase } from "../usecases";
import { Result, httpHelper } from "../../shared/utils";

export class UserController {
  static async listAllUsers(request: Request, response: Response) {
    const { id, name, email, cpf, phone } = request.body;

    try {
      const usecase = new ListAllUsersUsecase();

      const result = await usecase.execute({
        id,
        name,
        email,
        cpf,
        phone,
      });

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }
}
