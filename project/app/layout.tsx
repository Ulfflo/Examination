import "./globals.css";
import { CartProvider } from "./contexts/cartContext"; 
import { TenantProvider } from "./contexts/tenantContext";
import { Fira_Sans } from "next/font/google";



const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${firaSans.className} bg-[#489078] min-h-screen m-0 p-0`}>
        <TenantProvider>
          <CartProvider>
            {children} 
          </CartProvider>
        </TenantProvider>
      </body>
    </html>
  );
}
