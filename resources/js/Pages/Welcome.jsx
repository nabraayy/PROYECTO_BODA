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

             <div style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '2rem', color: '#556b4e', marginBottom: '20px' }}>hola</h3>
                
            </div>
            
            <Footer />

        </>
    );
}
