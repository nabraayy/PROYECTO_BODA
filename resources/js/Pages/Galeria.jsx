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

    // Estados para el modal informativo de descarga nativa en móviles
    const [mostrarAvisoDescarga, setMostrarAvisoDescarga] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    // Lista unificada apuntando directamente a las URLs públicas de tu Cloudflare R2
    const images = [
        "https://pub-2acd89dc7df341a8a8c57566409eef40.r2.dev/galeria/imagenes/img_699cd074c2aee.jpg",
        "https://pub-2acd89dc7df341a8a8c57566409eef40.r2.dev/galeria/imagenes/img_699cd083c424f.jpg",
        "https://pub-2acd89dc7df341a8a8c57566409eef40.r2.dev/galeria/imagenes/img_699cd08bb5c26.jpg",
        "https://pub-2acd89dc7df341a8a8c57566409eef40.r2.dev/galeria/imagenes/img_699cd09ab560f.jpg",
        "https://pub-2acd89dc7df341a8a8c57566409eef40.r2.dev/galeria/imagenes/img_699cd0aa38868.jpg",
        "https://pub-2acd89dc7df341a8a8c57566409eef40.r2.dev/galeria/imagenes/img_699cd0b4a12a6.jpg",
        "https://pub-2acd89dc7df341a8a8c57566409eef40.r2.dev/galeria/imagenes/img_699cd0bd2bd1a.jpg",
        "https://pub-2acd89dc7df341a8a8c57566409eef40.r2.dev/galeria/imagenes/img_699cd0c95df08.jpg",
        "https://pub-2acd89dc7df341a8a8c57566409eef40.r2.dev/galeria/imagenes/img_699cd0d543d07.jpg",
        "https://pub-2acd89dc7df341a8a8c57566409eef40.r2.dev/galeria/imagenes/img_699cd0e060e14.jpg",
        "https://pub-2acd89dc7df341a8a8c57566409eef40.r2.dev/galeria/imagenes/img_699cd0e9aab3c.jpg",
        "https://pub-2acd89dc7df341a8a8c57566409eef40.r2.dev/galeria/imagenes/img_699cd0f46c242.jpg",
        "https://pub-2acd89dc7df341a8a8c57566409eef40.r2.dev/galeria/imagenes/img_699cd102577e1.jpg",
        "https://pub-2acd89dc7df341a8a8c57566409eef40.r2.dev/galeria/imagenes/img_699cd10d1a962.jpg",
        "https://pub-2acd89dc7df341a8a8c57566409eef40.r2.dev/galeria/imagenes/img_699cd11cd0f48.jpg",
        "https://pub-2acd89dc7df341a8a8c57566409eef40.r2.dev/galeria/imagenes/img_69f2391f38f78.jpg",
        "https://pub-2acd89dc7df341a8a8c57566409eef40.r2.dev/galeria/imagenes/img_69f23946a6fa4.jpg"
    ];

    const isAdmin = auth?.user?.role === 'admin';
    const OPEN_DATE = new Date('2026-07-11T00:00:00');
    const [timeLeft, setTimeLeft] = useState(null);

    const estaAbiertaParaPruebas = false;

    // Detectar el sistema operativo del dispositivo en la carga inicial
    useEffect(() => {
        const checkDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                          (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        setIsIOS(checkDevice);
    }, []);

    useEffect(() => {
        setGaleria(initialGaleria);
    }, [initialGaleria]);

    // Timer para la cuenta atrás (visible estrictamente para usuarios normales)
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

    // Función lógica para gestionar el borrado desde React
    const handleEliminar = (id, e) => {
        e.stopPropagation(); 
        if (confirm('¿Estás seguro de que quieres eliminar este recuerdo para siempre?')) {
            router.delete(route('galeria.destroy', id), {
                onSuccess: () => {
                    setModalItem(null); 
                }
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#dce6d4]">
            <NavBar />

            <style>{`
                .gallery-grid { column-count: 4; column-gap: 1.2rem; padding: 2rem; max-width: 1600px; margin: 0 auto; }
                .gallery-item { break-inside: avoid; margin-bottom: 1.2rem; width: 100%; display: block; cursor: pointer; position: relative; }
                .gallery-item img, .gallery-item video { width: 100% !important; height: auto !important; display: block; object-fit: contain; border-radius: 8px; }
                @media (max-width: 1200px) { .gallery-grid { column-count: 3; } }
                @media (max-width: 768px) { .gallery-grid { column-count: 2; padding: 1rem; } }
                @media (max-width: 480px) { .gallery-grid { column-count: 1; padding: 0.8rem; } }
            `}</style>

            <section className="pt-32 pb-12 text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <span className="block mb-6 text-sm tracking-[0.3em] uppercase text-[#7a8a70]">Galeria</span>
                    <h1 className="font-serif text-[2.8rem] md:text-[3.5rem] font-light text-[#556b4e] leading-tight">
                        {isAdmin ? 'Panel de Gestión' : 'Galería de recuerdos'}
                    </h1>
                </div>
            </section>

            {/* CUENTA ATRÁS: Visible de forma exclusiva para los usuarios normales */}
            {(!isAdmin) && (
                <section className="pb-16 px-6 text-center">
                    <div className="max-w-2xl mx-auto bg-white/40 backdrop-blur-sm p-10 rounded-2xl border border-[#9aaa8a]/30 shadow-sm">
                        <h2 className="font-serif text-3xl text-[#556b4e] mb-4">Estamos preparing algo especial</h2>
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

            {/* FORMULARIO DE SUBIDA: Protegido estrictamente solo para el administrador */}
            {isAdmin && (
                <section className="pb-16 px-6">
                    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-xl font-light text-[#556b4e] mb-6 text-center">
                            Subir nueva foto (Admin)
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

            <section className="pb-24">
                <div className="gallery-grid">
                    {/* 1. Elementos reales de la base de datos (OCULTOS PARA EL USUARIO, VISIBLES SOLO PARA EL ADMIN) */}
                    {isAdmin && galeria.map((item) => (
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

                            {/* BOTÓN ELIMINAR FLOTANTE: Exclusivo del Administrador */}
                            <button 
                                onClick={(e) => handleEliminar(item.id, e)}
                                className="absolute top-2 right-2 bg-red-600/95 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition-colors z-10 text-xs"
                                title="Eliminar recuerdo"
                            >
                                🗑️
                            </button>
                        </div>
                    ))}

                    {/* 2. Elementos estáticos de muestra en Cloudflare (VISIBLES PARA TODOS: Usuarios y Admin) */}
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

                        {modalItem.titulo && (
                            <p className="text-white mt-4 font-serif text-xl italic">"{modalItem.titulo}"</p>
                        )}

                        <div className="mt-6 flex flex-wrap justify-center gap-4 w-full">
                            {modalItem.id ? (
                                <>
                                    <a
                                        href={route('galeria.download', modalItem.id)}
                                        onClick={() => setMostrarAvisoDescarga(true)}
                                        className="bg-[#6f8352] text-white px-8 py-3 rounded-full hover:bg-[#5a6b43] transition-colors flex items-center gap-2 shadow-lg font-medium text-sm"
                                    >
                                        <span>📥</span> Descargar original
                                    </a>

                                    {/* BOTÓN ELIMINAR INTERNO: Exclusivo del Administrador */}
                                    {isAdmin && (
                                        <button 
                                            onClick={(e) => handleEliminar(modalItem.id, e)}
                                            className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg font-medium text-sm"
                                        >
                                            <span>🗑️</span> Eliminar Recuerdo
                                        </button>
                                    )}
                                </>
                            ) : (
                                <a
                                    href={modalItem.url}
                                    download={`muestra-${modalItem.url.split('/').pop()}`}
                                    onClick={() => setMostrarAvisoDescarga(true)}
                                    className="bg-[#6f8352] text-white px-8 py-3 rounded-full hover:bg-[#5a6b43] transition-colors flex items-center gap-2 shadow-lg font-medium text-sm"
                                >
                                    <span>📥</span> Descargar muestra
                                </a>
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

            {/* MODAL INTELIGENTE DE AVISO DE UBICACIÓN DE DESCARGA EN MÓVILES */}
            {mostrarAvisoDescarga && (
                <div className="fixed inset-0 z-[10000] bg-black/75 flex items-center justify-center p-6" onClick={() => setMostrarAvisoDescarga(false)}>
                    <div className="bg-white max-w-sm w-full p-6 rounded-2xl shadow-xl border border-[#9aaa8a]/20 text-center" onClick={e => e.stopPropagation()}>
                        <span className="text-3xl">🎉</span>
                        <h3 className="font-serif text-xl text-[#556b4e] mt-3 mb-2 font-semibold">
                            Descarga iniciada
                        </h3>
                        
                        <div className="text-sm text-gray-600 my-4 text-left bg-[#f4f7f2] p-4 rounded-xl border border-[#dce6d4]">
                            {isIOS ? (
                                <>
                                    <p className="font-semibold text-[#556b4e] mb-1 text-xs">📲 Instrucciones para guardarlo en el carrete (iPhone):</p>
                                    <ul className="list-disc pl-4 space-y-1.5 text-xs text-gray-700">
                                        <li>El archivo se ha guardado en tu aplicación nativa <strong>"Archivos"</strong> (carpeta Descargas).</li>
                                        <li>Abre la app "Archivos", selecciona la foto o vídeo.</li>
                                        <li>Pulsa el botón <strong>Compartir (flecha hacia arriba ⬆️)</strong> en la esquina inferior y elige <strong>"Guardar imagen"</strong> o <strong>"Guardar vídeo"</strong>.</li>
                                    </ul>
                                </>
                            ) : (
                                <>
                                    <p className="font-semibold text-[#556b4e] mb-1 text-xs">📲 Dónde está tu archivo (Android):</p>
                                    <ul className="list-disc pl-4 space-y-1.5 text-xs text-gray-700">
                                        <li>Tu navegador ha guardado el archivo en la carpeta interna de <strong>"Descargas"</strong>.</li>
                                        <li>Aparecerá directamente en tu aplicación de <strong>Galería</strong> o <strong>Google Fotos</strong> dentro de unos segundos en el álbum "Downloads".</li>
                                    </ul>
                                </>
                            )}
                        </div>

                        <button
                            onClick={() => setMostrarAvisoDescarga(false)}
                            className="w-full bg-[#6f8352] text-white py-2.5 rounded-xl font-medium hover:bg-[#5a6b43] transition-colors text-sm shadow-sm"
                        >
                            ¡Entendido!
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}