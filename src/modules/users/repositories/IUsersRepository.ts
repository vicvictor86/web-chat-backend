import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../infra/typeorm/entities/User";

export default interface IUsersRepository {
  findById(id: string) : Promise<User | null>;
  findByEmail(email: string) : Promise<User | null>;
  findByUsername(username: string) : Promise<User | null>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}