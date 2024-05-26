import Navbar from "../Shared/Navbar/Navbar";
import BottomNav from "../Shared/Navbar/BottomNav";
import Footer from "../Shared/Footer/Footer";
import { CartProvider } from "../Context/cartContext";


const RootLayout = ({ children }) => {
    return (
        <CartProvider>
        <main>

            <Navbar />
            {/* <BottomNav /> */}
            <section>
                {children}
            </section>
            <div>
                <Footer />
            </div>
        </main>
        </CartProvider>
    );
};

export default RootLayout;