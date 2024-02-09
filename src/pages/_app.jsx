import Layout from '../components/Layout'; // Assurez-vous que le chemin d'accès est correct
import '../styles/globals.css';
import { DataProvider } from '@/context/context';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

function MyApp({ Component, pageProps }) {
    return (
        <DataProvider>
            <Layout>
                <Component {...pageProps} />
                <Analytics />
                <SpeedInsights />
            </Layout>
        </DataProvider>
    );
}

export default MyApp;
