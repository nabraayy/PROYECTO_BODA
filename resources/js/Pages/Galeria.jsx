import React, { useState } from 'react';
import NavBar from '@/Components/NavBar';
import Footer from '@/components/Footer';
import { router } from '@inertiajs/react';
export default function Galeria({ galeria: initialGaleria, auth }) {
    // Estados
    const [archivo, setArchivo] = useState(null);
    const [preview, setPreview] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [galeria, setGaleria] = useState(initialGaleria);

    // Manejar selección de archivo y previsualización
    const handleArchivoChange = (e) => {
        const file = e.target.files[0];
        setArchivo(file);

        if (file) {
            setPreview({ url: URL.createObjectURL(file), type: file.type });
        } else {
            setPreview(null);
        }
    };

    // Subir archivo
    

const handleSubmit = (e) => {
    e.preventDefault();
    if (!archivo) return;+

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

            {/* Título */}
            <div style={{ backgroundColor: '#dce6d4', padding: '120px 20px 80px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 300, color: '#556b4e', margin: 0 }}>
                    Nuestra Galería
                </h1>
            </div>

            {/* Formulario */}
            {auth.user && (
                <div style={{ backgroundColor: '#f5f7f3', padding: '40px 20px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 300, color: '#556b4e', marginBottom: '20px' }}>
                        Subir imagen o video
                    </h2>

                    {/* Previsualización */}
                    {preview && (
                        <div style={{ marginBottom: '20px' }}>
                            {preview.type.startsWith('video') ? (
                                <video controls style={{ maxWidth: '400px', borderRadius: '4px' }}>
                                    <source src={preview.url} type={preview.type} />
                                </video>
                            ) : (
                                <img src={preview.url} alt="preview" style={{ maxWidth: '400px', borderRadius: '4px' }} />
                            )}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
                    >
                        <input type="file" name="archivo" onChange={handleArchivoChange} required />
                        <input
                            type="text"
                            placeholder="Título"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                            style={{ padding: '8px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <textarea
                            placeholder="Descripción"
                            value={descripcion}
                            onChange={e => setDescripcion(e.target.value)}
                            style={{ padding: '8px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#6f8352',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '10px 20px',
                                cursor: 'pointer',
                            }}
                        >
                            Subir
                        </button>
                    </form>
                </div>
            )}

            {/* Galería existente */}
            <div
                style={{
                    backgroundColor: '#dce6d4',
                    padding: '80px 20px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                    justifyItems: 'center',
                }}
            >
                {galeria.map(item => (
                    <div
                        key={item.id}
                        style={{ width: '100%', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                    >
                        {item.tipo === 'imagen' ? (
                            <img
                                src={`/${item.ruta}`}
                                alt={item.titulo}
                                style={{ width: '100%', display: 'block' }}
                            />
                        ) : (
                            <video controls style={{ width: '100%' }}>
                                <source src={`/${item.ruta}`} type="video/mp4" />
                            </video>
                        )}
                        <div style={{ padding: '10px', textAlign: 'center' }}>
                            {item.titulo && <h3 style={{ fontSize: '1.5rem', color: '#556b4e', margin: '5px 0' }}>{item.titulo}</h3>}
                            {item.descripcion && <p style={{ fontSize: '1rem', color: '#33452f' }}>{item.descripcion}</p>}
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
}
