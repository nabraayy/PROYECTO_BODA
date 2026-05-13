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

    // Lógica de permisos y fechas
    const isAdmin = auth?.user?.role === 'admin';
    const OPEN_DATE = new Date('2026-07-11T00:00:00');
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        setGaleria(initialGaleria);
    }, [initialGaleria]);

    // Timer para el contador
    useEffect(() => {
        if (isAdmin) return;

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
    }, [isAdmin]);

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
                .gallery-item { break-inside: avoid; margin-bottom: 1.2rem; width: 100%; display: block; cursor: pointer; }
                .gallery-item img, .gallery-item video { width: 100% !important; height: auto !important; display: block; object-fit: contain; }
                @media (max-width: 1200px) { .gallery-grid { column-count: 3; } }
                @media (max-width: 768px) { .gallery-grid { column-count: 2; } }
                @media (max-width: 480px) { .gallery-grid { column-count: 1; } }
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

            {/* MODO MANTENIMIENTO: Solo se muestra si NO es Admin */}
            {!isAdmin && (
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

            {/* FORMULARIO: Solo se muestra si es Admin */}
            {isAdmin && (
                <section className="pb-16 px-6">
                    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-xl font-light text-[#556b4e] mb-6 text-center">Subir nueva foto (Admin)</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input type="file" onChange={handleArchivoChange} required className="text-sm" />
                            <input type="text" placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} className="p-2 border" />
                            <button disabled={uploading} className="bg-[#6f8352] text-white py-2">
                                {uploading ? `Subiendo ${Math.round(progress)}%` : 'Publicar'}
                            </button>
                        </form>
                    </div>
                </section>
            )}

            {/* LA GALERÍA: Visible para todos (solo lectura) */}
            {/* LA GALERÍA: solo visible para admin */}
            {isAdmin && (
            <section className="pb-24">
                <div className="gallery-grid">
                    {galeria.map((item) => (
                        <div key={item.id} className="gallery-item" onClick={() => setModalItem(item)}>
                            {item.tipo === 'imagen' ? (
                                <img src={item.url} alt="" loading="lazy" />
                            ) : (
                                <video src={item.url} muted playsInline />
                            )}
                        </div>
                    ))}
                </div>
            </section>
            )}

            <section className="pb-24">
                <div className="gallery-grid">
                    {images.map((url, index) => (
                        <div
                            key={index}
                            className="gallery-item"
                            onClick={() => setModalItem({ url, tipo: 'imagen' })}
                        >
                            <img src={url} alt="" loading="lazy" />
                        </div>
                    ))}
                </div>
            </section>

            {/* MODAL DE VISTA PREVIA */}
            {/* MODAL DE VISTA PREVIA */}
{modalItem && (
    <div 
        className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 transition-opacity duration-300" 
        onClick={() => setModalItem(null)}
    >
        <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
            
            {/* Visualizador de Contenido */}
            {modalItem.tipo === 'video' ? (
                <video src={modalItem.url} controls autoPlay className="max-h-[75vh] rounded-lg shadow-2xl" />
            ) : (
                <img src={modalItem.url} className="max-h-[75vh] object-contain rounded-lg shadow-2xl" alt="" />
            )}

            {/* Título (si existe) */}
            {modalItem.titulo && (
                <p className="text-white mt-4 font-serif text-xl italic">"{modalItem.titulo}"</p>
            )}

            {/* Botonera inferior */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
                
                {/* BOTÓN DESCARGAR: Solo aparece si el item viene de la DB (tiene id) */}
                {modalItem.id ? (
                    <a 
                        href={route('galeria.download', modalItem.id)} 
                        className="bg-[#6f8352] text-white px-8 py-3 rounded-full hover:bg-[#5a6b43] transition-colors flex items-center gap-2 shadow-lg"
                    >
                        <span>📥</span> Descargar original
                    </a>
                ) : (
                    // Mensaje para las fotos que tienes en el array estático "images"
                    <span className="text-white/50 text-sm italic">Vista previa</span>
                )}

                <button 
                    onClick={() => setModalItem(null)} 
                    className="text-white border border-white/20 px-8 py-3 rounded-full hover:bg-white/10 transition-all uppercase tracking-widest text-xs"
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