import './globals.css';
import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/navigation/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

export const metadata: Metadata = {
  title: 'African Basketball League - ABL',
  description:
    'La première ligue professionnelle de basketball en Afrique. Suivez les résultats, classements et statistiques des meilleures équipes du continent.',
  keywords: [
    'basketball',
    'africa',
    'league',
    'sports',
    'ABL',
    'african basketball',
    'basketball africain',
  ],
  authors: [{ name: 'African Basketball League' }],
  openGraph: {
    title: 'African Basketball League',
    description: 'La première ligue professionnelle de basketball en Afrique',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${bebasNeue.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
