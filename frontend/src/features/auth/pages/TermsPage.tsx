import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Términos y Condiciones</h1>
        
        <p className="text-sm text-gray-600 mb-8">
          Última actualización: 17 de noviembre de 2025
        </p>

        <div className="space-y-8 text-gray-700">
          {/* Sección 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Aceptación de los Términos</h2>
            <p className="leading-relaxed">
              Al acceder y utilizar Finanzas ("la Aplicación"), aceptas estar sujeto a estos Términos y Condiciones. 
              Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar la Aplicación.
            </p>
          </section>

          {/* Sección 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Descripción del Servicio</h2>
            <p className="leading-relaxed mb-3">
              Finanzas es una aplicación web gratuita de gestión financiera personal que permite a los usuarios:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Registrar y categorizar ingresos y gastos</li>
              <li>Crear billeteras virtuales para organizar sus finanzas</li>
              <li>Generar reportes y estadísticas de sus movimientos financieros</li>
              <li>Establecer presupuestos personales</li>
            </ul>
            <p className="leading-relaxed mt-3">
              <strong>Importante:</strong> Esta aplicación NO se conecta con cuentas bancarias reales ni procesa 
              transacciones financieras reales. Todas las billeteras y transacciones son registros ficticios 
              creados y gestionados exclusivamente por el usuario.
            </p>
          </section>

          {/* Sección 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Uso del Servicio</h2>
            <p className="leading-relaxed mb-3">Al utilizar la Aplicación, te comprometes a:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Proporcionar información veraz y actualizada durante el registro</li>
              <li>Mantener la confidencialidad de tu contraseña</li>
              <li>No utilizar la Aplicación para fines ilegales o no autorizados</li>
              <li>No intentar acceder a cuentas de otros usuarios</li>
              <li>No introducir código malicioso o intentar vulnerar la seguridad del sistema</li>
            </ul>
          </section>

          {/* Sección 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Privacidad de Datos</h2>
            <p className="leading-relaxed">
              Me comprometo a proteger tu privacidad. Nunca compartiré tu información personal o 
              financiera con terceros. Todos los datos que ingreses son de tu exclusiva propiedad y solo 
              tú tendrás acceso a ellos. Para más información, consulta la Política de Privacidad.
            </p>
          </section>

          {/* Sección 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Servicio Gratuito</h2>
            <p className="leading-relaxed">
              La Aplicación es completamente gratuita. No existen planes de pago, compras dentro de la 
              aplicación, ni anuncios publicitarios. Este es un proyecto educativo y de código abierto.
            </p>
          </section>

          {/* Sección 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitación de Responsabilidad</h2>
            <p className="leading-relaxed mb-3">
              La Aplicación se proporciona "tal cual" sin garantías de ningún tipo. El desarrollador no se 
              hace responsable por:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Pérdida de datos debido a fallos técnicos</li>
              <li>Decisiones financieras tomadas basándose en la información de la Aplicación</li>
              <li>Interrupciones del servicio o tiempo de inactividad</li>
              <li>Errores o inexactitudes en cálculos o reportes</li>
            </ul>
            <p className="leading-relaxed mt-3">
              <strong>Recomendación:</strong> Mantén respaldos de tu información importante y no tomes 
              decisiones financieras importantes basándote únicamente en esta herramienta.
            </p>
          </section>

          {/* Sección 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Propiedad Intelectual</h2>
            <p className="leading-relaxed">
              El código fuente, diseño, y contenido de la Aplicación son propiedad de José Núñez. 
              Este proyecto es de código abierto y está disponible en GitHub bajo licencia MIT.
            </p>
          </section>

          {/* Sección 8 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Modificaciones</h2>
            <p className="leading-relaxed">
              Me reservo el derecho de modificar estos términos en cualquier momento. Los cambios 
              entrarán en vigor inmediatamente después de su publicación en la Aplicación. Es tu 
              responsabilidad revisar periódicamente estos términos.
            </p>
          </section>

          {/* Sección 9 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Terminación</h2>
            <p className="leading-relaxed">
              Puedes dejar de usar la Aplicación en cualquier momento. Me reservo el derecho de 
              suspender o terminar tu acceso si violas estos términos.
            </p>
          </section>

          {/* Sección 10 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contacto</h2>
            <p className="leading-relaxed">
              Si tienes preguntas sobre estos Términos y Condiciones, puedes contactarme a través de:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> josenunezm2001@gmail.com<br />
              <strong>GitHub:</strong> <a href="https://github.com/Ignxciop/finanzas" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">github.com/Ignxciop/finanzas</a>
            </p>
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

export default TermsPage;
