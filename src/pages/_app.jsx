import Layout from '../components/Layout'; // Assurez-vous que le chemin d'accès est correct
import '../styles/globals.css';
import { DataProvider } from '@/context/context';

function MyApp({ Component, pageProps }) {
    return (
        <DataProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </DataProvider>
    );
}

export default MyApp;
