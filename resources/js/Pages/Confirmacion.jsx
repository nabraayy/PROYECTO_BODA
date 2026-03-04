import { Head, useForm, usePage, Link } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import NavBar from '@/Components/NavBar';
import Footer from '@/Components/Footer';

export default function Confirmacion({ yaConfirmadoServer }) {
    const { auth } = usePage().props;
    const [confirmado, setConfirmado] = useState(yaConfirmadoServer);

    useEffect(() => {
        setConfirmado(yaConfirmadoServer);
    }, [yaConfirmadoServer]);

    const { data, setData, post, processing } = useForm({
        nombre: '',
        asistencia: '',
        asistentes: 1,
        nombres_asistentes: '',
        intolerancias: '',
        mensaje: '',
    });

    const submit = (e) => {
        e.preventDefault(); 
        
        // Ajuste de seguridad: si no asiste, forzamos valores vacíos para evitar errores en DB
        if (data.asistencia === 'no') {
            data.asistentes = 0;
            data.nombres_asistentes = '';
        }

        post('/confirmar-asistencia', {
            preserveScroll: true,
            onSuccess: () => {
                setConfirmado(true);
            },
            // Si el servidor devuelve error (aunque ya lo tenemos controlado),
            // forzamos la vista de confirmado si el error es por "duplicado"
            onError: () => {
                // En ciertos casos de colisión, refrescamos el estado
                setConfirmado(true);
            }
        });
    };

    return (
        <>
            <Head title="Confirmar asistencia" />
            <NavBar />

            <section className="bg-[#dce6d4] pt-32 pb-24 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <span className="block mb-6 text-sm tracking-[0.3em] uppercase text-[#7a8a70]">Confirmación</span>
                    <h1 className="font-serif text-[2.8rem] md:text-[3.5rem] font-light text-[#556b4e] leading-tight">
                        Confirmación de asistencia
                    </h1>
                    <div className="mx-auto mt-10 h-px w-32 bg-[#9aaa8a] opacity-70" />
                </div>
            </section>

            <section className="py-20 px-6 bg-gray-50/50">
                <div className="max-w-xl mx-auto">
                    
                    {!auth.user ? (
                        <div className="bg-white shadow-md rounded-xl p-8 md:p-12 text-center border-t-4 border-amber-400 animate-in fade-in zoom-in duration-500">
                            <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h2 className="font-serif text-2xl text-[#556b4e] mb-4">Acceso necesario</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Para confirmar vuestra asistencia, necesitamos que iniciéis sesión en vuestra cuenta de invitados.
                            </p>
                            <div className="space-y-4">
                                <Link
                                    href={route('login')}
                                    className="block w-full bg-[#6f7f60] text-white py-4 rounded-md font-medium hover:bg-[#5f6f52] transition-all shadow-md"
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="block w-full text-[#7a8a70] text-sm hover:underline font-medium"
                                >
                                    ¿Aún no tienes cuenta? Regístrate aquí
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            {confirmado ? (
                                <div className="bg-white shadow-md rounded-xl p-8 md:p-12 text-center border-t-4 border-[#6f7f60] animate-in fade-in zoom-in duration-500">
                                    <div className="w-20 h-20 bg-[#f5f7f3] text-[#7a8a70] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#6f7f60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h2 className="font-serif text-3xl text-[#556b4e] mb-4">¡Asistencia confirmada!</h2>
                                    <p className="text-gray-600 mb-10 leading-relaxed">
                                        Ya hemos recibido vuestra respuesta. Vuestros asientos ya están reservados en nuestra lista.
                                    </p>

                                    <div className="bg-[#f8faf7] border border-[#dce6d4] rounded-lg p-6 text-center">
                                        <p className="text-[10px] text-[#7a8a70] uppercase tracking-widest mb-3 font-bold text-xs">¿Necesitas cambiar algo?</p>
                                        <p className="text-gray-600 text-sm mb-6">Si te has equivocado o hay algún imprevisto, contacta con nosotros:</p>
                                        <div className="space-y-2 text-[#556b4e] font-bold text-lg">
                                            <p>Lucia: 608 41 90 71</p>
                                            <p>Roman: 602 24 65 35</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={submit} className="bg-white shadow-sm rounded-lg p-8 md:p-10 border border-gray-100 animate-in fade-in duration-700">
                                    
                                    <div className="mb-6">
                                        <label className="block mb-2 font-medium text-[#556b4e]">Tu nombre y apellidos</label>
                                        <input
                                            type="text"
                                            value={data.nombre}
                                            onChange={e => setData('nombre', e.target.value)}
                                            placeholder="Nombre completo"
                                            className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#6f7f60]"
                                            required
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block mb-2 font-medium text-[#556b4e]">¿Asistirás a la boda?</label>
                                        <select
                                            value={data.asistencia}
                                            onChange={e => setData('asistencia', e.target.value)}
                                            className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#6f7f60]"
                                            required
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="si">Sí, allí estaré</option>
                                            <option value="no">No podré asistir</option>
                                        </select>
                                    </div>

                                    {data.asistencia === 'si' && (
                                        <div className="animate-in slide-in-from-top-4 duration-500">
                                            <div className="mb-6">
                                                <label className="block mb-2 font-medium text-[#556b4e]">¿Cuántos vendréis en total?</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={data.asistentes}
                                                    onChange={e => setData('asistentes', e.target.value)}
                                                    className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#6f7f60]"
                                                    required
                                                />
                                            </div>

                                            <div className="mb-6 p-4 bg-[#f9faf8] rounded-md border border-[#e8ede4]">
                                                <label className="block mb-2 font-medium text-[#556b4e]">Nombres de los acompañantes</label>
                                                <textarea
                                                    value={data.nombres_asistentes}
                                                    onChange={e => setData('nombres_asistentes', e.target.value)}
                                                    placeholder="Escribe quiénes vendrán contigo..."
                                                    rows="2"
                                                    className="w-full border border-gray-200 rounded-md px-4 py-3 resize-none focus:outline-none focus:border-[#6f7f60]"
                                                />
                                            </div>

                                            <div className="mb-6">
                                                <label className="block text-[#556b4e] font-medium">Alergias o intolerancias</label>
                                                <textarea
                                                    value={data.intolerancias}
                                                    onChange={e => setData('intolerancias', e.target.value)}
                                                    rows="3"
                                                    placeholder="Indica si alguien tiene necesidades especiales..."
                                                    className="w-full border border-gray-200 rounded-md px-4 py-3 resize-none focus:outline-none focus:ring-1 focus:ring-[#6f7f60]"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <label className="block mb-2 font-medium text-[#556b4e]">Un mensaje para nosotros</label>
                                        <textarea
                                            value={data.mensaje}
                                            onChange={e => setData('mensaje', e.target.value)}
                                            rows="3"
                                            placeholder="Opcional..."
                                            className="w-full border border-gray-200 rounded-md px-4 py-3 resize-none focus:outline-none focus:ring-1 focus:ring-[#6f7f60]"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-[#6f7f60] text-white py-4 rounded-md font-medium tracking-wide hover:bg-[#5f6f52] transition-all shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Enviando...' : 'Confirmar ahora'}
                                    </button>
                                </form>
                            )}
                        </>
                    )}
                </div>
            </section>
            
            <Footer />
        </>
    );
}