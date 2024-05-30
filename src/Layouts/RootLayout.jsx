import Navbar from "../Shared/Navbar/Navbar";
import BottomNav from "../Shared/Navbar/BottomNav";
import Footer from "../Shared/Footer/Footer";
import { CartProvider } from "../Context/cartContext";


const RootLayout = ({ children }) => {
    return (
        <CartProvider>
        <main className="">

            <div className="max-w-[1200px] mx-auto">
            <Navbar />
            </div>
            {/* <BottomNav /> */}
            <section className="max-w-[1200px] mx-auto">
                {children}
            </section>
            <div className="">
                <Footer />
            </div>
        </main>
        </CartProvider>
    );
};

export default RootLayout;