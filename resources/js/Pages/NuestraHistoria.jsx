import React from 'react';
import NavBar from '@/Components/NavBar';
import GallerySlider from '@/Components/GallerySlider';
import Footer from '@/components/Footer';
export default function NuestraHistoria() {
    return (
        <div>
            <NavBar />

            {/* HERO SUPERIOR */}
            <div
    style={{
        backgroundColor: '#dce6d4',
        padding: '120px 20px 80px', // extra arriba por el navbar fixed
        textAlign: 'center'
    }}
>
    <h1
        style={{
            fontSize: '3.5rem',
            fontWeight: 300,
            color: '#556b4e',
            margin: 0
        }}
    >
        Cómo empezó todo
    </h1>
</div>
<div
    style={{
        width: '100%',
        overflow: 'hidden'
    }}
>
    <img
        src="/boda_lucia/1.jpeg"  // <-- cambia la foto
        alt="Nuestra historia"
        style={{
            width: '100%',
            height: 'auto',
            display: 'block'
        }}
    />
</div>

            {/* FRASES / TESTIMONIOS */}
            <div
                style={{
                    backgroundColor: '#dce6d4',
                    padding: '80px 40px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '60px'
                }}
            >
                {/* Testimonio 1 */}
                <div>
                    <p
                        style={{
                            fontSize: '2rem',
                            fontWeight: 300,
                            color: '#556b4e',
                            lineHeight: 1.4
                        }}
                    >
                        “La vi al otro lado del bar y no pude dejar de mirarla hasta que me animé a hablarle.”
                    </p>
                    <p
                        style={{
                            fontSize: '1rem',
                            marginTop: '10px',
                            color: '#556b4e'
                        }}
                    >
                        — Antoine
                    </p>
                </div>

                {/* Testimonio 2 */}
                <div>
                    <p
                        style={{
                            fontSize: '2rem',
                            fontWeight: 300,
                            color: '#556b4e',
                            lineHeight: 1.4
                        }}
                    >
                        “Hicimos contacto visual en un momento y me hipnotizó esa sonrisa adictiva que tiene.”
                    </p>
                    <p
                        style={{
                            fontSize: '1rem',
                            marginTop: '10px',
                            color: '#556b4e'
                        }}
                    >
                        — Soria
                    </p>
                </div>
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
                <div style={{ flex: 1 }}>
                    <h2
                        style={{
                            fontSize: '3rem',
                            fontWeight: 300,
                            color: 'white',
                            marginBottom: '20px'
                        }}
                    >
                        LUCIA Y ROMÁN
                    </h2>

                    <p
                        style={{
                            fontSize: '1.2rem',
                            lineHeight: 1.7,
                            color: '#33452f'
                        }}
                    >
                        Soria y Antoine se conocieron en una salida con sus respectivos amigos a un bar de Phoenix. 
                        Después de que se llamaran la atención mutuamente en el bar y de que pasaron el resto de la 
                        noche descubriendo que tenían mucho en común, empezaron a salir. Dos años más tarde, somos 
                        mejores amigos, un amor verdadero y excelentes compañeros de vida.  
                        ¡Por fin estamos listos para hacerlo oficial!
                    </p>
                </div>
            </div>

            {/* SECCIÓN FINAL */}
            <div style={{ padding: '80px 40px', textAlign: 'center' }}>
                
                <h2
                    style={{
                        fontSize: '3rem',
                        fontWeight: 300,
                        color: '#556b4e',
                        marginBottom: '20px'
                    }}
                >
                    El resto es historia conocida
                </h2>

                <p
                    style={{
                        maxWidth: '800px',
                        margin: '0 auto 60px auto',
                        fontSize: '1.2rem',
                        color: '#556b4e',
                        lineHeight: 1.7
                    }}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
                </p>

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
