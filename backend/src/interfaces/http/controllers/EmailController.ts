import { Request, Response, NextFunction } from 'express';
import { SendVerificationEmailUseCase } from '../../../application/use-cases/SendVerificationEmailUseCase.js';
import { VerifyEmailUseCase } from '../../../application/use-cases/VerifyEmailUseCase.js';
import { RequestPasswordResetUseCase } from '../../../application/use-cases/RequestPasswordResetUseCase.js';
import { ResetPasswordUseCase } from '../../../application/use-cases/ResetPasswordUseCase.js';

export class EmailController {
  private sendVerificationEmailUseCase: SendVerificationEmailUseCase;
  private verifyEmailUseCase: VerifyEmailUseCase;
  private requestPasswordResetUseCase: RequestPasswordResetUseCase;
  private resetPasswordUseCase: ResetPasswordUseCase;

  constructor() {
    this.sendVerificationEmailUseCase = new SendVerificationEmailUseCase();
    this.verifyEmailUseCase = new VerifyEmailUseCase();
    this.requestPasswordResetUseCase = new RequestPasswordResetUseCase();
    this.resetPasswordUseCase = new ResetPasswordUseCase();
  }

  sendVerificationEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      await this.sendVerificationEmailUseCase.execute(email);

      res.status(200).json({
        success: true,
        message: 'Email de verificación enviado correctamente',
      });
    } catch (error) {
      next(error);
    }
  };

  verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.body;

      await this.verifyEmailUseCase.execute(token);

      res.status(200).json({
        success: true,
        message: 'Email verificado exitosamente',
      });
    } catch (error) {
      next(error);
    }
  };

  requestPasswordReset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      await this.requestPasswordResetUseCase.execute(email);

      res.status(200).json({
        success: true,
        message: 'Si el email existe, recibirás instrucciones para restablecer tu contraseña',
      });
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, newPassword } = req.body;

      await this.resetPasswordUseCase.execute(token, newPassword);

      res.status(200).json({
        success: true,
        message: 'Contraseña restablecida exitosamente',
      });
    } catch (error) {
      next(error);
    }
  };
}
