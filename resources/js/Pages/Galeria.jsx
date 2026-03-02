import React, { useState, useEffect } from 'react';
import NavBar from '@/Components/NavBar';
import Footer from '@/components/Footer';
import { router, usePage } from '@inertiajs/react';

export default function Galeria({ galeria: initialGaleria = [], auth }) {
    const { errors } = usePage().props;

    const isAdmin = auth?.user?.role === 'admin';

    const [archivo, setArchivo] = useState(null);
    const [preview, setPreview] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [galeria, setGaleria] = useState(initialGaleria);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [modalItem, setModalItem] = useState(null);

    useEffect(() => {
        setGaleria(initialGaleria);
    }, [initialGaleria]);

    /* =========================
       CONTADOR APERTURA
    ========================= */
    const OPEN_DATE = new Date('2026-07-11T00:00:00');
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        if (isAdmin) return;

        const timer = setInterval(() => {
            const now = new Date();
            const diff = OPEN_DATE - now;

            if (diff <= 0) {
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isAdmin]);

    /* =========================
       SUBIDA
    ========================= */
    const handleArchivoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = [
            'image/jpeg', 'image/png', 'image/webp',
            'image/heic', 'image/heif',
            'video/mp4', 'video/quicktime'
        ];

        if (!validTypes.includes(file.type)) {
            alert('Formato no permitido');
            return;
        }

        setArchivo(file);
        setPreview({ url: URL.createObjectURL(file), type: file.type });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!archivo) return;

        setUploading(true);

        router.post(
            route('galeria.store'),
            { archivo, titulo, descripcion },
            {
                forceFormData: true,
                preserveScroll: true,
                onProgress: (e) => setProgress(e.percentage ?? 0),
                onFinish: () => setUploading(false),
                onSuccess: () => {
                    setArchivo(null);
                    setPreview(null);
                    setTitulo('');
                    setDescripcion('');
                },
            }
        );
    };

    return (
        <div className="min-h-screen bg-[#dce6d4]">
            <NavBar />

            <section className="pt-32 pb-16 text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <span className="block mb-6 text-sm tracking-[0.3em] uppercase text-[#7a8a70]">
                        Galería
                    </span>
                    <h1 className="font-serif text-[2.8rem] md:text-[3.5rem] font-light text-[#556b4e]">
                        Galería de recuerdos
                    </h1>
                    <div className="mx-auto mt-10 h-px w-32 bg-[#9aaa8a]" />
                </div>
            </section>

            {/* =========================
                MENSAJE USUARIOS
            ========================= */}
            {!isAdmin && (
                <section className="pb-32 px-6 text-center">
                    <div className="max-w-2xl mx-auto bg-white/80 p-10 rounded-xl shadow-md">
                        <h2 className="font-serif text-3xl text-[#556b4e] mb-6">
                            Galería cerrada temporalmente
                        </h2>

                        <p className="text-lg text-gray-700 mb-8">
                            Este apartado se abrirá el <strong>11 de julio</strong>.
                            <br />
                            Muy pronto podréis ver y descargar todos los recuerdos 💚
                        </p>

                        {timeLeft && (
                            <div className="flex justify-center gap-6 text-[#556b4e]">
                                {Object.entries(timeLeft).map(([k, v]) => (
                                    <div key={k}>
                                        <div className="text-3xl font-semibold">{v}</div>
                                        <div className="text-sm uppercase">{k}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* =========================
                ADMIN
            ========================= */}
            {isAdmin && (
                <>
                    {/* FORMULARIO */}
                    <section style={{ backgroundColor: '#f5f7f3', padding: '80px 20px' }}>
                        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
                            <h2 className="text-xl font-light text-[#556b4e] mb-6">
                                Comparte tu recuerdo
                            </h2>

                            {preview && (
                                preview.type.startsWith('video')
                                    ? <video src={preview.url} controls className="w-full mb-6" />
                                    : <img src={preview.url} className="w-full mb-6" />
                            )}

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <input type="file" onChange={handleArchivoChange} required />
                                <input type="text" placeholder="Título" value={titulo}
                                    onChange={e => setTitulo(e.target.value)} />
                                <textarea placeholder="Descripción" value={descripcion}
                                    onChange={e => setDescripcion(e.target.value)} />

                                <button type="submit" disabled={uploading}>
                                    {uploading ? `Subiendo ${Math.round(progress)}%` : 'Subir'}
                                </button>
                            </form>
                        </div>
                    </section>

                    {/* GALERÍA */}
                    <section className="pb-24">
                        <div className="gallery-grid">
                            {galeria.map(item => (
                                <div key={item.id} onClick={() => setModalItem(item)}>
                                    {item.tipo === 'imagen'
                                        ? <img src={item.url} loading="lazy" />
                                        : <video src={item.url} muted />}
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}

            <Footer />
        </div>
    );
}