export default function StatCard({ title, value }) {
    return (
        <div className="bg-[#f5f7f3] border border-[#dce6d4] rounded-lg p-6 text-center">
            <p className="text-sm tracking-widest uppercase text-[#7a8a70] mb-2">
                {title}
            </p>
            <p className="text-3xl font-serif text-[#556b4e]">
                {value}
            </p>
        </div>
    );
}
