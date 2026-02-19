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
    
    // Estado de la galería sincronizado
    const [galeria, setGaleria] = useState(initialGaleria);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [modalItem, setModalItem] = useState(null);

    // Esto hace que la galería se actualice sola cuando termina la subida
    useEffect(() => {
        setGaleria(initialGaleria);
    }, [initialGaleria]);

    const handleArchivoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = [
            'image/jpeg', 'image/png', 'image/webp', 'image/heic', 
            'image/heif', 'video/mp4', 'video/quicktime'
        ];

        if (!validTypes.includes(file.type)) {
            alert('Formato no permitido. Usa JPG, PNG, WEBP o MP4.');
            e.target.value = '';
            return;
        }

        setArchivo(file);
        setPreview({ url: URL.createObjectURL(file), type: file.type });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!archivo) return;

        setUploading(true);
        setProgress(0);

        router.post(
            route('galeria.store'),
            { archivo, titulo, descripcion },
            {
                forceFormData: true,
                preserveScroll: true, 
                onProgress: (event) => {
                    if (event.percentage) setProgress(event.percentage);
                },
                onFinish: () => {
                    setUploading(false);
                },
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
            
            <style>{`
                .gallery-grid {
                    column-count: 4;
                    column-gap: 1.2rem;
                    padding: 2rem;
                    max-width: 1600px;
                    margin: 0 auto;
                }

                .gallery-item {
                    break-inside: avoid;
                    margin-bottom: 1.2rem;
                    width: 100%;
                    display: block;
                    cursor: pointer;
                    /* Eliminados bordes redondeados y efectos de hover */
                }

                .gallery-item img, 
                .gallery-item video {
                    width: 100% !important;
                    height: auto !important;
                    display: block;
                    object-fit: contain;
                    border-radius: 0; /* Bordes rectos */
                }

                @media (max-width: 1200px) { .gallery-grid { column-count: 3; } }
                @media (max-width: 768px) { .gallery-grid { column-count: 2; } }
                @media (max-width: 480px) { .gallery-grid { column-count: 1; } }
            `}</style>

            <section className="pt-32 pb-16 text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <span className="block mb-6 text-sm tracking-[0.3em] uppercase text-[#7a8a70]">Galeria</span>
                    <h1 className="font-serif text-[2.8rem] md:text-[3.5rem] font-light text-[#556b4e] leading-tight">
                        Galería de recuerdos
                    </h1>
                    <div className="mx-auto mt-10 h-px w-32 bg-[#9aaa8a] opacity-70" />
                </div>
            </section>

            {auth?.user && (
                <section style={{ backgroundColor: '#f5f7f3', padding: '80px 20px' }}>
                    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-light text-[#556b4e] mb-6">Comparte tu recuerdo</h2>
                        
                        {preview && (
                            <div className="mb-6 overflow-hidden border border-gray-100">
                                {preview.type.startsWith('video') 
                                    ? <video src={preview.url} controls className="w-full" />
                                    : <img src={preview.url} className="w-full" alt="preview" />
                                }
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input 
                                type="file" 
                                onChange={handleArchivoChange} 
                                required 
                                className="p-2 border border-dashed border-[#9aaa8a] text-sm"
                            />
                            {errors?.archivo && <p className="text-red-500 text-xs text-left">{errors.archivo}</p>}
                            
                            <input 
                                type="text" placeholder="Título (opcional)" value={titulo} 
                                onChange={e => setTitulo(e.target.value)}
                                className="p-3 border outline-none"
                            />
                            
                            <textarea 
                                placeholder="Descripción (opcional)" value={descripcion} 
                                onChange={e => setDescripcion(e.target.value)}
                                className="p-3 border h-24 resize-none outline-none"
                            />

                            <button 
                                type="submit" 
                                disabled={uploading}
                                className="bg-[#6f8352] text-white py-3 hover:bg-[#556b4e] transition-colors disabled:bg-gray-400"
                            >
                                {uploading ? `Subiendo... ${Math.round(progress)}%` : 'Subir recuerdo'}
                            </button>
                        </form>
                    </div>
                </section>
            )}

            <section className="pb-24">
                <div className="gallery-grid">
                    {galeria.map((item) => (
                        <div key={item.id} className="gallery-item" onClick={() => setModalItem(item)}>
                            {item.tipo === 'imagen' ? (
                                <img src={`/${item.ruta}`} alt="" loading="lazy" />
                            ) : (
                                <video src={`/${item.ruta}`} muted playsInline />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {modalItem && (
                <div 
                    className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setModalItem(null)}
                >
                    <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
                        {modalItem.tipo === 'imagen' 
                            ? <img src={`/${modalItem.ruta}`} className="max-h-[85vh] w-auto" alt="" />
                            : <video src={`/${modalItem.ruta}`} controls autoPlay className="max-h-[85vh] w-auto" />
                        }
                        <div className="mt-4">
                            <a href={`/${modalItem.ruta}`} download className="text-white underline text-sm">
                                Descargar archivo original
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}