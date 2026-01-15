import NavBar from '@/components/NavBar';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Iniciar sesión" />

            <style>
                {`
                    .page-container {
                        height: 100vh;
                        width: 100%;
                        background-image: url('/boda_lucia/1.jpeg'); 
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                        position: relative;
                        color: white;
                        font-family: 'Georgia', serif;
                        display: flex;
                        flex-direction: column;
                    }

                    .overlay {
                        position: absolute;
                        inset: 0;
                        background: rgba(0,0,0,0.45);
                        z-index: 1;
                    }

                    /* HEADER */
                    .header {
                        z-index: 2;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 25px 60px;
                        font-size: 16px;
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

                    /* LOGIN CARD */
                    .login-wrapper {
                        z-index: 2;
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .login-card {
                        background: rgba(255,255,255,0.88);
                        padding: 40px;
                        width: 100%;
                        max-width: 420px;
                        border-radius: 12px;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                        text-align: center;
                        color: #333;
                    }

                    .login-title {
                        font-family: 'Playfair Display', serif;
                        font-size: 30px;
                        margin-bottom: 20px;
                    }

                    .login-label {
                        text-align: left;
                        display: block;
                        font-weight: 600;
                        color: #333;
                        margin-top: 15px;
                        margin-bottom: 5px;
                    }

                    .login-input {
                        width: 100%;
                        padding: 12px;
                        border-radius: 6px;
                        border: 1px solid #bbb;
                        outline: none;
                        margin-bottom: 5px;
                    }

                    .login-input:focus {
                        border-color: #6f8352;
                    }

                    .login-button {
                        margin-top: 20px;
                        width: 100%;
                        padding: 12px;
                        border: none;
                        border-radius: 6px;
                        background-color: #6f8352;
                        color: white;
                        font-size: 16px;
                        cursor: pointer;
                    }

                    .login-button:hover {
                        background-color: #5a6d45;
                    }

                    .extra-links {
                        margin-top: 15px;
                        font-size: 14px;
                    }

                    .extra-links a {
                        color: #6f8352;
                        text-decoration: underline;
                    }
                `}
            </style>

            <div className="page-container">
                <div className="overlay"></div>

                <NavBar />
                <div className="login-wrapper">
                    <div className="login-card">
                        <h1 className="login-title">Iniciar sesión</h1>

                        {status && <div className="mb-4 text-green-700">{status}</div>}

                        <form onSubmit={submit}>
                            <label className="login-label">Email</label>
                            <input
                                type="email"
                                className="login-input"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && (
                                <div className="text-red-600 text-sm">{errors.email}</div>
                            )}

                            <label className="login-label">Contraseña</label>
                            <input
                                type="password"
                                className="login-input"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && (
                                <div className="text-red-600 text-sm">{errors.password}</div>
                            )}

                            <button className="login-button" disabled={processing}>
                                Entrar
                            </button>
                        </form>

                        <div className="extra-links">
                            {canResetPassword && (
                                <Link href={route('password.request')}>
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            )}
                            <br />
                            <Link href={route('register')}>
                                ¿No tienes cuenta? Regístrate aquí
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
