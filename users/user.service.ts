import { Repository } from "typeorm";
import { User } from "../dist/users/user.entity";
import { AppDataSource } from "../dist/_helpers/data-source";
import bcrypt from "bcryptjs";

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async getAll() {
    return this.userRepository.find({
      select: ["id", "email", "title", "firstName", "lastName", "role"],
    });
  }

  async getById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async create(params: any) {
    const existingUser = await this.userRepository.findOneBy({ email: params.email });
    if (existingUser) {
      throw new Error(`Email "${params.email}" is already registered`);
    }
  
    // Ensure 'user' is a single instance, not an array
    const user = this.userRepository.create(params);
    
    // Confirm 'passwordHash' exists in User entity
    (user as any).passwordHash = await bcrypt.hash(params.password, 10);
  
    return this.userRepository.save(user);
  }  

  async update(id: number, params: any) {
    const user = await this.getById(id);
    if (!user) throw new Error("User not found");

    if (params.email && params.email !== user.email) {
      const emailTaken = await this.userRepository.findOneBy({ email: params.email });
      if (emailTaken) throw new Error(`Email "${params.email}" is already taken`);
    }

    if (params.password) {
      params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    Object.assign(user, params);
    return this.userRepository.save(user);
  }

  async delete(id: number) {
    const user = await this.getById(id);
    if (!user) throw new Error("User not found");

    return this.userRepository.remove(user);
  }
}
