import React from 'react';
import NavBar from '@/Components/NavBar';
import GallerySlider from '@/Components/GallerySlider';
import Footer from '@/components/Footer';
export default function NuestraHistoria() {
    return (
        <div>
            <NavBar />
            <section className="bg-[#dce6d4] pt-32 pb-24 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <span className="block mb-6 text-sm tracking-[0.3em] uppercase text-[#7a8a70]">
                        Nuestra historia
                    </span>

                    <h1 className="font-serif text-[2.8rem] md:text-[3.5rem] font-light text-[#556b4e] leading-tight">
                        Cómo empezó todo
                    </h1>

                    <div className="mx-auto mt-10 h-px w-32 bg-[#9aaa8a] opacity-70" />
                </div>
            </section>

        <div
            style={{
                width: '100%',
                overflow: 'hidden'
            }}
        >
            <img
                src="/boda_lucia/cala.png"  
                alt="Nuestra historia"
                style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                }}
            />
        </div>

            {/* HISTORIA: IMAGEN + TEXTO */}
            <div
                style={{
                    backgroundColor: '#dce6d4',
                    padding: '80px 40px',
                    display: 'flex',
                    gap: '40px',
                    alignItems: 'center'
                }}
            >
                {/* Imagen */}
                <div style={{ flex: 1 }}>
                    <img
                        src="/boda_lucia/2.jpeg"
                        alt="Lucia y Román"
                        style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '4px'
                        }}
                    />
                </div>

                {/* Texto */}
                <div className="flex-1">
    <h2 className="font-serif text-[2.6rem] md:text-[3rem] font-light text-[#6f7f60] mb-8 tracking-wide">
        Lucía & Román
    </h2>

    <div className="w-24 h-px bg-black opacity-60 mb-8" />

    <p className="text-[1.1rem] md:text-[1.2rem] leading-relaxed text-black max-w-xl">
        Una sesión de embarazo que terminó convirtiéndose en una pedida de mano.
        El mejor verano de nuestras vidas. Menorca. Una cala grabada a fuego en
        nuestra memoria: <span className="italic">Sa Mesquida</span>. Tú, yo y una
        bebé en camino.
        <br /><br />
        No había duda de que era el momento ideal para que Román hincara rodilla.
        <br /><br />
        Os dejamos algunas fotos para que podáis ver parte de ese momentazo.
    </p>
</div>

            </div>

            {/* SECCIÓN FINAL */}
            <div style={{ padding: '80px 40px', textAlign: 'center' }}>
                {/* GALERÍA 3 FOTOS */}
                <GallerySlider
                    images={[
                        "/boda_lucia/2.jpeg",
                        "/boda_lucia/3.jpeg",
                        "/boda_lucia/4.jpeg",
                        "/boda_lucia/5.jpeg",
                        "/boda_lucia/6.jpeg",
                        "/boda_lucia/7.jpeg",
                        "/boda_lucia/8.jpeg"
                    ]}
                />
               
            </div>
             <Footer />
        </div>
        
    );
}
