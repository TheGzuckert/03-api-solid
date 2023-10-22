import { PrismaUserRepositoty } from '@/repositories/prisma/prisma-users-repositoury'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUserRepositoty()
  const authenticateUsecase = new AuthenticateUseCase(usersRepository)

  return authenticateUsecase
}
