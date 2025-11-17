import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>
        
        <p className="text-sm text-gray-600 mb-8">
          Última actualización: 17 de noviembre de 2025
        </p>

        <div className="space-y-8 text-gray-700">
          {/* Introducción */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introducción</h2>
            <p className="leading-relaxed">
              En Finanzas, desarrollado por José Núñez, me tomo muy en serio la privacidad de los 
              usuarios. Esta Política de Privacidad describe cómo recopilo, utilizo y protejo tu 
              información personal cuando utilizas la aplicación.
            </p>
          </section>

          {/* Sección 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Información que Recopilamos</h2>
            <p className="leading-relaxed mb-3">Recopilamos la siguiente información cuando te registras y utilizas la Aplicación:</p>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">1.1 Información de Cuenta</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Contraseña (almacenada de forma encriptada)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">1.2 Información Financiera Personal</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Registros de ingresos y gastos que tú crees</li>
              <li>Nombres de billeteras virtuales (ficticias) que tú crees</li>
              <li>Categorías y presupuestos personalizados</li>
              <li>Notas y descripciones de transacciones</li>
            </ul>

            <p className="leading-relaxed mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <strong>Importante:</strong> NUNCA solicitamos ni almacenamos información de cuentas bancarias reales, 
              números de tarjetas de crédito/débito, PINs, contraseñas bancarias, o cualquier otro dato sensible 
              que te permita realizar transacciones financieras reales.
            </p>
          </section>

          {/* Sección 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Cómo Utilizo tu Información</h2>
            <p className="leading-relaxed mb-3">Utilizo tu información exclusivamente para:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Crear y gestionar tu cuenta de usuario</li>
              <li>Proporcionar las funcionalidades de la aplicación (registro de transacciones, reportes, etc.)</li>
              <li>Generar estadísticas y gráficos personalizados de TUS propios datos</li>
              <li>Mejorar la experiencia del usuario y funcionalidades de la aplicación</li>
              <li>Comunicarme contigo sobre actualizaciones o cambios importantes (solo si es necesario)</li>
            </ul>
          </section>

          {/* Sección 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Compartir Información con Terceros</h2>
            <p className="leading-relaxed font-semibold text-lg text-blue-900 bg-blue-50 p-4 rounded-lg">
              NUNCA comparto, vendo, alquilo o transfiero tu información personal o financiera 
              a terceros. Punto.
            </p>
            <p className="leading-relaxed mt-3">
              Tus datos son exclusivamente tuyos y solo tú tienes acceso a ellos dentro de tu cuenta. 
              No utilizo servicios de análisis de terceros, publicidad, ni ningún otro servicio que 
              requiera compartir tu información.
            </p>
          </section>

          {/* Sección 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Seguridad de los Datos</h2>
            <p className="leading-relaxed mb-3">Implemento medidas de seguridad para proteger tu información:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Las contraseñas se almacenan utilizando algoritmos de encriptación seguros (hash)</li>
              <li>La comunicación entre tu navegador y el servidor estará protegida (cuando se implemente en producción)</li>
              <li>Acceso limitado a la base de datos</li>
              <li>Validación y sanitización de datos de entrada</li>
            </ul>
            <p className="leading-relaxed mt-3">
              Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro. 
              Aunque me esfuerzo por proteger tu información, no puedo garantizar su seguridad absoluta.
            </p>
          </section>

          {/* Sección 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Almacenamiento de Datos</h2>
            <p className="leading-relaxed">
              Actualmente, esta es una aplicación en desarrollo local. Cuando se implemente en producción, 
              los datos se almacenarán en servidores seguros. La ubicación específica del servidor se 
              actualizará en esta política cuando esté disponible.
            </p>
          </section>

          {/* Sección 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Tus Derechos</h2>
            <p className="leading-relaxed mb-3">Tienes derecho a:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Acceder:</strong> Ver toda la información que tenemos sobre ti</li>
              <li><strong>Rectificar:</strong> Corregir información inexacta o incompleta</li>
              <li><strong>Eliminar:</strong> Solicitar la eliminación de tu cuenta y todos tus datos</li>
              <li><strong>Exportar:</strong> Obtener una copia de tus datos en formato legible</li>
              <li><strong>Portabilidad:</strong> Transferir tus datos a otro servicio (cuando esté disponible)</li>
            </ul>
            <p className="leading-relaxed mt-3">
              Para ejercer cualquiera de estos derechos, contáctame en: josenunezm2001@gmail.com
            </p>
          </section>

          {/* Sección 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Retención de Datos</h2>
            <p className="leading-relaxed">
              Mantengo tu información mientras tu cuenta esté activa. Si eliminas tu cuenta, 
              todos tus datos serán permanentemente eliminados del sistema en un plazo 
              máximo de 30 días.
            </p>
          </section>

          {/* Sección 8 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies y Tecnologías de Seguimiento</h2>
            <p className="leading-relaxed">
              Actualmente, la aplicación utiliza cookies de sesión únicamente para mantener tu sesión 
              iniciada. No utilizamos cookies de seguimiento, análisis o publicidad de terceros.
            </p>
          </section>

          {/* Sección 9 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Menores de Edad</h2>
            <p className="leading-relaxed">
              La aplicación no está dirigida a menores de 13 años. No recopilo intencionalmente 
              información de menores de 13 años. Si descubro que he recopilado información de 
              un menor, la eliminaré inmediatamente.
            </p>
          </section>

          {/* Sección 10 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Cambios a esta Política</h2>
            <p className="leading-relaxed">
              Puedo actualizar esta Política de Privacidad ocasionalmente. Te notificaré de cualquier 
              cambio significativo publicando la nueva política en esta página y actualizando la fecha de 
              "última actualización". Te recomiendo revisar esta política periódicamente.
            </p>
          </section>

          {/* Sección 11 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Proyecto Educativo</h2>
            <p className="leading-relaxed">
              Esta aplicación es un proyecto educativo y de portafolio personal. Es completamente gratuita 
              y no tiene fines comerciales. No hay modelo de negocio basado en tus datos porque simplemente 
              no monetizo tu información de ninguna manera.
            </p>
          </section>

          {/* Sección 12 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contacto</h2>
            <p className="leading-relaxed">
              Si tienes preguntas, inquietudes o solicitudes sobre esta Política de Privacidad o sobre 
              cómo manejo tu información, puedes contactarme:
            </p>
            <div className="mt-3 bg-gray-50 p-4 rounded-lg">
              <p><strong>Desarrollador:</strong> José Núñez</p>
              <p><strong>Email:</strong> josenunezm2001@gmail.com</p>
              <p><strong>GitHub:</strong> <a href="https://github.com/Ignxciop/finanzas" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">github.com/Ignxciop/finanzas</a></p>
            </div>
          </section>
        </div>

        {/* Botón volver */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
          >
            ← Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
