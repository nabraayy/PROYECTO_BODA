import React, { useState } from "react";

export default function GallerySlider({ images }) {
    const [page, setPage] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [selectedImg, setSelectedImg] = useState(null);

    const totalPages = Math.ceil(images.length / 3);

    const handleChange = (direction) => {
        if (animating) return;
        setAnimating(true);

        setTimeout(() => {
            if (direction === "next") {
                setPage((p) => (p === totalPages - 1 ? 0 : p + 1));
            } else {
                setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
            }
            setAnimating(false);
        }, 300);
    };

    const startIndex = page * 3;
    const visibleImages = images.slice(startIndex, startIndex + 3);

    return (
        <>
            <style>
                {`
                .gallery-wrapper {
                    width: 100%;
                    margin: 0 auto;
                }

                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 20px;
                    opacity: 1;
                    transform: translateY(0);
                    transition: opacity 0.3s ease, transform 0.3s ease;
                }

                .gallery-grid.anim-out {
                    opacity: 0;
                    transform: translateY(15px);
                }

                .gallery-item {
                    width: 100%;
                    height: 300px;  /* Ajustado para que no sea tan grande */
                    overflow: hidden;
                    cursor: pointer;
                    transition: opacity 0.3s ease;
                }

                .gallery-item:hover {
                    opacity: 0.9;
                }

                .gallery-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .gallery-arrows {
                    margin-top: 30px;
                    display: flex;
                    justify-content: center;
                    gap: 40px;
                    font-size: 2rem;
                    color: #556b4e;
                    cursor: pointer;
                    user-select: none;
                }

                .arrow:hover {
                    opacity: 0.6;
                }

                /* ESTILOS DEL MODAL (LIGHTBOX) */
                .lightbox-overlay {
                    position: fixed;
                    inset: 0;
                    background-color: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    cursor: zoom-out;
                    padding: 20px;
                }

                .lightbox-img {
                    max-width: 95vw;
                    max-height: 90vh;
                    object-fit: contain;
                    border-radius: 4px;
                    cursor: default;
                }

                /* MEDIA QUERIES PARA RESPONSIVIDAD */
                @media (max-width: 768px) {
                    .gallery-arrows {
                        font-size: 1.5rem;
                    }

                    .gallery-item {
                        height: 250px; /* Reducir la altura en pantallas pequeñas */
                    }

                    .gallery-item img {
                        object-fit: cover;
                    }
                }

                @media (max-width: 480px) {
                    .gallery-arrows {
                        font-size: 1.2rem;
                    }

                    .gallery-item {
                        height: 200px; /* Ajustar aún más la altura */
                    }
                }
            `}
            </style>

            <div className="gallery-wrapper">
                <div className={`gallery-grid ${animating ? "anim-out" : ""}`}>
                    {visibleImages.map((img, i) => (
                        <div 
                            className="gallery-item" 
                            key={i} 
                            onClick={() => setSelectedImg(img)} // Abrir imagen
                        >
                            <img src={img} alt={`Gallery ${i}`} />
                        </div>
                    ))}
                </div>

                <div className="gallery-arrows">
                    <span className="arrow" onClick={() => handleChange("prev")}>←</span>
                    <span className="arrow" onClick={() => handleChange("next")}>→</span>
                </div>
            </div>

            {/* MODAL QUE APARECE AL HACER CLIC */}
            {selectedImg && (
                <div 
                    className="lightbox-overlay" 
                    onClick={() => setSelectedImg(null)} // Cerrar al hacer clic fuera
                >
                    <img 
                        src={selectedImg} 
                        className="lightbox-img" 
                        alt="Zoomed" 
                        onClick={(e) => e.stopPropagation()} // Evita cerrar al clicar la imagen
                    />
                    <div 
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '30px',
                            color: 'white',
                            fontSize: '2.5rem',
                            cursor: 'pointer'
                        }}
                        onClick={() => setSelectedImg(null)}
                    >
                        &times;
                    </div>
                </div>
            )}
        </>
    );
}