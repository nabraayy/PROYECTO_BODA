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
            
            <div
                style={{
                    backgroundColor: '#dce6d4',
                    padding: '80px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '40px'
                }}
            >
                <div style={{ flex: 1, maxWidth: '600px' }}>
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
                <div style={{ flex: 1, maxWidth: '600px', textAlign: 'center' }}>
                    <h2 className="font-serif text-[2.6rem] md:text-[3rem] font-light text-[#6f7f60] mb-8 tracking-wide">
                        Lucía & Román
                    </h2>

                    <div className="w-24 h-px bg-black opacity-60 mb-8 mx-auto" />

                    <p className="text-[1.1rem] md:text-[1.2rem] leading-relaxed text-black max-w-xl mx-auto">
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

            <div style={{ padding: '80px 20px', textAlign: 'center' }}>
                <GallerySlider
                    images={[
                        "/boda_lucia/Tu historia/240822.0238.jpg",
                        "/boda_lucia/Tu historia/240822.0239.jpg",
                        "/boda_lucia/Tu historia/240822.0244.jpg",
                        "/boda_lucia/Tu historia/240822.0251.jpg",
                        "/boda_lucia/Tu historia/240822.0259.jpg",
                        "/boda_lucia/Tu historia/240822.0271.jpg",
                        "/boda_lucia/Tu historia/240822.0287.jpg",
                        "/boda_lucia/Tu historia/240822.0290.jpg",
                        "/boda_lucia/Tu historia/240822.0292.jpg",
                        "/boda_lucia/Tu historia/240822.0305.jpg",
                        "/boda_lucia/Tu historia/240822.0306.jpg",
                        "/boda_lucia/Tu historia/240822.0323.jpg",
                        "/boda_lucia/Tu historia/240822.0334.jpg",
                    ]}
                />
            </div>
            <Footer />
        </div>
    );
}