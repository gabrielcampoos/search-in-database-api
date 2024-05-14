import { FindOptionsWhere } from "typeorm";
import { DatabaseConnection } from "../../../main/database/typeorm.connection";
import { User } from "../../models";
import { UserEntity } from "../../shared/entities";
import { FilterUserDto } from "../dtos";

export class UserRepository {
  private _manager = DatabaseConnection.connection.manager;

  async verifyIfUserExistsByEmail(email?: string): Promise<User | null> {
    const existingUser = await this._manager.findOneBy(UserEntity, {
      email,
    });

    if (!existingUser) return null;

    return this.entityToModel(existingUser);
  }

  async listAllUsers(filter?: FilterUserDto): Promise<User[]> {
    const clausule: FindOptionsWhere<UserEntity> = {
      id: filter?.id,
      name: filter?.name,
      email: filter?.email,
      cpf: filter?.cpf,
      phone: filter?.phone,
    };

    if (filter) {
      if (filter.id) {
        clausule.id = filter.id;
      }

      if (filter.name) {
        clausule.name = filter.name;
      }

      if (filter.email) {
        clausule.email = filter.email;
      }

      if (filter.cpf) {
        clausule.cpf = filter.cpf;
      }

      if (filter.phone) {
        clausule.phone = filter.phone;
      }
    }
    const listOfUsers = await this._manager.find(UserEntity, {
      where: clausule,
    });

    return listOfUsers.map((user) => this.entityToModel(user));
  }

  private entityToModel(dataDB: UserEntity): User {
    return new User(
      dataDB.id,
      dataDB.name,
      dataDB.email,
      dataDB.phone,
      dataDB.cpf
    );
  }
}
