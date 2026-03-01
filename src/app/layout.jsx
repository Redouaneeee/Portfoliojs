import { Inter } from 'next/font/google';
import './globals.css';
import { AnimatedBackground } from '@/app/components/AnimatedBackground';
import { Navbar } from '@/app/components/Navbar';
import { CustomCursor } from '@/app/components/CustomCursor';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Creative Developer Portfolio',
  description: 'Pushing the boundaries of web animation and design',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <CustomCursor />
        <AnimatedBackground />
        <div style={{ 
          position: 'relative', 
          zIndex: 1,  
          minHeight: '100vh',
          color: 'white'
        }}>
          <Navbar />
          <main style={{ position: 'relative', zIndex: 2 }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}