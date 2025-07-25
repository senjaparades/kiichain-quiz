import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Providers from '@/app/providers';
import ClientWrapper from '@/components/ClientWrapper';
import { AudioProvider } from '@/components/AudioContext';

// ✅ Tambahkan ini
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'KiiQuiz',
  description: 'Explore Kiichain through fun quizzes!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-blue-900 text-yellow-500 antialiased flex flex-col min-h-screen font-sans">
        <Providers>
          <AudioProvider>
            <ClientWrapper>
              <Header />
              <main className="container-center pt-10 animate-fade-up">
                {children}
              </main>
              <Footer />

              {/* ✅ ToastContainer ditambahkan di sini agar global */}
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
            </ClientWrapper>
          </AudioProvider>
        </Providers>
      </body>
    </html>
  );
}
