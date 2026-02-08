import React, { useState } from 'react';
import NavBar from '@/Components/NavBar';
import Footer from '@/components/Footer';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function Galeria({ galeria: initialGaleria = [], auth }) {

    const { errors } =  usePage().props;
    const [archivo, setArchivo] = useState(null);
    const [preview, setPreview] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [galeria, setGaleria] = useState(initialGaleria);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);


    const [modalItem, setModalItem] = useState(null);

    
    const handleArchivoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    
    const validTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/heic',
        'image/heif',
        'video/mp4',
        'video/quicktime'
    ];

    if (!validTypes.includes(file.type)) {
        alert('Formato no permitido. Usa JPG, PNG, WEBP o MP4.');
        e.target.value = '';
        return;
    }

    if (file.type.startsWith('video/') && file.size > 300 * 1024 * 1024) {
        alert('El vídeo es demasiado grande (máx. 300MB).');
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
            onProgress: (event) => {
                if (event.percentage) {
                    setProgress(event.percentage);
                }
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
        <div>
            <NavBar />
            <section className="bg-[#dce6d4] pt-32 pb-24 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <span className="block mb-6 text-sm tracking-[0.3em] uppercase text-[#7a8a70]">
                        Galeria 
                    </span>

                    <h1 className="font-serif text-[2.8rem] md:text-[3.5rem] font-light text-[#556b4e] leading-tight">
                        Galeria de recuerdos
                    </h1>

                    <div className="mx-auto mt-10 h-px w-32 bg-[#9aaa8a] opacity-70" />
                </div>
            </section>

           {auth?.user && (
    <section style={{ backgroundColor: '#f5f7f3', padding: '80px 20px' }}>
        <div
            style={{
                maxWidth: '500px',
                margin: '0 auto',
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '40px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                textAlign: 'center'
            }}
        >
            <h2 style={{ fontSize: '1.8rem', fontWeight: 300, color: '#556b4e', marginBottom: '30px' }}>
                Comparte tu recuerdo
            </h2>

            {preview && (
                <div
                    style={{
                        marginBottom: '25px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: '1px solid #e0e0e0'
                    }}
                >
                    {preview.type.startsWith('video') ? (
                        <video controls style={{ width: '100%' }}>
                            <source src={preview.url} type={preview.type} />
                        </video>
                    ) : (
                        <img src={preview.url} alt="preview" style={{ width: '100%' }} />
                    )}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
                <input
                    type="file"
                    name="archivo"
                    accept="image/*,video/mp4,video/quicktime"
                    onChange={handleArchivoChange}
                    required
                    style={{
                        padding: '10px',
                        border: '1px dashed #9aaa8a',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                    
                />
                {errors?.archivo && (
                    <p style={{ color: 'red', fontSize: '0.85rem' }}>
                        {errors.archivo}
                    </p>
                )}

                <input
                    type="text"
                    placeholder="Título (opcional)"
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                    style={{
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid #ccc'
                    }}
                />

                <textarea
                    placeholder="Descripción (opcional)"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                    style={{
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        resize: 'none'
                    }}
                />

                <button
                    type="submit"
                    style={{
                        backgroundColor: '#6f8352',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '12px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        marginTop: '10px'
                    }}
                >
                    Subir recuerdo
                </button>
                {uploading && (
                    <div style={{ marginTop: '12px' }}>
                        <div style={{
                            height: '6px',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '4px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${progress}%`,
                                height: '100%',
                                backgroundColor: '#6f8352',
                                transition: 'width 0.2s ease'
                            }} />
                        </div>
                        <p style={{ fontSize: '0.85rem', marginTop: '6px', color: '#556b4e' }}>
                            Subiendo… {Math.round(progress)}%
                        </p>
                    </div>
                )}

            </form>
        </div>
    </section>
)}

    <section style={{ backgroundColor: '#dce6d4', padding: '100px 20px' }}>
                <div
                style={{
                    maxWidth: '2200px',
                    columnCount: 4,
                }}
                >
                    {galeria.map((item, index) => (
                        <div
                        key={item.id}
                        style={{
                            breakInside: 'avoid',
                            position: 'relative',
                            cursor: 'pointer',
                            overflow: 'hidden', 
                            marginBottom: '0',
                        }}
                        onClick={() => setModalItem(item)}
                        >

                            {item.tipo === 'imagen' ? (
                                <img
                                    src={`/${item.ruta}`}
                                    alt={item.titulo ?? ''}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        maxWidth: '520px',
                                        display: 'block',
                                        objectFit: 'cover',
                                        margin: '0 auto'
                                    }}
                                />
                            ) : (
                                <video
                                    src={`/${item.ruta}`}
                                    muted
                                    playsInline
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        maxWidth: '520px',
                                        display: 'block',
                                        objectFit: 'cover',
                                        margin: '0 auto'
                                    }}
                                />
                            )}

                            {/* OVERLAY */}
                            {(item.titulo || item.descripcion) && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: '12px',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                                    color: 'white',
                                    fontSize: '0.9rem'
                                }}>
                                    {item.titulo && <strong>{item.titulo}</strong>}
                                    {item.descripcion && <div>{item.descripcion}</div>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            
            {modalItem && (
                <div onClick={() => setModalItem(null)} style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999
                }}>
                    <div onClick={e => e.stopPropagation()}>
                        {modalItem.tipo === 'imagen'
                            ? <img
                                src={`/${modalItem.ruta}`}
                                style={{
                                    maxWidth: '95vw',
                                    maxHeight: '95vh',
                                    objectFit: 'contain'
                                }}
                                />
                            : <video src={`/${modalItem.ruta}`} controls autoPlay style={{ maxHeight: '90vh' }} />
                        }
                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            <a href={`/${modalItem.ruta}`} download style={{ color: 'white' }}>
                                Descargar archivo
                            </a>
                        </div>
                    </div>
                </div>
            )}


            <Footer />
        </div>
    );
}
