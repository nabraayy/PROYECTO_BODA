import React, { useState } from 'react';
import NavBar from '@/Components/NavBar';
import Footer from '@/components/Footer';
import { router } from '@inertiajs/react';

export default function Galeria({ galeria: initialGaleria = [], auth }) {

    // Estados
    const [archivo, setArchivo] = useState(null);
    const [preview, setPreview] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [galeria, setGaleria] = useState(initialGaleria);
    const [modalItem, setModalItem] = useState(null);

    // Alturas tipo Squarespace
    const getHeight = (index) => {
        const heights = [220, 360, 500, 280];
        return heights[index % heights.length];
    };

    // Manejar archivo
    const handleArchivoChange = (e) => {
        const file = e.target.files[0];
        setArchivo(file);
        setPreview(file ? { url: URL.createObjectURL(file), type: file.type } : null);
    };

    // Subir archivo
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!archivo) return;

        router.post(route('galeria.store'), {
            archivo,
            titulo,
            descripcion,
        }, {
            forceFormData: true,
            onSuccess: () => {
                setArchivo(null);
                setPreview(null);
                setTitulo('');
                setDescripcion('');
            }
        });
    };

    return (
        <div>
            <NavBar />

            {/* CABECERA */}
            <section className="bg-[#dce6d4] pt-32 pb-24 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <span className="block mb-6 text-sm tracking-[0.3em] uppercase text-[#7a8a70]">
                        Galería
                    </span>
                    <h1 className="font-serif text-[2.8rem] md:text-[3.5rem] font-light text-[#556b4e]">
                        Galería de recuerdos
                    </h1>
                    <div className="mx-auto mt-10 h-px w-32 bg-[#9aaa8a] opacity-70" />
                </div>
            </section>

            {/* SUBIDA */}
            {auth?.user && (
                <section style={{ backgroundColor: '#f5f7f3', padding: '80px 20px' }}>
                    <div style={{
                        maxWidth: '500px',
                        margin: '0 auto',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '40px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 300, color: '#556b4e', marginBottom: '30px' }}>
                            Comparte tu recuerdo
                        </h2>

                        {preview && (
                            <div style={{ marginBottom: '25px', borderRadius: '6px', overflow: 'hidden' }}>
                                {preview.type.startsWith('video')
                                    ? <video controls style={{ width: '100%' }} src={preview.url} />
                                    : <img src={preview.url} alt="preview" style={{ width: '100%' }} />
                                }
                            </div>
                        )}

                        <form onSubmit={handleSubmit} encType="multipart/form-data"
                              style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <input type="file" onChange={handleArchivoChange} required />
                            <input type="text" placeholder="Título (opcional)" value={titulo}
                                   onChange={e => setTitulo(e.target.value)} />
                            <textarea placeholder="Descripción (opcional)" value={descripcion}
                                      onChange={e => setDescripcion(e.target.value)} />
                            <button type="submit">Subir recuerdo</button>
                        </form>
                    </div>
                </section>
            )}

            {/* GALERÍA TIPO SQUARESPACE */}
            <section style={{ backgroundColor: '#dce6d4', padding: '100px 20px' }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0'
                }}>
                    {galeria.map((item, index) => (
                        <div
                            key={item.id}
                            style={{
                                position: 'relative',
                                height: `${getHeight(index)}px`,
                                overflow: 'hidden',
                                cursor: 'pointer'
                            }}
                            onClick={() => setModalItem(item)}
                        >
                            {item.tipo === 'imagen' ? (
                                <img
                                    src={`/${item.ruta}`}
                                    alt={item.titulo ?? ''}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
                                <video
                                    src={`/${item.ruta}`}
                                    muted
                                    playsInline
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
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

            {/* MODAL */}
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
                            ? <img src={`/${modalItem.ruta}`} style={{ maxHeight: '90vh' }} />
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
