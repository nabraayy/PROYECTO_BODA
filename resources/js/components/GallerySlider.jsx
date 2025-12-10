import React, { useState } from "react";

export default function GallerySlider({ images }) {
    const [page, setPage] = useState(0);
    const [animating, setAnimating] = useState(false);

    const totalPages = Math.ceil(images.length / 3);

    const handleChange = (direction) => {
        if (animating) return; // evita spam de clics
        setAnimating(true);

        setTimeout(() => {
            if (direction === "next") {
                setPage((p) => (p === totalPages - 1 ? 0 : p + 1));
            } else {
                setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
            }
            setAnimating(false);
        }, 300); // duración de la animación
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
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;

                    /* ANIMACIÓN */
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
                    height: 450px;
                    overflow: hidden;
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
            `}
            </style>

            <div className="gallery-wrapper">
                {/* GRID + ANIMACIÓN */}
                <div className={`gallery-grid ${animating ? "anim-out" : ""}`}>
                    {visibleImages.map((img, i) => (
                        <div className="gallery-item" key={i}>
                            <img src={img} />
                        </div>
                    ))}
                </div>

                {/* FLECHAS */}
                <div className="gallery-arrows">
                    <span className="arrow" onClick={() => handleChange("prev")}>←</span>
                    <span className="arrow" onClick={() => handleChange("next")}>→</span>
                </div>
            </div>
        </>
    );
}
