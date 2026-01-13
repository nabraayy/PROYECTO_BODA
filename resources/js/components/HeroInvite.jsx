// resources/js/Components/HeroInvite.jsx

import { Link } from '@inertiajs/react';

export default function HeroInvite({
    subtitle = "",
    title = "",
    buttonText = "Confirmar asistencia",
    buttonLink = "/confirmar",
    backgroundImage
}) {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '70vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {/* Overlay suave */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.25)'
                }}
            />

            {/* Contenido centrado */}
            <div
                style={{
                    position: 'relative',
                    textAlign: 'center',
                    color: 'white',
                    maxWidth: '800px',
                    padding: '20px'
                }}
            >
                {/* Texto pequeño */}
                <p
                    style={{
                        fontSize: '1.2rem',
                        fontWeight: 300,
                        marginBottom: '10px'
                    }}
                >
                    {subtitle}
                </p>

                {/* Texto grande */}
                <h1
                    style={{
                        fontSize: '2.3rem',
                        fontWeight: 300,
                        marginBottom: '40px',
                        lineHeight: '1.2',
                        
                    }}
                >
                    {title}
                </h1>

                {/* Botón */}
                <Link
                    href={buttonLink}
                    style={{
                        backgroundColor: '#6f7f60',
                        padding: '14px 40px',
                        color: 'white',
                        fontSize: '1.2rem',
                        textDecoration: 'none',
                        borderRadius: '2px',
                        fontWeight: 300
                    }}
                >
                    {buttonText}
                </Link>
            </div>
        </div>
    );
}
