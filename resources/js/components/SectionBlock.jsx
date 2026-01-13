// resources/js/Components/SectionBlock.jsx

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
                backgroundColor: '#dce6d4'
            }}
        >
            {/* Imagen */}
            <div style={{ flex: 1, padding: '20px' }}>
                <img 
                    src={image} 
                    alt={title} 
                    style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '4px'
                    }} 
                />
            </div>

            {/* Texto */}
            <div style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '2rem', color: '#556b4e', marginBottom: '20px' }}>{title}</h3>
                <p style={{ fontSize: '1.5rem',color: '#556b4e', marginBottom: '10px' }}>{place}</p>
                <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{day}</p>
                <p style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{time}</p>
                <a 
                    href={mapUrl}
                    style={{ color: '#556b4e', textDecoration: 'underline' }}
                >
                    Les Moreres, La Vall d'Uixó
                </a>
            </div>
        </div>
    );
}
