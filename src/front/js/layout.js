import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import Home from "./pages/pagesCliente/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import NavbarComponent, { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Informaciones from "./pages/pagesCliente/informaciones";
import Contacto from "./pages/pagesCliente/contacto";
import Envios from "./pages/pagesCliente/envios";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <NavbarComponent/>
                    <Routes>
                        <Route element={<Home />} path="/" /> {/* inicio-productos */}
                        <Route element={<Informaciones />} path="/informaciones" />
                        <Route element={<Contacto />} path="/contacto" />
                        <Route element={<Envios />} path="/envios" />

                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
