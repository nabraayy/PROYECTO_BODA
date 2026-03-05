import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatCard from '@/Components/StatCard';
import { useState } from 'react';

export default function Dashboard({ confirmed = [], notConfirmed = [], stats }) {
    const [search, setSearch] = useState('');
    const [onlyIntolerances, setOnlyIntolerances] = useState(false);
    const [attendanceFilter, setAttendanceFilter] = useState('all');

    const allConfirmations = [...confirmed, ...notConfirmed];
    
    const filteredConfirmations = allConfirmations.filter(c => {
        const matchesName = c.nombre.toLowerCase().includes(search.toLowerCase());
        const matchesIntolerances = !onlyIntolerances || (c.intolerancias && c.intolerancias.trim() !== '');
        const matchesAttendance = attendanceFilter === 'all' || c.asistencia === attendanceFilter;
        return matchesName && matchesIntolerances && matchesAttendance;
    });

    return (
        <AuthenticatedLayout
            header={<h2 className="font-serif text-xl md:text-2xl text-[#556b4e]">Panel de confirmaciones</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Estadísticas */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-8">
                        <StatCard title="Confirmaciones" value={stats.total} />
                        <StatCard title="Asisten" value={stats.yes} />
                        <StatCard title="No asisten" value={stats.no} />
                        <StatCard title="Con alergias" value={stats.intolerances} />
                        <StatCard title="Total invitados" value={stats.guests} />
                    </div>

                    {/* Filtros */}
                    <div className="bg-[#f5f7f3] border border-[#dce6d4] rounded-lg p-4 md:p-6 mb-8 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            <input
                                type="text"
                                placeholder="Buscar invitado..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full border border-[#9aaa8a] bg-white rounded-md px-4 py-2 text-sm focus:ring-1 focus:ring-[#6f7f60] outline-none"
                            />
                            <select
                                value={attendanceFilter}
                                onChange={e => setAttendanceFilter(e.target.value)}
                                className="w-full border border-[#9aaa8a] bg-white rounded-md px-4 py-2 text-sm outline-none"
                            >
                                <option value="all">Filtrar por asistencia</option>
                                <option value="si">Confirmados (Si)</option>
                                <option value="no">Cancelados (No)</option>
                            </select>
                            <label className="flex items-center gap-3 text-sm text-[#556b4e] cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={onlyIntolerances}
                                    onChange={e => setOnlyIntolerances(e.target.checked)}
                                    className="rounded border-[#9aaa8a] text-[#6f7f60] focus:ring-[#6f7f60]"
                                />
                                <span className="font-medium">Solo con intolerancias</span>
                            </label>
                        </div>
                    </div>

                    {/* TABLA: Actualizada con columna de Acompañantes */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-[#dce6d4]">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-[10px] md:text-xs tracking-widest uppercase text-[#556b4e] font-bold">
                                            Titular
                                        </th>
                                        <th className="px-4 py-3 text-center text-[10px] md:text-xs tracking-widest uppercase text-[#556b4e] font-bold">
                                            Estado
                                        </th>
                                        <th className="px-4 py-3 text-center text-[10px] md:text-xs tracking-widest uppercase text-[#556b4e] font-bold">
                                            Pax
                                        </th>
                                        <th className="px-4 py-3 text-left text-[10px] md:text-xs tracking-widest uppercase text-[#556b4e] font-bold">
                                            Acompañantes
                                        </th>
                                        <th className="px-4 py-3 text-left text-[10px] md:text-xs tracking-widest uppercase text-[#556b4e] font-bold">
                                            Alergias / Intolerancias
                                        </th>
                                        <th className="px-4 py-3 text-left text-[10px] md:text-xs tracking-widest uppercase text-[#556b4e] font-bold">
                                            Mensaje
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {filteredConfirmations.length > 0 ? (
                                        filteredConfirmations.map((c, index) => (
                                            <tr key={index} className="hover:bg-[#f5f7f3] transition-colors align-top">
                                                {/* Nombre Titular */}
                                                <td className="px-4 py-4 min-w-[140px]">
                                                    <div className="text-sm font-bold text-gray-900">{c.nombre}</div>
                                                    <div className="text-[10px] text-gray-400">{c.user?.email || '—'}</div>
                                                </td>

                                                {/* Asistencia */}
                                                <td className="px-4 py-4 text-center">
                                                    {c.asistencia === 'si' ? (
                                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800 uppercase">Si</span>
                                                    ) : (
                                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 uppercase">No</span>
                                                    )}
                                                </td>

                                                {/* Número total */}
                                                <td className="px-4 py-4 text-center font-bold text-gray-700">
                                                    {c.asistentes || 1}
                                                </td>

                                                {/* NUEVA COLUMNA: Nombres de acompañantes */}
                                                <td className="px-4 py-4 min-w-[180px]">
                                                {
                                                (() => {
                                                    let nombres = [];

                                                    if (Array.isArray(c.nombres_asistentes)) {
                                                        nombres = c.nombres_asistentes;
                                                    } else if (typeof c.nombres_asistentes === "string") {
                                                        try {
                                                            nombres = JSON.parse(c.nombres_asistentes);
                                                        } catch {
                                                            nombres = [];
                                                        }
                                                    }

                                                    return nombres.length > 0 ? (
                                                        nombres.map((n, i) => (
                                                            <div key={i} className="text-sm text-gray-700">{n}</div>
                                                        ))
                                                    ) : (
                                                        <span className="text-gray-300 italic text-xs">—</span>
                                                    );
                                                })()
                                                }
                                                </td>

                                                {/* Alergias resaltadas */}
                                                <td className="px-4 py-4 min-w-[200px]">
                                                    {c.intolerancias ? (
                                                        <div className="text-sm text-orange-900 bg-orange-50 p-2 rounded border border-orange-100 italic">
                                                            {c.intolerancias}
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-300 italic text-sm">Ninguna</span>
                                                    )}
                                                </td>

                                                {/* Mensaje */}
                                                <td className="px-4 py-4 min-w-[200px] text-sm text-gray-600 italic leading-relaxed">
                                                    {c.mensaje || <span className="text-gray-300">—</span>}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-4 py-10 text-center text-gray-400 italic">
                                                No hay resultados que coincidan con la búsqueda.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}