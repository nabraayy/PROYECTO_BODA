import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function NavBar() {
    const { url, props } = usePage();
    const auth = props.auth ?? {};
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);


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

/* IZQUIERDA */
.header-left {
    display: flex;
    gap: 25px;
}

.header-left a {
    color: white;
    text-decoration: none;
    font-weight: 300;
}

/* CENTRO */
.header-center h2 {
    margin: 0;
    font-family: Copperplate;
    font-size: 1.9rem;
    text-align: center;
}

.header-center a {
    color: white;
    text-decoration: none;
}

/* DERECHA */
.header-right {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
}

.header-right a,
.logout-btn {
    color: white;
    text-decoration: none;
    padding: 10px 18px;
    border: 1px solid white;
    border-radius: 3px;
    font-weight: 400;
}

.confirm-btn {
    background-color: #6f8352;
    border: none;
}

.logout-btn {
    background: transparent;
    cursor: pointer;
}

.logout-btn:hover,
.confirm-btn:hover {
    background-color: #5f6f52;
}


@media (max-width: 900px) {
    .header {
        grid-template-columns: 1fr auto;
    }

    .header-left,
    .header-right {
        display: none;
    }

    .header-center {
        justify-self: center;
    }
}

                `}
            </style>

           <header className={`header ${scrolled ? "scrolled" : ""}`}>

    {/* IZQUIERDA: enlaces */}
    {auth.user ? (
        <div className="header-left">
            <Link href="/nuestra-historia">Nuestra historia</Link>
            <Link href="/galeria">Galería</Link>
        </div>
    ) :  <div className="header-left">
            <Link href="/nuestra-historia">Nuestra historia</Link>
        </div>}

    {/* CENTRO: logo */}
    <div className="header-center">
        <h2>
            <Link href="/">L&R 11/07/2026</Link>
        </h2>
    </div>

    {/* DERECHA: botones */}
    <div className="header-right">
        {auth.user ? (
            auth.user.role === 'admin' ? (
                <Link href={route("dashboard")}>Dashboard</Link>
            ) : (
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="logout-btn"
                >
                    Logout
                </Link>
            )
        ) : (
            <Link href={route("login")}>Iniciar sesión</Link>
        )}

        <Link href="/confirmar" className="confirm-btn">
            Confirmar asistencia
        </Link>
    </div>

</header>

        </>
    );
}
