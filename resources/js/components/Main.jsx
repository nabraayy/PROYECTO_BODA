import React from 'react';

export default function Main() {

    return (
        <>
            <style>
                {`
                    .home-container {
                        height: 100vh;
                        width: 100%;
                        background-image: url('/boda_lucia/3.jpeg');
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;

                        display: flex;
                        justify-content: center;
                        align-items: center;

                        position: relative;
                        color: white;
                        font-family: 'Georgia', serif;
                    }

                    /* overlay opcional si quieres oscurecer */
                    .home-overlay {
                        position: absolute;
                        inset: 0;
                        background: rgba(0, 0, 0, 0.25);
                    }

                    .center-text {
                        position: relative; /* para estar encima del overlay */
                        text-align: center;
                        z-index: 2;
                    }

                    .center-text h1 {
                        font-size: 70px;
                        letter-spacing: 4px;
                        margin: 10px 0;
                    }

                    .center-text p {
                        font-size: 22px;
                        margin: 5px 0;
                    }
                `}
            </style>

            <div className="home-container">
                
                <div className="home-overlay"></div>

                <div className="center-text">
                    <p>¡Nos casamos!</p>
                    <h1>LUCIA Y ROMAN</h1>
                    <p>11 · 07 · 26</p>
                </div>

            </div>
        </>
    );
}

