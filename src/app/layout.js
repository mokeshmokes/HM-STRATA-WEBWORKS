import './globals.css';
import 'aos/dist/aos.css';
import { ReduxProvider } from '@/redux/provider';

export const metadata = {
  title: 'HMW WebWorks - Professional Web Design & Development Agency',
  description: 'Professional website design, development, branding & digital solutions. We build stunning websites that grow businesses.',
  keywords: 'web design, web development, SEO, digital marketing, branding, UI/UX design',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
