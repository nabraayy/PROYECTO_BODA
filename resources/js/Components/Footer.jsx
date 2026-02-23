// resources/js/Components/Footer.jsx

export default function Footer() {
    return (
        <footer
            style={{
                backgroundColor: '#dce6d4', // tono verde pastel de tu web
                padding: '40px 20px',
                textAlign: 'center',
                marginTop: '60px',
                borderTop: '1px solid #9aaa8a55'
            }}
        >
            <div
                style={{
                    fontFamily: 'serif',
                    fontSize: '1.2rem',
                    color: '#556b4e',
                    opacity: 0.8
                }}
            >
                L&R — 11/07/2026
            </div>

            <p
                style={{
                    fontSize: '0.9rem',
                    color: '#556b4e',
                    marginTop: '10px',
                    opacity: 0.7
                }}
            >
                Gracias por ser parte de nuestra historia
            </p>
        </footer>
    );
}
