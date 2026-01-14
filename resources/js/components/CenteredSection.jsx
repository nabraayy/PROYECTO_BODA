// resources/js/Components/CenteredSection.jsx
import { Link } from '@inertiajs/react';

export default function CenteredSection({
    title,
    buttonText,
    buttonLink = '#',
    backgroundColor = '#dce6d4',
    lineColor = '#9aaa8a'
}) {
    return (
        <section
            style={{ backgroundColor }}
            className="py-24 px-6 text-center"
        >
            {/* Contenido centrado */}
            <div className="max-w-4xl mx-auto">
                
                {/* Líneas + texto */}
                <div className="flex items-center justify-center gap-6 md:gap-10 mb-12">
                    <span
                        className="hidden sm:block h-px w-24 opacity-70"
                        style={{ backgroundColor: lineColor }}
                    />

                    <h2
                        className="font-serif text-lg md:text-xl font-light leading-relaxed text-[#556b4e]"
                    >
                        {title}
                    </h2>

                    <span
                        className="hidden sm:block h-px w-24 opacity-70"
                        style={{ backgroundColor: lineColor }}
                    />
                </div>

                {/* Botón */}
                {buttonText && (
                    <Link
                        href={buttonLink}
                        className="inline-block bg-[#6f7f60] text-white text-lg font-light px-10 py-4 tracking-wide transition-all duration-300 hover:bg-[#5f6f52]"
                    >
                        {buttonText}
                    </Link>
                )}
            </div>
        </section>
    );
}
