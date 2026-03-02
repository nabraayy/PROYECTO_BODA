import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function NavBar() {
    const { url, props } = usePage();
    const auth = props.auth ?? {};
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false); // Estado para el modal estético

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleConfirmClick = (e) => {
        if (!auth.user) {
            e.preventDefault();
            setMenuOpen(false); // Cierra el menú móvil si está abierto
            setShowAuthModal(true); // Muestra el aviso estético
        }
    };

    return (
        <>
            <style>
                {`
                    .header {
                        display: grid;
                        grid-template-columns: 1fr auto 1fr;
                        align-items: center;
                        padding: 20px 40px;
                        position: fixed;
                        width: 100%;
                        top: 0;
                        z-index: 999;
                        background-color: transparent;
                        transition: background-color 0.3s ease;
                    }

                    .header.scrolled {
                        background-color: rgba(0, 0, 0, 0.75);
                        backdrop-filter: blur(6px);
                    }

                    .header-left { display: flex; gap: 25px; }
                    .header-left a { color: white; text-decoration: none; font-weight: 300; }

                    .header-center h2 {
                        margin: 0;
                        font-family: Copperplate;
                        font-size: 1.9rem;
                        text-align: center;
                    }
                    .header-center a { color: white; text-decoration: none; }

                    .header-right { display: flex; justify-content: flex-end; gap: 15px; }
                    .header-right a, .logout-btn {
                        color: white;
                        text-decoration: none;
                        padding: 10px 18px;
                        border: 1px solid white;
                        border-radius: 3px;
                        font-weight: 400;
                    }

                    .confirm-btn { background-color: #6f8352; border: none !important; cursor: pointer; }
                    .logout-btn { background: transparent; cursor: pointer; }
                    .logout-btn:hover, .confirm-btn:hover { background-color: #5f6f52; }

                    /* MODAL ESTÉTICO */
                    .modal-overlay {
                        position: fixed;
                        top: 0; left: 0; width: 100%; height: 100%;
                        background: rgba(0,0,0,0.6);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1000;
                        backdrop-filter: blur(4px);
                        padding: 20px;
                    }
                    .modal-content {
                        background: white;
                        padding: 40px;
                        border-radius: 15px;
                        max-width: 400px;
                        width: 100%;
                        text-align: center;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                        animation: fadeIn 0.3s ease-out;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .modal-content h3 { font-family: serif; color: #556b4e; fontSize: 1.8rem; margin-bottom: 15px; }
                    .modal-content p { color: #666; margin-bottom: 25px; line-height: 1.6; }
                    .modal-buttons { display: flex; flex-direction: column; gap: 10px; }
                    .btn-login { background: #6f8352; color: white; padding: 12px; border-radius: 5px; text-decoration: none; }
                    .btn-close { color: #888; text-decoration: underline; font-size: 0.9rem; border: none; background: none; cursor: pointer; margin-top: 10px; }

                    /* Menú móvil */
                    .mobile-menu {
                        display: none;
                        flex-direction: column;
                        gap: 10px;
                        background-color: rgba(0, 0, 0, 0.9);
                        position: absolute;
                        top: 60px; right: 20px;
                        padding: 20px; border-radius: 5px; width: 220px;
                        text-align: right;
                        color: white;
                    }
                    .menu-toggle { display: none; cursor: pointer; font-size: 1.5rem; color: white; }

                    @media (max-width: 900px) {
                        .header { grid-template-columns: 1fr auto; padding: 15px 20px; }
                        .header-left, .header-right { display: none; }
                        .menu-toggle { display: block; }
                        .mobile-menu { display: ${menuOpen ? "flex" : "none"}; }
                    }
                `}
            </style>

            {/* MODAL DE AUTENTICACIÓN */}
            {showAuthModal && (
                <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h3>¡Hola!</h3>
                        <p>Para poder confirmar vuestra asistencia, necesitamos que primero iniciéis sesión.</p>
                        <div className="modal-buttons">
                            <Link href={route('login')} className="btn-login">Iniciar Sesión / Registrarse</Link>
                            <button className="btn-close" onClick={() => setShowAuthModal(false)}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}

            <header className={`header ${scrolled ? "scrolled" : ""}`}>
                <div className="header-left">
                    <Link href="/nuestra-historia">Nuestra historia</Link>
                    {auth.user && <Link href="/galeria">Galería</Link>}
                </div>

                <div className="header-center">
                    <h2><Link href="/">L&R 11/07/2026</Link></h2>
                </div>

                <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</div>

                <div className="mobile-menu">
                    <Link href="/nuestra-historia">Nuestra historia</Link>
                    {auth.user ? (
                        <>
                            <Link href="/galeria">Galería</Link>
                            {auth.user.role === 'admin' && <Link href={route("dashboard")}>Dashboard</Link>}
                            <Link href={route('logout')} method="post" as="button" className="logout-btn">Logout</Link>
                        </>
                    ) : (
                        <Link href={route("login")}>Iniciar sesión</Link>
                    )}
                    <Link href="/confirmar" className="confirm-btn" onClick={handleConfirmClick}>
                        Confirmar asistencia
                    </Link>
                </div>

                <div className="header-right">
                    {auth.user ? (
                        <>
                            {auth.user.role === 'admin' && <Link href={route("dashboard")}>Dashboard</Link>}
                            <Link href={route('logout')} method="post" as="button" className="logout-btn">Logout</Link>
                        </>
                    ) : (
                        <Link href={route("login")}>Iniciar sesión</Link>
                    )}
                    <Link href="/confirmar" className="confirm-btn" onClick={handleConfirmClick}>
                        Confirmar asistencia
                    </Link>
                </div>
            </header>
        </>
    );
}