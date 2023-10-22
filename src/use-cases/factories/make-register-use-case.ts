import { PrismaUserRepositoty } from '@/repositories/prisma/prisma-users-repositoury'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUserRepositoty()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
