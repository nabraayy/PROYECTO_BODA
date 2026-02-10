import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatCard from '@/Components/StatCard';
import { useState } from 'react';



export default function Dashboard({ confirmed = [], notConfirmed = [], stats }) {


const [search, setSearch] = useState('');
const [onlyIntolerances, setOnlyIntolerances] = useState(false);
const [attendanceFilter, setAttendanceFilter] = useState('all'); // all | si | no
const allConfirmations = [...confirmed, ...notConfirmed];
const filteredConfirmations = allConfirmations.filter(c => {
    const matchesName =
        c.nombre.toLowerCase().includes(search.toLowerCase());

    const matchesIntolerances =
        !onlyIntolerances || (c.intolerancias && c.intolerancias.trim() !== '');

    const matchesAttendance =
        attendanceFilter === 'all' || c.asistencia === attendanceFilter;

    return matchesName && matchesIntolerances && matchesAttendance;
});
console.log(filteredConfirmations);

    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-serif text-2xl text-[#556b4e]">
                    Panel de confirmaciones
                </h2>
            }
        >
            
            <Head title="Dashboard" />
            

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
                        <StatCard title="Confirmaciones" value={stats.total} />
                        <StatCard title="Asisten" value={stats.yes} />
                        <StatCard title="No asisten" value={stats.no} />
                        <StatCard title="Con intolerancias" value={stats.intolerances} />
                        <StatCard title="Total asistentes" value={stats.guests} />
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold">Confirmaciones de Asistencia</h3>
                        </div>
                    </div>
                   <div className="bg-[#f5f7f3] border border-[#dce6d4] rounded-lg p-6 mb-10">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            
                            {/* Buscador */}
                            <input
                                type="text"
                                placeholder="Buscar por nombre..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="border border-[#9aaa8a] bg-white rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#6f7f60]"

                            />

                            {/* Filtro asistencia */}
                            <select
                                value={attendanceFilter}
                                onChange={e => setAttendanceFilter(e.target.value)}
                                className="border border-[#9aaa8a] bg-white rounded px-4 py-2"

                            >
                                <option value="all">Todos</option>
                                <option value="si">Asisten</option>
                                <option value="no">No asisten</option>
                            </select>

                            {/* Intolerancias */}
                           <label className="flex items-center gap-2 text-sm text-[#556b4e]">

                                <input
                                    type="checkbox"
                                    checked={onlyIntolerances}
                                    onChange={e => setOnlyIntolerances(e.target.checked)}
                                    className="border border-[#9aaa8a] bg-white rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#6f7f60]"

                                />
                                Solo con intolerancias
                            </label>
                        </div>
                    </div>


                    <div className="bg-white rounded-lg shadow overflow-hidden">
    <table className="min-w-full border border-gray-200">
        <thead className="bg-[#dce6d4]">
            <tr>
                <th className="px-4 py-3 text-left text-xs tracking-widest uppercase text-[#556b4e]"
>
                    Nombre
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Usuario
                </th>
                <th className="px-4 py-3 text-left text-xs tracking-widest uppercase text-[#556b4e]"
>
                    Asistencia
                </th>
                <th className="px-4 py-3 text-center text-xs tracking-widest uppercase text-[#556b4e]">
                    Nº asistentes
                </th>
                <th className="px-4 py-3 text-left text-xs tracking-widest uppercase text-[#556b4e]">
                    Intolerancias
                </th>
                <th className="px-4 py-3 text-left text-xs tracking-widest uppercase text-[#556b4e]">
                    Mensaje
                </th>
            </tr>
        </thead>

        <tbody>
            {filteredConfirmations.length > 0 ? (
                filteredConfirmations.map((c, index) => (
                    <tr
                        key={index}
                        className={`border-b ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        } hover:bg-[#f5f7f3] transition`}
                    >
                         <td className="px-4 py-3 text-gray-700">
                            {c.user ? c.user.email : '—'}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-800">
                            {c.nombre}
                        </td>
                       


                        <td className="px-4 py-3 text-center">
                            {c.asistencia === 'si' ? (
                                <span className="px-3 py-1 rounded text-sm bg-green-100 text-green-800">
                                    Asiste
                                </span>
                            ) : (
                                <span className="px-3 py-1 rounded text-sm bg-red-100 text-red-800">
                                    No asiste
                                </span>
                            )}
                        </td>

                        <td className="px-4 py-3 text-center">
                            {c.asistentes ?? '—'}
                        </td>

                        <td className="px-4 py-3">
                            {c.intolerancias || '—'}
                        </td>

                        <td className="px-4 py-3">
                            {c.mensaje || '—'}
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td
                        colSpan="5"
                        className="px-4 py-6 text-center text-gray-500"
                    >
                        No hay resultados con los filtros aplicados
                    </td>
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
