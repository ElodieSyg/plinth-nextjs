import Head from "next/head";
// COMPONENTS IMPORTATION
import Navbar from "../../component/layout/navbar/navbar";
import CatalogMap from "../../component/map/catalogMap";

const Catalogue = () => {
    return (
        <>
            <Head>
                <title>Plinth - Catalogue</title>
            </Head>

            <Navbar />
            {/* <CatalogMap /> */}
            Catalogue
        </>
    );
};

export default Catalogue;