import Layout from '../components/Layout'; // Assurez-vous que le chemin d'accès est correct
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
