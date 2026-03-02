function GalleryModal({ item, onClose }) {
  const [downloadUrl, setDownloadUrl] = useState(null);

  // Obtener el enlace de descarga desde el backend
  const handleDownload = async () => {
    try {
      // Hacer una solicitud GET para obtener el enlace
      const response = await axios.get(`/api/download-link/${item.ruta}`);
      setDownloadUrl(response.data.url); // Establecer la URL de descarga
    } catch (error) {
      console.error('Error al obtener el enlace de descarga', error);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
        {item.tipo === 'imagen' ? (
          <img
            src={`https://your-account-id.r2.dev/your-bucket-name/${item.ruta}`} // URL completa de R2
            alt={item.titulo ?? ''}
            style={{
              maxWidth: '95vw',
              maxHeight: '85vh',
              objectFit: 'contain',
              borderRadius: '8px',
              display: 'block',
            }}
          />
        ) : (
          <video
            src={`https://your-account-id.r2.dev/your-bucket-name/${item.ruta}`} // URL completa de R2
            controls
            autoPlay
            style={{
              maxWidth: '95vw',
              maxHeight: '85vh',
              borderRadius: '8px',
              display: 'block',
            }}
          />
        )}

        <div style={{ marginTop: '14px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={handleDownload}
            style={{
              color: 'white',
              background: 'transparent',
              padding: '10px 14px',
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Descargar
          </button>

          {/* Mostrar el enlace de descarga solo si lo hemos obtenido */}
          {downloadUrl && (
            <a
              href={downloadUrl}
              download
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '10px 14px',
                border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: '8px',
              }}
            >
              Descargar archivo original
            </a>
          )}

          <button
            type="button"
            onClick={onClose}
            style={{
              color: 'white',
              background: 'transparent',
              padding: '10px 14px',
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}