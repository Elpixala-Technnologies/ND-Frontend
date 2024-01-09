import Navbar from "../Shared/Navbar/Navbar";
import BottomNav from "../Shared/Navbar/BottomNav";
import Footer from "../Shared/Footer/Footer";


const RootLayout = ({ children }) => {
    return (
        <main>
            <Navbar />
            <BottomNav />
            <section>
                {children}
            </section>
            <div>
                <Footer />
            </div>
        </main>
    );
};

export default RootLayout;