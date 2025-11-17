import { Request, Response, NextFunction } from 'express';
import { RegisterUserUseCase } from '../../../application/use-cases/RegisterUserUseCase.js';
import { LoginUserUseCase } from '../../../application/use-cases/LoginUserUseCase.js';
import { GetCurrentUserUseCase } from '../../../application/use-cases/GetCurrentUserUseCase.js';
import { UserRepository } from '../../../infrastructure/db/repositories/UserRepository.js';
import { AuthRequest } from '../middlewares/authMiddleware.js';

export class AuthController {
  private registerUserUseCase: RegisterUserUseCase;
  private loginUserUseCase: LoginUserUseCase;
  private getCurrentUserUseCase: GetCurrentUserUseCase;

  constructor() {
    const userRepository = new UserRepository();
    this.registerUserUseCase = new RegisterUserUseCase(userRepository);
    this.loginUserUseCase = new LoginUserUseCase(userRepository);
    this.getCurrentUserUseCase = new GetCurrentUserUseCase(userRepository);
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

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const result = await this.loginUserUseCase.execute({
        email,
        password,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  me = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error('Usuario no autenticado');
      }

      const user = await this.getCurrentUserUseCase.execute(req.user.userId);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
}
