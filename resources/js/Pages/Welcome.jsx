import { Head, Link } from '@inertiajs/react';
import SectionBlock from '@/Components/SectionBlock';
import CenteredSection from '@/Components/CenteredSection';
import HeroInvite from '@/Components/HeroInvite';
import Footer from '@/Components/Footer';
import NavBar from '@/Components/NavBar';
import Main from '@/components/Main';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Bienvenidos" />
            <NavBar />
            <Main />
            <SectionBlock
                            title="BIENVENIDOS A NUESTRO: “SÍ QUIERO”"
                            time="19:00"
                            place="¿NOS ACOMPAÑAS?"
                            day={"sábado, 6 de julio de 2024"}
                            mapUrl="https://maps.app.goo.gl/XNaK5LceMq2mWfs6A"
                            image="/boda_lucia/8.jpeg"
            />
            <CenteredSection
                title="Después de tantos años, llega uno de los momentos más especiales en nuestras vidas y seguro que queréis saber... "
                buttonText="CÓMO EMPEZÓ TODO"
                buttonLink="/nuestra-historia"
            />
            


            <HeroInvite
                subtitle="Para poder organizar todo de la mejor manera posible,"
                title="¡NO OLVIDES CONFIRMAR TU ASISTENCIA ANTES DEL 10 DE JUNIO DE 2026!"
                buttonText="Confirmar asistencia"
                buttonLink="/confirmar"
                backgroundImage="/boda_lucia/6.jpeg"
            />

            
             {auth.user ? (
                        <section className="py-20 px-6 bg-white">
                            <div className="max-w-3xl mx-auto text-center">
                                <h2 className="text-3xl font-serif mb-6">
                                    Un pequeño detalle
                                </h2>

                                <p className="mb-8 text-gray-700 leading-relaxed">
                                    Lo más importante es tu presencia, pero si quieres sumarle un extra a nuestra felicidad, os dejamos nuestro número de cuenta: 
                                </p>

                                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                                    <p className="font-semibold mb-2">Cuenta bancaria (IBAN)</p>
                                    <p className="tracking-widest text-lg mb-4">
                                    ES68 0081 0243 5300 0644 4757
                                    </p>

                                </div>

                                <p className="mt-10 italic text-gray-600">
                                    Gracias de corazón por acompañarnos y formar parte de este momento tan especial.
                                </p>
                            </div>
                        </section>
                    ) : (
                        <>
                            <p className="mt-10 italic text-gray-600 text-center px-6">
                                Gracias de corazón por acompañarnos y formar parte de este momento tan especial si decides hacerlo.
                            </p>
                            
                        </>
                    )}   
            

            
            <Footer />

        </>
    );
}
