import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HelpPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Qué es Finanzas?",
      answer: "Finanzas es una aplicación web gratuita diseñada para ayudarte a gestionar tus finanzas personales. Puedes registrar ingresos y gastos, crear billeteras virtuales, establecer presupuestos y generar reportes detallados de tus movimientos financieros."
    },
    {
      question: "¿Es gratis usar la aplicación?",
      answer: "Sí, completamente gratis. No hay planes de pago, compras dentro de la aplicación, ni anuncios publicitarios. Este es un proyecto educativo y de código abierto."
    },
    {
      question: "¿Necesito conectar mi cuenta bancaria?",
      answer: "No. Esta aplicación NO se conecta con cuentas bancarias reales. Todas las billeteras y transacciones son registros ficticios que tú creas y gestionas manualmente. Es una herramienta de seguimiento, no una conexión directa con tus bancos."
    },
    {
      question: "¿Mis datos están seguros?",
      answer: "Sí. Tu información es privada y nunca se comparte con terceros. Las contraseñas se almacenan encriptadas y solo tú tienes acceso a tus datos financieros. Lee nuestra Política de Privacidad para más detalles."
    },
    {
      question: "¿Cómo creo una cuenta?",
      answer: "Haz clic en el botón 'Registrarse' en la parte superior derecha, completa el formulario con tu nombre, email y contraseña, acepta los términos y condiciones, y listo. Tu cuenta estará lista para usar."
    },
    {
      question: "¿Qué son las billeteras virtuales?",
      answer: "Las billeteras virtuales son contenedores ficticios que puedes crear para organizar tu dinero. Por ejemplo, puedes crear una billetera llamada 'Banco Falabella', otra 'Efectivo', otra 'Ahorros', etc. Tú registras manualmente los movimientos en cada una."
    },
    {
      question: "¿Cómo registro una transacción?",
      answer: "Una vez dentro de tu cuenta, ve a la sección de Transacciones, selecciona la billetera correspondiente, indica si es un ingreso o gasto, agrega el monto, categoría y descripción. La aplicación guardará este registro para tus reportes."
    },
    {
      question: "¿Puedo exportar mis datos?",
      answer: "Sí, tienes derecho a exportar todos tus datos en formato legible. Contacta al desarrollador para solicitar una copia de tu información."
    },
    {
      question: "¿Cómo elimino mi cuenta?",
      answer: "Puedes solicitar la eliminación de tu cuenta contactando al desarrollador. Todos tus datos serán permanentemente eliminados en un plazo máximo de 30 días."
    },
    {
      question: "¿La aplicación funciona en móvil?",
      answer: "Sí, la aplicación está diseñada con un diseño responsivo y funciona en dispositivos móviles, tablets y computadoras de escritorio."
    },
    {
      question: "Olvidé mi contraseña, ¿qué hago?",
      answer: "Actualmente, la funcionalidad de recuperación de contraseña está en desarrollo. Por ahora, contacta al desarrollador para asistencia."
    },
    {
      question: "¿Puedo sugerir nuevas funcionalidades?",
      answer: "¡Por supuesto! Este proyecto está en constante desarrollo. Puedes enviar tus sugerencias a través de la página de Contacto o crear un Issue en el repositorio de GitHub."
    },
    {
      question: "¿Cuántas billeteras puedo crear?",
      answer: "No hay límite en la cantidad de billeteras que puedes crear. Crea todas las que necesites para organizar tus finanzas de la mejor manera."
    },
    {
      question: "¿Puedo cambiar mi información personal?",
      answer: "Sí, desde tu perfil podrás editar tu nombre, email y contraseña cuando la funcionalidad esté completamente implementada."
    },
    {
      question: "¿Qué navegadores son compatibles?",
      answer: "La aplicación funciona en todos los navegadores modernos: Chrome, Firefox, Safari, Edge y Opera. Se recomienda mantener tu navegador actualizado para la mejor experiencia."
    }
  ];

  const guides = [
    {
      title: "Primeros Pasos",
      icon: "🚀",
      steps: [
        "Crea tu cuenta con email y contraseña",
        "Verifica tu información personal",
        "Explora el dashboard principal",
        "Crea tu primera billetera virtual"
      ]
    },
    {
      title: "Gestión de Billeteras",
      icon: "💼",
      steps: [
        "Ve a la sección de Billeteras",
        "Haz clic en 'Nueva Billetera'",
        "Asigna un nombre descriptivo (ej: 'Cuenta Corriente')",
        "Define el saldo inicial",
        "Comienza a registrar transacciones"
      ]
    },
    {
      title: "Registro de Transacciones",
      icon: "💰",
      steps: [
        "Selecciona la billetera correspondiente",
        "Elige tipo: Ingreso o Gasto",
        "Ingresa el monto",
        "Selecciona o crea una categoría",
        "Agrega una descripción opcional",
        "Guarda la transacción"
      ]
    },
    {
      title: "Crear Presupuestos",
      icon: "📊",
      steps: [
        "Ve a la sección de Presupuestos",
        "Crea un nuevo presupuesto",
        "Define el período (mensual, semanal, etc.)",
        "Establece límites por categoría",
        "Monitorea tu progreso en el dashboard"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Centro de Ayuda</h1>
          <p className="text-lg text-gray-600">
            Encuentra respuestas a tus preguntas y aprende a usar Finanzas
          </p>
        </div>

        {/* Búsqueda rápida */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar en ayuda..."
                className="w-full px-6 py-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <svg className="absolute left-4 top-5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Guías Rápidas */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Guías Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{guide.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900">{guide.title}</h3>
                </div>
                <ol className="space-y-2">
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                        {stepIndex + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* Preguntas Frecuentes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Preguntas Frecuentes</h2>
          <div className="bg-white rounded-lg shadow-md">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition duration-200"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 flex-shrink-0 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recursos Adicionales */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recursos Adicionales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/contacto"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 text-left block"
            >
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contacto</h3>
              <p className="text-gray-600 text-sm">
                ¿No encontraste lo que buscabas? Contáctame directamente
              </p>
            </Link>

            <a
              href="https://github.com/Ignxciop/finanzas"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 text-left block"
            >
              <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">GitHub</h3>
              <p className="text-gray-600 text-sm">
                Reporta errores o sugiere mejoras en el repositorio
              </p>
            </a>

            <Link
              to="/privacidad"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 text-left block"
            >
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacidad</h3>
              <p className="text-gray-600 text-sm">
                Lee sobre cómo protejo tu información personal
              </p>
            </Link>
          </div>
        </div>

        {/* Botón volver */}
        <div className="text-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium shadow-md"
          >
            ← Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
