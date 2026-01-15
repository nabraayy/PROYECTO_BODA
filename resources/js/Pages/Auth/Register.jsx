import { Head, Link, useForm } from '@inertiajs/react';
import NavBar from '@/Components/NavBar';
export default function Register({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Registrarse" />

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

                    /* REGISTER CARD */
                    .register-wrapper {
                        z-index: 2;
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .register-card {
                        background: rgba(255,255,255,0.88);
                        padding: 40px;
                        width: 100%;
                        max-width: 450px;
                        border-radius: 12px;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                        text-align: center;
                        color: #333;
                    }

                    .register-title {
                        font-family: 'Playfair Display', serif;
                        font-size: 30px;
                        font-weight: bold;
                        margin-bottom: 20px;
                    }

                    .form-label {
                        text-align: left;
                        display: block;
                        font-weight: 600;
                        color: #333;
                        margin-top: 15px;
                        margin-bottom: 5px;
                    }

                    .form-input {
                        width: 100%;
                        padding: 12px;
                        border-radius: 6px;
                        border: 1px solid #bbb;
                        outline: none;
                        margin-bottom: 6px;
                    }

                    .form-input:focus {
                        border-color: #6f8352;
                    }

                    .register-button {
                        margin-top: 20px;
                        width: 100%;
                        padding: 12px;
                        border: none;
                        border-radius: 6px;
                        background-color: #6f8352;
                        color: white;
                        font-size: 16px;
                        cursor: pointer;
                        transition: 0.2s;
                    }

                    .register-button:hover {
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

                <NavBar auth={auth} />
                <div className="register-wrapper">
                    <div className="register-card">
                        <h1 className="register-title">Crear cuenta</h1>

                        <form onSubmit={submit}>
                            <label className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-input"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name && (
                                <div className="text-red-600 text-sm">{errors.name}</div>
                            )}

                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-input"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && (
                                <div className="text-red-600 text-sm">{errors.email}</div>
                            )}

                            <label className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-input"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && (
                                <div className="text-red-600 text-sm">{errors.password}</div>
                            )}

                            <label className="form-label">Confirmar contraseña</label>
                            <input
                                type="password"
                                className="form-input"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                            />
                            {errors.password_confirmation && (
                                <div className="text-red-600 text-sm">
                                    {errors.password_confirmation}
                                </div>
                            )}

                            <button className="register-button" disabled={processing}>
                                Crear cuenta
                            </button>
                        </form>

                        <div className="extra-links">
                            <Link href={route('login')}>
                                ¿Ya tienes cuenta? Inicia sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
