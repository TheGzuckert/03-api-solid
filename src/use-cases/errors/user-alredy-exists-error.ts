export class UseralredyExistError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
