export default function SectionBlock({ 
    title, 
    place,
    day,
    time, 
    address, 
    mapUrl, 
    image, 
    reverse = false 
}) {
    return (
        <div 
            className="section-block" 
            style={{
                display: 'flex',
                flexDirection: reverse ? 'row-reverse' : 'row',
                alignItems: 'center',
                padding: '40px 0',
                backgroundColor: '#dce6d4',
                flexWrap: 'wrap' // Agregar para permitir que los elementos se apilen en pantallas pequeñas
            }}
        >
            {/* Imagen */}
            <div style={{ flex: 1, padding: '20px', minWidth: '250px' }}>
                <img 
                    src={image} 
                    alt={title} 
                    style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '4px',
                        justifyContent: 'center'
                    }} 
                />
            </div>

            {/* Texto */}
            <div style={{
                flex: 1,
                padding: '20px',
                textAlign: 'center',
                minWidth: '250px'  // Asegurarse de que el texto no se quede comprimido
            }}>
                <h3 style={{
                    fontSize: '2rem', 
                    color: '#556b4e', 
                    marginBottom: '20px'
                }}>
                    {title}
                </h3>
                <p style={{
                    fontSize: '1.5rem', 
                    color: '#556b4e', 
                    marginBottom: '10px'
                }}>
                    {place}
                </p>
                <p style={{
                    fontSize: '1.2rem', 
                    marginBottom: '10px'
                }}>
                    {day}
                </p>
                <p style={{
                    fontSize: '1.8rem', 
                    marginBottom: '10px'
                }}>
                    {time}
                </p>
                <a 
                    href={mapUrl}
                    style={{
                        color: '#556b4e', 
                        textDecoration: 'underline'
                    }}
                >
                    Les Moreres, La Vall d'Uixó
                </a>
            </div>

            {/* Media Queries para pantallas pequeñas */}
            <style>
                {`
                    @media (max-width: 768px) {
                        .section-block {
                            flex-direction: column;
                            padding: 20px;
                        }
                        .section-block img {
                            max-width: 90%; /* Ajustar el tamaño de la imagen en dispositivos pequeños */
                        }
                        .section-block h3 {
                            font-size: 1.5rem; /* Ajustar tamaño del título */
                        }
                        .section-block p {
                            font-size: 1.2rem; /* Ajustar tamaño del texto */
                        }
                    }
                `}
            </style>
        </div>
    );
}