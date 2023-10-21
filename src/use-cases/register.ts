import { UsersRepository } from '@/repositories/users-repositoty'
import { hash } from 'bcryptjs'
import { UseralredyExistError } from './errors/user-alredy-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

// Solid
// D - Dependency Inversion Principle

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UseralredyExistError()
    }
    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
