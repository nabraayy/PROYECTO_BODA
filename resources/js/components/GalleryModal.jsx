import React, { useEffect } from "react";

function GalleryModal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ textAlign: "center" }}>
        {item.tipo === "imagen" ? (
          <img
            src={`/${item.ruta}`}
            alt={item.titulo ?? ""}
            style={{
              maxWidth: "95vw",
              maxHeight: "85vh",
              objectFit: "contain",
              borderRadius: "8px",
              display: "block",
            }}
          />
        ) : (
          <video
            src={`/${item.ruta}`}
            controls
            autoPlay
            style={{
              maxWidth: "95vw",
              maxHeight: "85vh",
              borderRadius: "8px",
              display: "block",
            }}
          />
        )}

        <div style={{ marginTop: "14px", display: "flex", gap: "12px", justifyContent: "center" }}>
          <a
            href={`/${item.ruta}`}
            download
            style={{
              color: "white",
              textDecoration: "none",
              padding: "10px 14px",
              border: "1px solid rgba(255,255,255,0.35)",
              borderRadius: "8px",
            }}
          >
            Descargar
          </a>

          <button
            type="button"
            onClick={onClose}
            style={{
              color: "white",
              background: "transparent",
              padding: "10px 14px",
              border: "1px solid rgba(255,255,255,0.35)",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default GalleryModal;