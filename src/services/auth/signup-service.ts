import bcrypt from "bcrypt";
import { UserRepository } from "@/repositories/user-repository";

export async function signupService(name: string, email: string, password: string) {
  const userRepository = new UserRepository();

  try {
    // Check if email already exists
    const existingEmail = await userRepository.findByEmail(email);
    if (existingEmail) {
      return { code: 409, status: "error", message: "Email already exists" };
    }

    // Insert the User Data to the DB
    const createdData = await userRepository.create({ name, email, password: await bcrypt.hash(password, 10) as string });

    // Return Success Response
    return {
      code: 201,
      status: "success",
      message: "Created account successfully service",
      data: { user: createdData }
    };

  } catch (error) {
    console.error("SignupService Error: ", error);
    return { code: 500, status: "error", message: "Unablwe to create account" }
  }
}