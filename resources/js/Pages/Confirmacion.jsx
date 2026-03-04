import { Head, useForm } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import NavBar from '@/Components/NavBar';
import Footer from '@/Components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Confirmacion({ yaConfirmadoServer }) {
    // Sincronización inmediata con el servidor
    const [yaHaConfirmado, setYaHaConfirmado] = useState(yaConfirmadoServer);

    useEffect(() => {
        setYaHaConfirmado(yaConfirmadoServer);
    }, [yaConfirmadoServer]);

    const { data, setData, post, processing, reset } = useForm({
        nombre: '',
        asistentes: 1,
        nombres_asistentes: '',
        asistencia: '',
        intolerancias: '',
        mensaje: '',
    });

    const submit = (e) => {
        e.preventDefault(); 
        post('/confirmar-asistencia', {
            preserveScroll: true,
            onSuccess: () => {
                // Al tener éxito, el servidor refresca la prop y el formulario se oculta
                toast.success('¡Confirmación enviada con éxito!');
            }
        });
    };

    return (
        <>
            <Head title="Confirmar asistencia" />
            <NavBar />

            <section className="bg-[#dce6d4] pt-32 pb-24 px-6 text-center">
                <h1 className="font-serif text-[2.8rem] text-[#556b4e]">Confirmación de asistencia</h1>
            </section>

            <section className="py-20 px-6 bg-gray-50/50">
                <div className="max-w-xl mx-auto">
                    
                    {yaHaConfirmado ? (
                        /* ESTO ES LO QUE VERÁ SI YA ENVIÓ */
                        <div className="bg-white shadow-md rounded-xl p-12 text-center border-t-4 border-[#6f7f60] animate-in zoom-in duration-500">
                            <h2 className="font-serif text-3xl text-[#556b4e] mb-4">¡Asistencia confirmada!</h2>
                            <p className="text-gray-600 mb-10">Ya hemos recibido vuestra respuesta correctamente.</p>
                            <div className="bg-[#f5f7f3] p-6 rounded-lg border border-[#dce6d4]">
                                <p className="text-[#556b4e] font-bold">Lucia: 608 41 90 71</p>
                                <p className="text-[#556b4e] font-bold">Roman: 602 24 65 35</p>
                            </div>
                        </div>
                    ) : (
                        /* ESTO ES LO QUE VERÁ SI NO HA ENVIADO */
                        <form onSubmit={submit} className="bg-white shadow-sm rounded-lg p-10 border border-gray-100">
                            <div className="mb-6">
                                <label className="block mb-2 font-medium text-[#556b4e]">Tu nombre completo</label>
                                <input
                                    type="text"
                                    value={data.nombre}
                                    onChange={e => setData('nombre', e.target.value)}
                                    className="w-full border border-gray-200 rounded-md px-4 py-3"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block mb-2 font-medium text-[#556b4e]">¿Asistirás?</label>
                                <select
                                    value={data.asistencia}
                                    onChange={e => setData('asistencia', e.target.value)}
                                    className="w-full border border-gray-200 rounded-md px-4 py-3"
                                    required
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="si">Sí, allí estaré</option>
                                    <option value="no">No podré asistir</option>
                                </select>
                            </div>

                            {/* ... campos adicionales (asistentes, intolerancias, etc.) ... */}

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#6f7f60] text-white py-4 rounded-md font-medium hover:bg-[#5f6f52] transition-all disabled:bg-gray-300"
                            >
                                {processing ? 'Enviando...' : 'Confirmar ahora'}
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