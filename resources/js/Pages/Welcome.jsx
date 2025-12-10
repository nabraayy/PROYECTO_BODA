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
                            title="Ceremonia"
                            time="19:00"
                            place="Convite"
                            address="Les Moreres, La Vall d'Uixó"
                            mapUrl="https://maps.app.goo.gl/XNaK5LceMq2mWfs6A"
                            image="/boda_lucia/8.jpeg"
            />
            <CenteredSection
                title="Ve cómo empezó todo"
                buttonText="Nuestra historia"
                buttonLink="/nuestra-historia"
            />
            


            <HeroInvite
                subtitle="Acompáñanos"
                title="¡Esperamos que puedas acompañarnos!"
                buttonText="Confirmar asistencia"
                buttonLink="/confirmar"
                backgroundImage="/boda_lucia/6.jpeg"
            />

            
            <Footer />

        </>
    );
}
