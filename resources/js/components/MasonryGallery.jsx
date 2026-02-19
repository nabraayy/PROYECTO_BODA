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

export default function Gallery() {
  return (
    <section className="gallery">
        <style>{`
          .gallery {
            column-count: 4;
            column-gap: 1.2rem;
            padding: 1rem;
            }

            .gallery img {
            width: 100%;
            margin-bottom: 1.2rem;
            border-radius: 6px;
            break-inside: avoid;
            transition: transform 0.3s ease;
            }

            .gallery img:hover {
            transform: scale(1.02);
            }

            @media (max-width: 1200px) {
            .gallery { column-count: 3; }
            }

            @media (max-width: 768px) {
            .gallery { column-count: 2; }
            }

            @media (max-width: 480px) {
            .gallery { column-count: 1; }
            }

        `}</style>
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Galería ${index}`} />
      ))}
    </section>
  );
}
