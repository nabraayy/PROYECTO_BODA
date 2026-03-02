import { Head, useForm } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import NavBar from '@/Components/NavBar';
import Footer from '@/Components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Confirmacion({ yaConfirmadoServer }) {
    // El estado inicial viene directamente de lo que dice la base de datos (pasado por el controlador)
    const [yaHaConfirmado, setYaHaConfirmado] = useState(yaConfirmadoServer);

    const { data, setData, post, processing, reset } = useForm({
        nombre: '',
        asistentes: '',
        asistencia: '',
        intolerancias: '',
        mensaje: '',
    });

    // Sincronizamos el estado si las props cambian (importante para Inertia)
    useEffect(() => {
        setYaHaConfirmado(yaConfirmadoServer);
    }, [yaConfirmadoServer]);

    const submit = (e) => {
        e.preventDefault(); 
        post('/confirmar-asistencia', {
            onSuccess: () => {
                setYaHaConfirmado(true);
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

            <section className="py-20 px-6">
                <div className="max-w-xl mx-auto">
                    
                    {yaHaConfirmado ? (
                        /* MENSAJE DE BLOQUEO (Visto por quien ya confirmó) */
                        <div className="bg-white shadow-sm rounded-lg p-10 text-center border-t-4 border-[#6f7f60] animate-in fade-in duration-500">
                            <div className="w-16 h-16 bg-[#f5f7f3] text-[#7a8a70] rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            
                            <h2 className="font-serif text-2xl text-[#556b4e] mb-4">Solicitud ya enviada</h2>
                            
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Ya hemos recibido tu confirmación de asistencia. Tu respuesta está registrada en nuestra lista de invitados.
                            </p>

                            <div className="bg-[#f5f7f3] p-6 rounded-md border border-[#dce6d4]">
                                <p className="text-sm text-[#7a8a70] uppercase tracking-widest mb-3 font-semibold text-center">¿Necesitas realizar algún cambio?</p>
                                <p className="text-gray-600 text-sm mb-4 text-center">
                                    Si necesitas modificar el número de asistentes o tus intolerancias, por favor llámanos o escríbenos directamente:
                                </p>
                                <p className="text-[#556b4e] font-bold text-xl text-center">
                                     608 41 90 71
                                </p>
                                <p className="text-[#556b4e] font-bold text-xl text-center">
                                     602 24 65 35
                                </p>
                            </div>
                        </div>
                    ) : (
                        /* FORMULARIO (Visto por quien NO ha confirmado) */
                        <form
                            onSubmit={submit}
                            className="bg-white shadow-sm rounded-lg p-8 animate-in fade-in duration-500"
                        >
                            <div className="mb-6">
                                <label className="block mb-2 text-[#556b4e]">Nombre y apellidos</label>
                                <input
                                    type="text"
                                    value={data.nombre}
                                    onChange={e => setData('nombre', e.target.value)}
                                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#6f7f60]"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block mb-2 text-[#556b4e]">¿Asistirás a la boda?</label>
                                <select
                                    value={data.asistencia}
                                    onChange={e => setData('asistencia', e.target.value)}
                                    className="w-full border border-gray-300 px-4 py-3"
                                    required
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="si">Sí, allí estaré</option>
                                    <option value="no">No podré asistir</option>
                                </select>
                            </div>

                            {data.asistencia === 'si' && (
                                <>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-[#556b4e]">Número de asistentes</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={data.asistentes}
                                            onChange={e => setData('asistentes', e.target.value)}
                                            className="w-full border border-gray-300 px-4 py-3"
                                            required
                                        />
                                    </div>
                                    <div className="mb-8">
                                        <label className="block mb-2 text-[#556b4e]">¿Alguna intolerancia o restricción alimentaria?</label>
                                       <span className="block mb-3 text-xs text-gray-500 italic">
                                            Si no tienes ninguna, puedes dejar este campo en blanco.
                                        </span>
                                        <textarea
                                            value={data.intolerancias}
                                            onChange={e => setData('intolerancias', e.target.value)}
                                            rows="3"
                                            placeholder="Ej: Celíaco, alérgico a los frutos secos..."
                                            className="w-full border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:border-[#6f7f60]"
                                        />
                                        
                                    </div>
                                </>
                            )}

                            <div className="mb-8">
                                <label className="block mb-2 text-[#556b4e]">¿Quieres dejarnos un mensaje?</label>
                                <textarea
                                    value={data.mensaje}
                                    onChange={e => setData('mensaje', e.target.value)}
                                    rows="4"
                                    className="w-full border border-gray-300 px-4 py-3 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#6f7f60] text-white py-4 font-light tracking-wide hover:bg-[#5f6f52] transition disabled:bg-gray-400"
                            >
                                {processing ? 'Enviando...' : 'Confirmar asistencia'}
                            </button>
                        </form>
                    )}
                </div>
            </section>
            
            <ToastContainer />
            <Footer />
        </>
    );
}