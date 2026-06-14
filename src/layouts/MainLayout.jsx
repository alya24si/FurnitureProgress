import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaWhatsapp } from "react-icons/fa";

const MainLayout = () => {
  const whatsappNumber = "6281234567890"; // ganti dengan nomor admin toko

  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Halo%20FurnitureKu,%20saya%20ingin%20bertanya%20tentang%20produk`}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.whatsappButton}
      >
        <FaWhatsapp size={35} />
      </a>
    </>
  );
};

const styles = {
  whatsappButton: {
    position: "fixed",
    right: "25px",
    bottom: "25px",
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    backgroundColor: "#25D366",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
    zIndex: 9999,
    transition: "0.3s",
    cursor: "pointer",
  },
};

export default MainLayout;