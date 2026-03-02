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
            header={
                <h2 className="font-serif text-xl md:text-2xl text-[#556b4e]">
                    Panel de confirmaciones
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Estadísticas: 2 columnas en móvil, 5 en escritorio */}
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

                            <label className="flex items-center gap-3 text-sm text-[#556b4e] cursor-pointer bg-white md:bg-transparent p-2 md:p-0 rounded-md border md:border-0 border-[#9aaa8a]">
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

                    {/* Tabla con scroll horizontal para móvil */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-[#dce6d4]">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-[10px] md:text-xs tracking-widest uppercase text-[#556b4e] font-bold">
                                            Nombre Invitado
                                        </th>
                                        <th className="px-4 py-3 text-left text-[10px] md:text-xs tracking-widest uppercase text-[#556b4e] font-bold">
                                            Asistencia
                                        </th>
                                        <th className="px-4 py-3 text-center text-[10px] md:text-xs tracking-widest uppercase text-[#556b4e] font-bold">
                                            Pax
                                        </th>
                                        <th className="px-4 py-3 text-left text-[10px] md:text-xs tracking-widest uppercase text-[#556b4e] font-bold">
                                            Alergias / Notas
                                        </th>
                                        <th className="px-4 py-3 text-left text-[10px] md:text-xs tracking-widest uppercase text-[#556b4e] font-bold">
                                            Mensaje
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {filteredConfirmations.length > 0 ? (
                                        filteredConfirmations.map((c, index) => (
                                            <tr key={index} className="hover:bg-[#f5f7f3] transition-colors">
                                                <td className="px-4 py-3">
                                                    <div className="text-sm font-medium text-gray-900">{c.nombre}</div>
                                                    <div className="text-xs text-gray-500">{c.user?.email || 'Sin cuenta'}</div>
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    {c.asistencia === 'si' ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            SÍ
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                            NO
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-center text-sm text-gray-600 font-bold">
                                                    {c.asistentes ?? '—'}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600 max-w-[200px] truncate md:whitespace-normal">
                                                    {c.intolerancias || <span className="text-gray-300 italic">Ninguna</span>}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-500 italic max-w-[150px] truncate">
                                                    {c.mensaje || '—'}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-4 py-10 text-center text-gray-400 italic">
                                                No se han encontrado invitados con estos filtros
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