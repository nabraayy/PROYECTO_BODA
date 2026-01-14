import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function NavBar() {
    const { url, props } = usePage();
    const auth = props.auth ?? {};
    const [scrolled, setScrolled] = useState(false);

    // Detecta scroll para cambiar el fondo del navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (path) => url.startsWith(path);

    const activeStyle = {
        textDecoration: "underline",
        fontWeight: "500",
    };

    return (
        <>
           
            <style>
                {`
                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 25px 60px;
                        font-size: 16px;

                        position: fixed;
                        top: 0;
                        width: 100%;
                        z-index: 999;

                        background-color: transparent;
                        transition: background-color 0.3s ease, padding 0.3s ease;
                    }

                    .header.scrolled {
                        background-color: rgba(0, 0, 0, 0.75);
                        backdrop-filter: blur(4px);
                        padding: 18px 60px;
                    }

                    .header-links a {
                        margin-right: 25px;
                        text-decoration: none;
                        color: white;
                        font-weight: 300;
                    }

                    .header-buttons a {
                        margin-left: 18px;
                        padding: 10px 18px;
                        border: 1px solid white;
                        border-radius: 3px;
                        color: white;
                        text-decoration: none;
                    }

                    .confirm-btn {
                        background-color: #6f8352;
                        border: none !important;
                    }
                `}
            </style>

            {/* NAV STRUCTURE */}
            <header className={`header ${scrolled ? "scrolled" : ""}`}>

                {/* LEFT NAV LINKS */}
                <nav className="header-links">

                    <Link
                        href="/nuestra-historia"
                        style={isActive('/nuestra-historia') ? activeStyle : {}}
                    >
                        Nuestra historia
                    </Link>
                    <Link
                        href="/galeria"
                        style={isActive('/galeria') ? activeStyle : {}}
                    >
                        Galeria
                    </Link>
                    

                </nav>

                {/* LOGO CENTER */}
                <div className="logo">
                    <h2
                        style={{
                            margin: 0,
                            color: "white",
                            fontFamily: "Copperplate",
                            fontSize: "2rem",
                        }}
                    >
                       <Link href="/" >L&R 11/07/2026</Link>
                    </h2>
                </div>

                {/* RIGHT BUTTONS */}
                <div className="header-buttons">
                    {auth.user ? (
                        <Link href={route("dashboard")}>Dashboard</Link>
                    ) : (
                        <>
                            <Link href={route("login")}>Iniciar sesión</Link>
                            
                        </>
                    )}
                    <a href="/confirmar" className="confirm-btn">
                            Confirmar asistencia
                        </a>
                </div>
            </header>
        </>
    );
}
