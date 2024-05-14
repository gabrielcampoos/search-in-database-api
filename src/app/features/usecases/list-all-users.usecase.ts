import { UserJson } from "../../models";
import { Result, ResultDto } from "../../shared/utils";
import { FilterUserDto } from "../dtos";
import { UserRepository } from "../repository";

export class ListAllUsersUsecase {
  async execute(filter?: FilterUserDto): Promise<ResultDto> {
    const userRepository = new UserRepository();

    let users: UserJson[] = [];

    const mainUsers = await userRepository.listAllUsers();

    users = mainUsers.map((user) => user.toJson());

    if (filter) {
      if (filter.id) {
        users = users.filter((user) => user.id === filter.id);
      }

      if (filter.name) {
        users = users.filter((user) => user.name === filter.name);
      }

      if (filter.email) {
        users = users.filter((user) => user.email === filter.email);
      }

      if (filter.cpf) {
        users = users.filter((user) => user.cpf === filter.cpf);
      }

      if (filter.phone) {
        users = users.filter((user) => user.phone === filter.phone);
      }
    }

    return Result.success(200, "Usuários listados com sucesso.", users);
  }
}
