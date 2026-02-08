import { useState } from 'react';
import { useState, useEffect } from 'react';

function useColumns() {
    const [columns, setColumns] = useState(3);

    useEffect(() => {
        const updateColumns = () => {
            if (window.innerWidth < 640) {
                setColumns(1);
            } else if (window.innerWidth < 1024) {
                setColumns(2);
            } else {
                setColumns(3);
            }
        };

        updateColumns(); // al montar
        window.addEventListener('resize', updateColumns);

        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    return columns;
}

export default function MasonryGallery({ items = [] }) {
    const [modalItem, setModalItem] = useState(null);

    const styles = {
        masonry: {
            columnCount: 3,
            columnGap: '14px',
        },
        item: {
            breakInside: 'avoid',
            marginBottom: '14px',
            cursor: 'pointer',
        },
        media: {
            width: '100%',
            display: 'block',
            borderRadius: '6px',
            objectFit: 'cover',
        },
        modal: {
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
        },
        modalContent: {
            maxWidth: '90%',
            maxHeight: '90%',
            textAlign: 'center',
        },
        modalMedia: {
            maxWidth: '100%',
            maxHeight: '80vh',
            borderRadius: '8px',
        },
        download: {
            display: 'block',
            marginTop: '12px',
            color: '#fff',
            textDecoration: 'underline',
            fontSize: '0.9rem',
        },
    };

    return (
        <>
            <div style={styles.masonry}>
                {items.map((item) => (
                    <div
                        key={item.id}
                        style={styles.item}
                        onClick={() => setModalItem(item)}
                    >
                        {item.tipo === 'imagen' ? (
                            <img
                                src={`/${item.ruta}`}
                                alt={item.titulo ?? ''}
                                loading="lazy"
                                style={styles.media}
                            />
                        ) : (
                            <video
                                muted
                                style={styles.media}
                            >
                                <source src={`/${item.ruta}`} />
                            </video>
                        )}
                    </div>
                ))}
            </div>

            {modalItem && (
                <div
                    style={styles.modal}
                    onClick={() => setModalItem(null)}
                >
                    <div
                        style={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {modalItem.tipo === 'imagen' ? (
                            <img
                                src={`/${modalItem.ruta}`}
                                style={styles.modalMedia}
                            />
                        ) : (
                            <video
                                src={`/${modalItem.ruta}`}
                                controls
                                autoPlay
                                style={styles.modalMedia}
                            />
                        )}

                        <a
                            href={`/${modalItem.ruta}`}
                            download
                            style={styles.download}
                        >
                            Descargar archivo
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}
