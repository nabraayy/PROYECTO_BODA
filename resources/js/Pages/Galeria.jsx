import React, { useState, useEffect } from 'react';
import NavBar from '@/Components/NavBar';
import Footer from '@/components/Footer';
import { router, usePage } from '@inertiajs/react';

export default function Galeria({ galeria: initialGaleria = [], auth }) {
    const { errors } = usePage().props;
    const [archivo, setArchivo] = useState(null);
    const [preview, setPreview] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [galeria, setGaleria] = useState(initialGaleria);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [modalItem, setModalItem] = useState(null);

    // Imágenes de muestra/estáticas
    const images = [
        "/boda_lucia/Galeria/240822.0002.jpg",
        "/boda_lucia/Galeria/240822.0013.jpg",
        "/boda_lucia/Galeria/240822.0014.jpg",
        "/boda_lucia/Galeria/240822.0053.jpg",
        "/boda_lucia/Galeria/240822.0021.jpg",
        "/boda_lucia/Galeria/240822.0057.jpg",
        "/boda_lucia/Galeria/240822.0108.jpg",
        "/boda_lucia/Galeria/240822.0109.jpg",
        "/boda_lucia/Galeria/240822.0111.jpg",
        "/boda_lucia/Galeria/240822.0146.jpg",
        "/boda_lucia/Galeria/240822.0150.jpg",
        "/boda_lucia/Galeria/240822.0153.jpg",
        "/boda_lucia/Galeria/240822.0158.jpg",
        "/boda_lucia/Galeria/240822.0167.jpg",
        "/boda_lucia/Galeria/240822.0225.jpg",
    ];

    const isAdmin = auth?.user?.role === 'admin';
    const OPEN_DATE = new Date('2026-07-11T00:00:00');
    const [timeLeft, setTimeLeft] = useState(null);

    // Forzar apertura para pruebas en usuarios comunes (Cambiar a false si quieres volver a bloquear temporalmente)
    const estaAbiertaParaPruebas = true;

    useEffect(() => {
        setGaleria(initialGaleria);
    }, [initialGaleria]);

    // Timer para el contador de cuenta atrás
    useEffect(() => {
        if (isAdmin || estaAbiertaParaPruebas) return;

        const timer = setInterval(() => {
            const now = new Date();
            const diff = OPEN_DATE - now;

            if (diff <= 0) {
                clearInterval(timer);
                setTimeLeft(null);
                return;
            }

            setTimeLeft({
                días: Math.floor(diff / (1000 * 60 * 60 * 24)),
                horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutos: Math.floor((diff / (1000 * 60)) % 60),
                segundos: Math.floor((diff / 1000) % 60),
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isAdmin, estaAbiertaParaPruebas]);

    const handleArchivoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'video/mp4', 'video/quicktime'];
        if (!validTypes.includes(file.type)) {
            alert('Formato no permitido.');
            return;
        }
        setArchivo(file);
        setPreview({ url: URL.createObjectURL(file), type: file.type });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!archivo) return;
        setUploading(true);
        router.post(route('galeria.store'), { archivo, titulo, descripcion }, {
            forceFormData: true,
            onProgress: (q) => q.percentage && setProgress(q.percentage),
            onFinish: () => setUploading(false),
            onSuccess: () => { setArchivo(null); setPreview(null); setTitulo(''); setDescripcion(''); },
        });
    };

    return (
        <div className="min-h-screen bg-[#dce6d4]">
            <NavBar />
            
            <style>{`
                .gallery-grid { column-count: 4; column-gap: 1.2rem; padding: 2rem; max-width: 1600px; margin: 0 auto; }
                .gallery-item { break-inside: avoid; margin-bottom: 1.2rem; width: 100%; display: block; cursor: pointer; position: relative; }
                .gallery-item img, .gallery-item video { width: 100% !important; height: auto !important; display: block; object-fit: contain; rounded-radius: 8px; }
                @media (max-width: 1200px) { .gallery-grid { column-count: 3; } }
                @media (max-width: 768px) { .gallery-grid { column-count: 2; padding: 1rem; } }
                @media (max-width: 480px) { .gallery-grid { column-count: 1; padding: 0.8rem; } }
            `}</style>

            {/* Cabecera común */}
            <section className="pt-32 pb-12 text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <span className="block mb-6 text-sm tracking-[0.3em] uppercase text-[#7a8a70]">Galeria</span>
                    <h1 className="font-serif text-[2.8rem] md:text-[3.5rem] font-light text-[#556b4e] leading-tight">
                        {isAdmin ? 'Panel de Gestión' : 'Galería de recuerdos'}
                    </h1>
                </div>
            </section>

            {/* MODO MANTENIMIENTO: Oculto si está activo el modo pruebas o si es admin */}
            {(!estaAbiertaParaPruebas && !isAdmin) && (
                <section className="pb-16 px-6 text-center">
                    <div className="max-w-2xl mx-auto bg-white/40 backdrop-blur-sm p-10 rounded-2xl border border-[#9aaa8a]/30 shadow-sm">
                        <h2 className="font-serif text-3xl text-[#556b4e] mb-4">Estamos preparando algo especial</h2>
                        <p className="text-[#7a8a70] mb-8">La posibilidad de subir nuevos recuerdos estará disponible muy pronto.</p>
                        
                        {timeLeft ? (
                            <div className="flex justify-center gap-4 md:gap-8 text-[#556b4e]">
                                {Object.entries(timeLeft).map(([label, value]) => (
                                    <div key={label} className="flex flex-col">
                                        <span className="text-3xl md:text-5xl font-light">{value.toString().padStart(2, '0')}</span>
                                        <span className="text-[10px] uppercase tracking-widest opacity-70">{label}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="font-serif text-xl italic text-[#556b4e]">¡Es hoy! Actualizando la plataforma...</p>
                        )}
                    </div>
                </section>
            )}

            {/* FORMULARIO DE SUBIDA: Habilitado para todos (Admin y Usuarios) */}
            {(estaAbiertaParaPruebas || isAdmin) && (
                <section className="pb-16 px-6">
                    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-xl font-light text-[#556b4e] mb-6 text-center">
                            {isAdmin ? 'Subir nueva foto (Admin)' : 'Comparte tus fotos de la boda'}
                        </h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input type="file" onChange={handleArchivoChange} required className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#dce6d4] file:text-[#556b4e] hover:file:bg-[#cedbc4]" />
                            <input type="text" placeholder="Título o dedicatoria (opcional)" value={titulo} onChange={e => setTitulo(e.target.value)} className="p-2 border rounded" />
                            <button disabled={uploading} className="bg-[#6f8352] text-white py-2 rounded font-medium hover:bg-[#5a6b43] transition-colors">
                                {uploading ? `Subiendo ${Math.round(progress)}%` : 'Publicar recuerdo'}
                            </button>
                        </form>
                    </div>
                </section>
            )}

            {/* LA GALERÍA UNIFICADA: Visible para todos (Admin e Invitados) */}
            <section className="pb-24">
                <div className="gallery-grid">
                    {/* 1. Renderizar contenido subido en tiempo real desde R2 */}
                    {galeria.map((item) => (
                        <div key={item.id} className="gallery-item group overflow-hidden rounded-lg shadow-sm" onClick={() => setModalItem(item)}>
                            {item.tipo === 'imagen' ? (
                                <img src={item.url} alt={item.titulo ?? ""} loading="lazy" className="hover:scale-102 transition-transform duration-300" />
                            ) : (
                                <div className="relative bg-black rounded-lg overflow-hidden">
                                    <video 
                                        src={item.url} 
                                        muted 
                                        playsInline 
                                        preload="metadata"
                                        className="w-full h-auto"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                                        <span className="text-white text-2xl">▶</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* 2. Renderizar contenido estático de relleno */}
                    {images.map((url, index) => (
                        <div
                            key={`static-${index}`}
                            className="gallery-item overflow-hidden rounded-lg shadow-sm opacity-90 hover:opacity-100"
                            onClick={() => setModalItem({ url, tipo: 'imagen' })}
                        >
                            <img src={url} alt="Muestra" loading="lazy" className="hover:scale-102 transition-transform duration-300" />
                        </div>
                    ))}
                </div>
            </section>

            {/* MODAL DE VISTA PREVIA Y DESCARGA */}
            {modalItem && (
                <div 
                    className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 transition-opacity duration-300" 
                    onClick={() => setModalItem(null)}
                >
                    <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
                        
                        {/* Visualizador de Contenido Adaptado */}
                        {modalItem.tipo === 'video' ? (
                            <video 
                                src={modalItem.url} 
                                controls 
                                autoPlay 
                                playsInline
                                className="max-h-[70vh] w-full rounded-lg shadow-2xl" 
                            />
                        ) : (
                            <img src={modalItem.url} className="max-h-[70vh] object-contain rounded-lg shadow-2xl" alt="" />
                        )}

                        {/* Título */}
                        {modalItem.titulo && (
                            <p className="text-white mt-4 font-serif text-xl italic">"{modalItem.titulo}"</p>
                        )}

                        {/* Botonera inferior */}
                        <div className="mt-6 flex flex-wrap justify-center gap-4 w-full">
                            
                            {/* Descarga inteligente según el origen */}
                            {modalItem.id ? (
                                <a 
                                    href={route('galeria.download', modalItem.id)} 
                                    className="bg-[#6f8352] text-white px-8 py-3 rounded-full hover:bg-[#5a6b43] transition-colors flex items-center gap-2 shadow-lg font-medium text-sm"
                                >
                                    <span>📥</span> Descargar original
                                </a>
                            ) : (
                                <span className="text-white/40 text-sm italic py-3">Foto de muestra fija</span>
                            )}

                            <button 
                                onClick={() => setModalItem(null)} 
                                className="text-white border border-white/20 px-8 py-3 rounded-full hover:bg-white/10 transition-all uppercase tracking-widest text-xs font-semibold"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}