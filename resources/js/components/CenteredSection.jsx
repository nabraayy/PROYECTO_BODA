// resources/js/Components/CenteredSection.jsx

import { Link } from '@inertiajs/react';

export default function CenteredSection({
    title,
    buttonText,
    buttonLink = '#',
    backgroundColor = '#dce6d4',
    lineColor = '#9aaa8a'
}) {
    return (
        <div
            style={{
                backgroundColor: backgroundColor,
                padding: '100px 20px',
                textAlign: 'center'
            }}
        >
            {/* Líneas decorativas + texto */}
            <div 
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '40px'
                }}
            >
                {/* Línea izquierda */}
                <div 
                    style={{
                        width: '130px',
                        height: '2px',
                        backgroundColor: lineColor,
                        opacity: 0.7
                    }}
                />

                {/* Título */}
                <h2
                    style={{
                        fontSize: '1.3rem',
                        fontWeight: '300',
                        color: '#556b4e',
                        margin: 0
                    }}
                >
                    {title}
                </h2>

                {/* Línea derecha */}
                <div 
                    style={{
                        width: '130px',
                        height: '2px',
                        backgroundColor: lineColor,
                        opacity: 0.7
                    }}
                />
            </div>

            {/* Botón */}
            <div style={{ marginTop: '40px' }}>
                <Link
                    href={buttonLink}
                    style={{
                        backgroundColor: '#6f7f60',
                        padding: '14px 40px',
                        color: 'white',
                        fontSize: '1.2rem',
                        textDecoration: 'none',
                        display: 'inline-block',
                        borderRadius: '2px',
                        fontWeight: '300'
                    }}
                >
                    {buttonText}
                </Link>
            </div>
        </div>
    );
}
