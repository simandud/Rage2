import React, { useState } from 'react';
import { subscribeNewsletter } from '../../utils/contactDatabase';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await subscribeNewsletter(email);
      setMessage({ type: 'success', text: '¡Suscripción exitosa! Gracias por unirte.' });
      setEmail('');
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Error al suscribirse' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="site-footer bg-white py-16 relative z-10">
      {/* Top Section - Logo y Redes */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-16 pb-16 border-b border-gray-200">
        {/* Logo */}
        <div className="mb-8">
          <img src="/assets/logoragevee.png" alt="RAGE VENTURE" className="h-12 mx-auto mb-6" />
        </div>

        {/* Brand Name */}
        <h2 className="text-2xl font-[TurnKey] font-black text-black tracking-widest mb-8">
          RAGE VENTURE
        </h2>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 items-center">
          <a href="#" className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
          </a>
          <a href="#" className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9-5 9-5z"/></svg>
          </a>
          <a href="#" className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 0H1v24h22V0zM15.5 8.5l-2 .25-1.5 4v4.25h-2.5V9.25l1.5-3.75 2.5-.5v.75h2v-1z"/></svg>
          </a>
          <a href="#" className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
          </a>
        </div>
      </div>

      {/* Middle Section - Links en Grid */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* SERVICIOS */}
          <div>
            <h3 className="text-sm font-[TurnKey] font-bold text-black uppercase tracking-widest mb-6 pb-3 border-b-2 border-blue-500">
              Servicios
            </h3>
            <ul className="space-y-3">
              <li><a href="/alquiler" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Alquiler de Recursos</a></li>
              <li><a href="/tienda" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Tienda Online</a></li>
              <li><a href="/eventos" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Próximos Eventos</a></li>
              <li><a href="/clases" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Clases & Bootcamps</a></li>
            </ul>
          </div>

          {/* COMPAÑÍA */}
          <div>
            <h3 className="text-sm font-[TurnKey] font-bold text-black uppercase tracking-widest mb-6 pb-3 border-b-2 border-blue-500">
              Conocenos
            </h3>
            <ul className="space-y-3">
              <li><a href="/#about" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Sobre Nosotros</a></li>
              <li><a href="/#contact" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Contacto</a></li>
              <li><a href="/#news" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Press Kit</a></li>
            </ul>
          </div>

          {/* RECURSOS */}
          <div>
            <h3 className="text-sm font-[TurnKey] font-bold text-black uppercase tracking-widest mb-6 pb-3 border-b-2 border-blue-500">
              Recursos
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Documentación</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Soporte</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500 transition-colors">Comunidad</a></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-sm font-[TurnKey] font-bold text-black uppercase tracking-widest mb-6 pb-3 border-b-2 border-blue-500">
              Newsletter
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Recibe updates exclusivos sobre eventos, releases y oportunidades.
            </p>
            <form className="flex gap-2" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="flex-1 px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-500 text-white text-xs font-bold rounded hover:bg-blue-600 transition-colors uppercase tracking-wide disabled:opacity-50"
              >
                {loading ? '...' : 'Suscribir'}
              </button>
            </form>
            {message && (
              <p className={`mt-2 text-xs ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {message.text}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright y Links Legales */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">
            © 2025 RAGE VENTURE. Todos los derechos reservados.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-700 uppercase font-bold transition-colors">Términos de Servicio</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-700 uppercase font-bold transition-colors">Política de Privacidad</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-700 uppercase font-bold transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
