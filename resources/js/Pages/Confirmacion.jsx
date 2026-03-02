import { Head, useForm } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import NavBar from '@/Components/NavBar';
import Footer from '@/Components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Confirmacion({ yaConfirmadoServer }) {
    // Controlamos si ya se ha confirmado para mostrar el mensaje de éxito o el formulario
    const [yaHaConfirmado, setYaHaConfirmado] = useState(yaConfirmadoServer);

    const { data, setData, post, processing, reset } = useForm({
        nombre: '',
        asistentes: '',
        asistencia: '',
        intolerancias: '',
        mensaje: '',
    });

    // Sincronización con el servidor (por si se actualizan las props de Inertia)
    useEffect(() => {
        setYaHaConfirmado(yaConfirmadoServer);
    }, [yaConfirmadoServer]);

    const submit = (e) => {
        e.preventDefault(); 
        post('/confirmar-asistencia', {
            onSuccess: () => {
                setYaHaConfirmado(true); // Al tener éxito, cambiamos la vista inmediatamente
                reset();
                toast.success('¡Confirmación enviada con éxito!');
            },
            onError: () => {
                toast.error('Hubo un error al enviar la confirmación');
            }
        });
    };

    return (
        <>
            <Head title="Confirmar asistencia" />
            <NavBar />

            {/* Cabecera de la sección */}
            <section className="bg-[#dce6d4] pt-32 pb-24 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <span className="block mb-6 text-sm tracking-[0.3em] uppercase text-[#7a8a70]">
                        Confirmación
                    </span>
                    <h1 className="font-serif text-[2.8rem] md:text-[3.5rem] font-light text-[#556b4e] leading-tight">
                        Confirmación de asistencia
                    </h1>
                    <div className="mx-auto mt-10 h-px w-32 bg-[#9aaa8a] opacity-70" />
                </div>
            </section>

            <section className="py-20 px-6 bg-gray-50/50">
                <div className="max-w-xl mx-auto">
                    
                    {yaHaConfirmado ? (
                        /* VISTA 1: MENSAJE DE YA CONFIRMADO (Se queda fijo tras enviar) */
                        <div className="bg-white shadow-md rounded-xl p-8 md:p-12 text-center border-t-4 border-[#6f7f60] transition-all duration-700">
                            <div className="w-20 h-20 bg-[#f5f7f3] text-[#7a8a70] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#6f7f60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            
                            <h2 className="font-serif text-3xl text-[#556b4e] mb-4">¡Gracias por confirmar!</h2>
                            
                            <p className="text-gray-600 mb-10 leading-relaxed">
                                Tu respuesta ha sido registrada correctamente en nuestra lista de invitados. ¡Estamos deseando compartir este día con vosotros!
                            </p>

                            <div className="bg-[#f5f7f3] p-6 rounded-lg border border-[#dce6d4] text-left">
                                <p className="text-[10px] text-[#7a8a70] uppercase tracking-widest mb-3 font-bold">¿Necesitas cambiar algo?</p>
                                <p className="text-gray-600 text-sm mb-4">
                                    Si necesitas modificar el número de asistentes, alergias o cualquier detalle, contacta con nosotros:
                                </p>
                                <div className="space-y-1">
                                    <p className="text-[#556b4e] font-bold text-lg">Lara: 608 41 90 71</p>
                                    <p className="text-[#556b4e] font-bold text-lg">Rubén: 602 24 65 35</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* VISTA 2: FORMULARIO (Solo se ve si no han confirmado) */
                        <form
                            onSubmit={submit}
                            className="bg-white shadow-sm rounded-lg p-8 md:p-10 border border-gray-100"
                        >
                            <div className="mb-6">
                                <label className="block mb-2 font-medium text-[#556b4e]">Nombre y apellidos</label>
                                <input
                                    type="text"
                                    value={data.nombre}
                                    onChange={e => setData('nombre', e.target.value)}
                                    placeholder="Introduce tu nombre completo"
                                    className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#6f7f60] focus:border-[#6f7f60] transition-all"
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
                                        <label className="block mb-2 font-medium text-[#556b4e]">Número de asistentes</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={data.asistentes}
                                            onChange={e => setData('asistentes', e.target.value)}
                                            className="w-full border border-gray-200 rounded-md px-4 py-3"
                                            required
                                        />
                                    </div>
                                    <div className="mb-8">
                                        <label className="block text-[#556b4e] font-medium">¿Alguna intolerancia o restricción alimentaria?</label>
                                        <span className="block mb-3 text-xs text-gray-400 italic">
                                            Si no tienes ninguna, puedes dejar este campo en blanco.
                                        </span>
                                        <textarea
                                            value={data.intolerancias}
                                            onChange={e => setData('intolerancias', e.target.value)}
                                            rows="3"
                                            placeholder="Ej: Celíaco, alérgico a los frutos secos..."
                                            className="w-full border border-gray-200 rounded-md px-4 py-3 resize-none focus:outline-none focus:ring-1 focus:ring-[#6f7f60]"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="mb-8">
                                <label className="block mb-2 font-medium text-[#556b4e]">¿Quieres dejarnos un mensaje?</label>
                                <textarea
                                    value={data.mensaje}
                                    onChange={e => setData('mensaje', e.target.value)}
                                    rows="4"
                                    placeholder="Opcional: Dedicatoria, canción que no puede faltar..."
                                    className="w-full border border-gray-200 rounded-md px-4 py-3 resize-none focus:outline-none focus:ring-1 focus:ring-[#6f7f60]"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#6f7f60] text-white py-4 rounded-md font-medium tracking-wide hover:bg-[#5f6f52] transition-all shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Enviando confirmación...' : 'Confirmar asistencia'}
                            </button>
                        </form>
                    )}
                </div>
            </section>
            
            <ToastContainer position="bottom-center" />
            <Footer />
        </>
    );
}