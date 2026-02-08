import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ confirmed = [], notConfirmed = [] }) {
    // Asegúrate de que confirmed y notConfirmed son arreglos antes de intentar hacer map
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold">Confirmaciones de Asistencia</h3>
                        </div>
                    </div>

                    {/* Tabla de usuarios que confirmaron asistencia */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-4">Usuarios que asistirán</h3>
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Nombre</th>
                                    <th className="px-4 py-2 border-b">Número de asistentes</th>
                                    <th className="px-4 py-2 border-b">Intolerancias</th>
                                    <th className="px-4 py-2 border-b">Mensaje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {confirmed.length > 0 ? (
                                    confirmed.map((confirmation, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 border-b">{confirmation.nombre}</td>
                                            <td className="px-4 py-2 border-b">{confirmation.asistentes}</td>
                                            <td className="px-4 py-2 border-b">{confirmation.intolerancias}</td>
                                            <td className="px-4 py-2 border-b">{confirmation.mensaje}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-4 py-2 border-b text-center">No hay usuarios que hayan confirmado asistencia</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Tabla de usuarios que no confirmaron asistencia */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-4">Usuarios que no asistirán</h3>
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Nombre</th>
                                    <th className="px-4 py-2 border-b">Número de asistentes</th>
                                    <th className="px-4 py-2 border-b">Intolerancias</th>
                                    <th className="px-4 py-2 border-b">Mensaje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notConfirmed.length > 0 ? (
                                    notConfirmed.map((confirmation, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 border-b">{confirmation.nombre}</td>
                                            <td className="px-4 py-2 border-b">{confirmation.asistentes}</td>
                                            <td className="px-4 py-2 border-b">{confirmation.intolerancias}</td>
                                            <td className="px-4 py-2 border-b">{confirmation.mensaje}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-4 py-2 border-b text-center">No hay usuarios que hayan rechazado asistir</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
