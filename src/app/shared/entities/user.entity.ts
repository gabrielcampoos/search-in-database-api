import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  cpf?: string;

  @Column()
  phone!: string;
}
