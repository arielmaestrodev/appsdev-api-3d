import { db } from "@/prisma/db";
import { SignupInput } from "@/schema/auth-schema";

export class UserRepository {
  async findByEmail(email: string) {
    return await db.orm.public.User.where({ email }).first();
  }

  async create(data: SignupInput) {
    return await db.orm.public.User
      .select("id", "name", "email", "createdAt", "role", "emailVerified")
      .create(data)
  }
}