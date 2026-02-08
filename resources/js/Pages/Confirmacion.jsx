import { Head, useForm } from '@inertiajs/react';
import NavBar from '@/Components/NavBar';
import Footer from '@/Components/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function Confirmacion() {
    const { data, setData, post, processing, reset } = useForm({
        nombre: '',
        asistentes: '',
        asistencia: '',
        intolerancias: '',
        mensaje: '',
    });
    

    const submit = (e) => {
        e.preventDefault(); 
        post('/confirmar-asistencia', {
            onSuccess: () => {
                reset(); // Restablecer los campos del formulario
                toast.success('Confirmación enviada exitosamente'); // Mostrar el popup de confirmación
            },
            onError: () => {
                toast.error('Hubo un error al enviar la confirmación'); // Mostrar un mensaje de error si algo falla
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
                    <form
                        onSubmit={submit}
                        className="bg-white shadow-sm rounded-lg p-8"
                    >
                        <div className="mb-6">
                            <label className="block mb-2 text-[#556b4e]">
                                Nombre y apellidos
                            </label>
                            <input
                                type="text"
                                value={data.nombre}
                                onChange={e => setData('nombre', e.target.value)}
                                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#6f7f60]"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 text-[#556b4e]">
                                ¿Asistirás a la boda?
                            </label>
                            <select
                                value={data.asistencia}
                                onChange={e => {
                                    setData('asistencia', e.target.value);
                                    if (e.target.value === 'no') {
                                        setData({
                                            ...data,
                                            asistencia: 'no',
                                            asistentes: '',
                                            intolerancias: '',
                                        });
                                    }
                                }}
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
                                    <label className="block mb-2 text-[#556b4e]">
                                        Número de asistentes
                                    </label>
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
                                    <label className="block mb-2 text-[#556b4e]">
                                        ¿Tienes alguna intolerancia o restricción alimentaria?
                                    </label>
                                    <textarea
                                        value={data.intolerancias}
                                        onChange={e => setData('intolerancias', e.target.value)}
                                        rows="3"
                                        placeholder="Ej.: sin gluten, vegetariano, alergia a frutos secos…"
                                        className="w-full border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:border-[#6f7f60]"
                                    />
                                    <p className="mt-2 text-sm text-gray-500">
                                        Si vienes acompañado, indícanos también las necesidades de cada persona.
                                    </p>
                                </div>
                            </>
                        )}

                        <div className="mb-8">
                            <label className="block mb-2 text-[#556b4e]">
                                ¿Quieres dejarnos un mensaje?
                            </label>
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
                            className="w-full bg-[#6f7f60] text-white py-4 font-light tracking-wide hover:bg-[#5f6f52] transition"
                        >
                            Confirmar asistencia
                        </button>
                    </form>
                </div>
            </section>
            <ToastContainer />
            <Footer />
        </>
    );
}
