import { Inter } from "next/font/google";
import "./globals.css"; 
import SideNav from "./dashboard/_components/SideNav";
import Header from "./dashboard/_components/Header";
import { AlertProvider } from "./_context/AlertContext";
import Alert from "./_components/Alert";
import { ThemeProvider } from "./_context/ThemeContext"; 
import { DataProvider } from "./_context/DataContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AlertProvider>
          <ThemeProvider> 
            <DataProvider >
            <div>
              <div className="md:w-64 fixed hidden md:block">
                <SideNav />
              </div>
              <div className="md:ml-64">
                {/* <Header /> */}
                <Alert />
                {children}
              </div>
            </div>
            </DataProvider>
          </ThemeProvider>
        </AlertProvider>
      </body>
    </html>
  );
}
