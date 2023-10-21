import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UseralredyExistError } from './errors/user-alredy-exists-error'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

// Solid
// D - Dependency Inversion Principle

interface RegusterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegusterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UseralredyExistError()
    }
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
    return {
      user,
    }
  }
}
