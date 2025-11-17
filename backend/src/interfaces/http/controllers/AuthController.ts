import { Request, Response, NextFunction } from 'express';
import { RegisterUserUseCase } from '../../../application/use-cases/RegisterUserUseCase.js';
import { UserRepository } from '../../../infrastructure/db/repositories/UserRepository.js';

export class AuthController {
  private registerUserUseCase: RegisterUserUseCase;

  constructor() {
    const userRepository = new UserRepository();
    this.registerUserUseCase = new RegisterUserUseCase(userRepository);
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const result = await this.registerUserUseCase.execute({
        name,
        email,
        password,
      });

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
