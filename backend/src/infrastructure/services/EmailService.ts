import nodemailer, { Transporter } from 'nodemailer';
import { config } from '../config/env.js';
import { logger } from '../logger/logger.js';

export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.secure,
      auth: {
        user: config.email.user,
        pass: config.email.password,
      },
    });
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `${config.frontend.url}/verificar-email?token=${token}`;

    try {
      await this.transporter.sendMail({
        from: config.email.from,
        to: email,
        subject: '✉️ Verifica tu correo para activar tu cuenta',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                line-height: 1.6; 
                color: #333;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
              }
              .container { 
                max-width: 600px; 
                margin: 40px auto; 
                background: white;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                overflow: hidden;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 30px;
                text-align: center;
              }
              .header h1 {
                color: white;
                margin: 0;
                font-size: 24px;
              }
              .content {
                padding: 30px;
              }
              .button { 
                display: inline-block; 
                padding: 14px 32px; 
                background-color: #2563eb;
                color: #ffffff !important;
                text-decoration: none; 
                border-radius: 8px;
                margin: 25px 0;
                font-weight: 600;
                font-size: 16px;
                box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
                transition: all 0.3s ease;
              }
              .button:hover {
                background-color: #1d4ed8;
                box-shadow: 0 6px 8px rgba(37, 99, 235, 0.4);
              }
              .link-box {
                background-color: #f3f4f6;
                padding: 15px;
                border-radius: 6px;
                margin: 20px 0;
                word-break: break-all;
              }
              .footer { 
                margin-top: 30px; 
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                font-size: 13px; 
                color: #6b7280; 
              }
              .warning {
                background-color: #fef3c7;
                border-left: 4px solid #f59e0b;
                padding: 12px;
                margin: 20px 0;
                border-radius: 4px;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 ¡Bienvenido a Sistema de Finanzas!</h1>
              </div>
              <div class="content">
                <p>Hola 👋</p>
                <p>Gracias por registrarte. Estoy muy contento de que uses mi aplicación para gestionar tus finanzas.</p>
                <p><strong>Solo falta un paso:</strong> necesito que verifiques tu correo electrónico para activar tu cuenta y que puedas empezar a usar todas las funcionalidades.</p>
                
                <div style="text-align: center;">
                  <a href="${verificationUrl}" class="button" style="color: #ffffff;">✅ Verificar mi Email</a>
                </div>
                
                <p style="margin-top: 25px; font-size: 14px; color: #6b7280;">Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
                <div class="link-box">
                  <a href="${verificationUrl}" style="color: #2563eb; text-decoration: none;">${verificationUrl}</a>
                </div>
                
                <div class="warning">
                  <strong>⏰ Importante:</strong> Este enlace expirará en 24 horas por seguridad.
                </div>
                
                <div class="footer">
                  <p><strong>¿No creaste esta cuenta?</strong></p>
                  <p>Si no te registraste en Sistema de Finanzas, simplemente ignora este correo. No se realizará ninguna acción.</p>
                  <p style="margin-top: 20px;">Saludos,<br><strong>José - Desarrollador de Sistema de Finanzas</strong></p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
          🎉 ¡Bienvenido a Sistema de Finanzas!
          
          Hola 👋
          
          Gracias por registrarte. Estoy muy contento de que uses mi aplicación para gestionar tus finanzas.
          
          Solo falta un paso: necesito que verifiques tu correo electrónico para activar tu cuenta.
          
          Verifica tu email visitando este enlace:
          ${verificationUrl}
          
          ⏰ Importante: Este enlace expirará en 24 horas por seguridad.
          
          ¿No creaste esta cuenta?
          Si no te registraste en Sistema de Finanzas, simplemente ignora este correo.
          
          Saludos,
          José - Desarrollador de Sistema de Finanzas
        `,
      });

      logger.info(`Email de verificación enviado a: ${email}`);
    } catch (error) {
      logger.error(`Error al enviar email de verificación a ${email}: ${error}`);
      throw new Error('Error al enviar email de verificación');
    }
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const resetUrl = `${config.frontend.url}/restablecer-contrasena?token=${token}`;

    try {
      await this.transporter.sendMail({
        from: config.email.from,
        to: email,
        subject: '🔐 Recuperación de contraseña',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                line-height: 1.6; 
                color: #333;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
              }
              .container { 
                max-width: 600px; 
                margin: 40px auto; 
                background: white;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                overflow: hidden;
              }
              .header {
                background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
                padding: 30px;
                text-align: center;
              }
              .header h1 {
                color: white;
                margin: 0;
                font-size: 24px;
              }
              .content {
                padding: 30px;
              }
              .button { 
                display: inline-block; 
                padding: 14px 32px; 
                background-color: #dc2626;
                color: #ffffff !important;
                text-decoration: none; 
                border-radius: 8px;
                margin: 25px 0;
                font-weight: 600;
                font-size: 16px;
                box-shadow: 0 4px 6px rgba(220, 38, 38, 0.3);
                transition: all 0.3s ease;
              }
              .button:hover {
                background-color: #b91c1c;
                box-shadow: 0 6px 8px rgba(220, 38, 38, 0.4);
              }
              .link-box {
                background-color: #f3f4f6;
                padding: 15px;
                border-radius: 6px;
                margin: 20px 0;
                word-break: break-all;
              }
              .warning { 
                background-color: #fef3c7; 
                padding: 15px; 
                border-left: 4px solid #f59e0b; 
                margin: 20px 0;
                border-radius: 4px;
              }
              .footer { 
                margin-top: 30px; 
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                font-size: 13px; 
                color: #6b7280; 
              }
              .security-tip {
                background-color: #fecaca;
                border-left: 4px solid #dc2626;
                padding: 12px;
                margin: 20px 0;
                border-radius: 4px;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🔐 Recuperación de Contraseña</h1>
              </div>
              <div class="content">
                <p>Hola 👋</p>
                <p>Recibí tu solicitud para restablecer la contraseña de tu cuenta en Sistema de Finanzas.</p>
                <p>Si fuiste tú quien lo solicitó, puedes crear una nueva contraseña haciendo clic en el siguiente botón:</p>
                
                <div style="text-align: center;">
                  <a href="${resetUrl}" class="button" style="color: #ffffff;">🔑 Restablecer mi Contraseña</a>
                </div>
                
                <p style="margin-top: 25px; font-size: 14px; color: #6b7280;">Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
                <div class="link-box">
                  <a href="${resetUrl}" style="color: #dc2626; text-decoration: none;">${resetUrl}</a>
                </div>
                
                <div class="warning">
                  <strong>⚠️ Importante:</strong> Este enlace expirará en <strong>1 hora</strong> por seguridad.
                </div>
                
                <div class="security-tip">
                  <strong>🛡️ Consejo de seguridad:</strong><br>
                  Asegúrate de crear una contraseña fuerte con al menos 8 caracteres.
                </div>
                
                <div class="footer">
                  <p><strong>¿No solicitaste este cambio?</strong></p>
                  <p>Si no pediste restablecer tu contraseña, simplemente ignora este correo. Tu contraseña actual permanecerá segura y sin cambios.</p>
                  <p style="margin-top: 20px;">Saludos,<br><strong>José - Desarrollador de Sistema de Finanzas</strong></p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
          🔐 Recuperación de Contraseña
          
          Hola 👋
          
          Recibí tu solicitud para restablecer la contraseña de tu cuenta en Sistema de Finanzas.
          
          Si fuiste tú quien lo solicitó, puedes crear una nueva contraseña visitando este enlace:
          ${resetUrl}
          
          ⚠️ Importante: Este enlace expirará en 1 hora por seguridad.
          
          🛡️ Consejo de seguridad:
          Asegúrate de crear una contraseña fuerte con al menos 8 caracteres.
          
          ¿No solicitaste este cambio?
          Si no pediste restablecer tu contraseña, simplemente ignora este correo. Tu contraseña actual permanecerá segura.
          
          Saludos,
          José - Desarrollador de Sistema de Finanzas
        `,
      });

      logger.info(`Email de recuperación de contraseña enviado a: ${email}`);
    } catch (error) {
      logger.error(`Error al enviar email de recuperación a ${email}: ${error}`);
      throw new Error('Error al enviar email de recuperación');
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      logger.info('Conexión con servidor de email verificada exitosamente');
      return true;
    } catch (error) {
      logger.error(`Error al verificar conexión con servidor de email: ${error}`);
      return false;
    }
  }
}

export const emailService = new EmailService();
