import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function NavBar() {
    const { url, props } = usePage();
    const auth = props.auth ?? {};
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

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
            setMenuOpen(false);
            setShowAuthModal(true);
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
                        transition: all 0.3s ease;
                    }

                    /* Navbar al hacer scroll: Texto negro y fondo blanco */
                    .header.scrolled {
                        background-color: rgba(255, 255, 255, 0.95);
                        backdrop-filter: blur(8px);
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }

                    .header.scrolled .header-left a,
                    .header.scrolled .header-center h2 a,
                    .header.scrolled .header-right a:not(.confirm-btn),
                    .header.scrolled .menu-toggle {
                        color: #556b4e !important;
                    }

                    .header.scrolled .logout-btn {
                        color: #556b4e !important;
                        border-color: #556b4e !important;
                    }

                    /* Colores base (Estado transparente inicial) */
                    .header-left a { color: white; text-decoration: none; font-weight: 300; }
                    .header-center h2 { margin: 0; font-family: Copperplate; font-size: 1.7rem; text-align: center; }
                    .header-center a { color: white; text-decoration: none; }
                    .header-right { display: flex; justify-content: flex-end; gap: 15px; }
                    
                    .header-right a, .logout-btn {
                        color: white;
                        text-decoration: none;
                        padding: 8px 16px;
                        border: 1px solid white;
                        border-radius: 3px;
                        font-size: 0.9rem;
                    }

                    .confirm-btn { 
                        background-color: #6f8352 !important; 
                        color: white !important;
                        border: none !important; 
                    }

                    /* MODAL ESTÉTICO */
                    .modal-overlay {
                        position: fixed;
                        top: 0; left: 0; width: 100%; height: 100%;
                        background: rgba(0,0,0,0.5);
                        display: flex; align-items: center; justify-content: center;
                        z-index: 1001; backdrop-filter: blur(4px); padding: 20px;
                    }
                    .modal-content {
                        background: white; padding: 30px; border-radius: 12px;
                        max-width: 350px; width: 100%; text-align: center;
                        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                    }
                    .modal-content h3 { font-family: serif; color: #556b4e; font-size: 1.5rem; margin-bottom: 10px; }
                    .modal-content p { color: #666; font-size: 0.95rem; margin-bottom: 20px; }
                    .btn-login { 
                        display: block; background: #6f8352; color: white; 
                        padding: 12px; border-radius: 5px; text-decoration: none; font-weight: 500;
                    }
                    .btn-close { color: #999; text-decoration: underline; font-size: 0.8rem; border: none; background: none; margin-top: 15px; cursor: pointer; }

                    /* MENÚ MÓVIL REFORMADO: FONDO CLARO */
                    .menu-toggle { display: none; cursor: pointer; font-size: 1.8rem; color: white; }

                    @media (max-width: 900px) {
                        .header { grid-template-columns: 1fr auto; padding: 15px 20px; }
                        .header-left, .header-right { display: none; }
                        .menu-toggle { display: block; }
                        
                        .mobile-menu {
                            display: ${menuOpen ? "flex" : "none"};
                            flex-direction: column;
                            position: absolute;
                            top: 70px; right: 20px;
                            background-color: white; /* Ahora es blanco */
                            padding: 20px;
                            border-radius: 12px;
                            width: 250px;
                            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                            gap: 15px;
                            z-index: 1000;
                        }

                        .mobile-menu a {
                            color: #556b4e !important; /* Texto en verde oscuro */
                            text-decoration: none;
                            font-weight: 500;
                            font-size: 1rem;
                            padding: 10px 0;
                            border-bottom: 1px solid #f0f0f0;
                        }

                        .mobile-menu .confirm-btn {
                            background-color: #6f8352 !important;
                            color: white !important;
                            text-align: center;
                            border-radius: 5px;
                            border-bottom: none;
                            margin-top: 5px;
                        }

                        .mobile-menu .logout-btn {
                            color: #e53e3e !important;
                            border: none;
                            padding: 10px 0;
                            text-align: left;
                            font-weight: 500;
                        }
                    }
                `}
            </style>

            {/* MODAL */}
            {showAuthModal && (
                <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h3>¡Hola!</h3>
                        <p>Para poder confirmar vuestra asistencia, necesitamos que primero iniciéis sesión.</p>
                        <div className="modal-buttons">
                            <Link href={route('login')} className="btn-login">Iniciar Sesión</Link>
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

                <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? '✕' : '☰'}
                </div>

                <div className="mobile-menu shadow-2xl">
                    <Link href="/nuestra-historia" onClick={() => setMenuOpen(false)}>Nuestra historia</Link>
                    {auth.user ? (
                        <>
                            <Link href="/galeria" onClick={() => setMenuOpen(false)}>Galería</Link>
                            {auth.user.role === 'admin' && <Link href={route("dashboard")} onClick={() => setMenuOpen(false)}>Dashboard</Link>}
                            <Link href={route('logout')} method="post" as="button" className="logout-btn">Cerrar Sesión</Link>
                        </>
                    ) : (
                        <Link href={route("login")} onClick={() => setMenuOpen(false)}>Iniciar sesión</Link>
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