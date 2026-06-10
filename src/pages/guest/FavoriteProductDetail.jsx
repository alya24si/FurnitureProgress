import { useParams, useNavigate } from "react-router-dom";
import { FiStar, FiShoppingBag, FiArrowLeft } from "react-icons/fi";

function FavoriteProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const products = [
        {
            id: 1,
            name: 'Sofa Scandinavian Premium',
            category: 'Sofa',
            price: 'Rp 6.500.000',
            sold: 198,
            rating: 4.9,
            image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg',
        },

        {
            id: 2,
            name: 'Meja Makan Kayu Jati',
            category: 'Meja Makan',
            price: 'Rp 4.750.000',
            sold: 156,
            rating: 4.8,
            image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg',
        },

        {
            id: 3,
            name: 'Lemari Pakaian Minimalis',
            category: 'Lemari',
            price: 'Rp 8.250.000',
            sold: 121,
            rating: 4.9,
            image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
        },

        {
            id: 4,
            name: 'Rak Buku Modern',
            category: 'Rak Buku',
            price: 'Rp 2.850.000',
            sold: 184,
            rating: 4.7,
            image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
        },

        {
            id: 5,
            name: 'Kursi Santai Premium',
            category: 'Kursi',
            price: 'Rp 3.950.000',
            sold: 143,
            rating: 4.8,
            image: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg',
        },

        {
            id: 6,
            name: 'Tempat Tidur Kayu Solid',
            category: 'Tempat Tidur',
            price: 'Rp 9.500.000',
            sold: 96,
            rating: 5.0,
            image: 'https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg',
        },
    ];

    const product = products.find(
        (item) => item.id === Number(id)
    );

    if (!product) {
        return (
            <div className="p-10 text-center">
                Produk tidak ditemukan
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>

                <button
                    onClick={() => navigate("/favorite-products")}
                    style={styles.backButton}
                >
                    <FiArrowLeft />
                    Kembali ke Produk Favorit
                </button>

                <div style={styles.card}>

                    <div style={styles.content}>

                        <div>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={styles.image}
                            />
                        </div>

                        <div>

                            <div style={styles.category}>
                                {product.category}
                            </div>

                            <h1 style={styles.title}>
                                {product.name}
                            </h1>

                            <div style={styles.infoRow}>

                                <div style={styles.rating}>
                                    <FiStar />
                                    {product.rating}
                                </div>

                                <div style={styles.sold}>
                                    <FiShoppingBag />
                                    {product.sold} Terjual
                                </div>

                            </div>

                            <h2 style={styles.price}>
                                {product.price}
                            </h2>

                            <p style={styles.description}>
                                {product.description}
                            </p>

                            <div style={styles.featureGrid}>

                                <div style={styles.featureCard}>
                                    <h3 style={styles.featureTitle}>
                                        Material Premium
                                    </h3>
                                    <p style={styles.featureText}>
                                        Kayu pilihan berkualitas tinggi
                                    </p>
                                </div>

                                <div style={styles.featureCard}>
                                    <h3 style={styles.featureTitle}>
                                        Garansi
                                    </h3>
                                    <p style={styles.featureText}>
                                        Garansi resmi 2 tahun
                                    </p>
                                </div>

                                <div style={styles.featureCard}>
                                    <h3 style={styles.featureTitle}>
                                        Pengiriman
                                    </h3>
                                    <p style={styles.featureText}>
                                        Gratis area tertentu
                                    </p>
                                </div>

                                <div style={styles.featureCard}>
                                    <h3 style={styles.featureTitle}>
                                        Status
                                    </h3>
                                    <p style={styles.featureText}>
                                        Ready Stock
                                    </p>
                                </div>

                            </div>

                            <div style={styles.buttonGroup}>

                                <button
                                    style={styles.contactButton}
                                    onClick={() => navigate("/contact")}
                                >
                                    Hubungi Kami
                                </button>

                                <button style={styles.buyButton}>
                                    Beli Sekarang
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                <div style={styles.descriptionCard}>

                    <h2 style={styles.descriptionTitle}>
                        Deskripsi Produk
                    </h2>

                    <p style={styles.descriptionText}>
                        Produk furniture ini dirancang untuk memberikan kenyamanan,
                        estetika, dan daya tahan terbaik. Menggunakan material premium
                        dengan desain modern minimalis yang cocok digunakan pada rumah,
                        apartemen, maupun ruang kerja.
                    </p>

                </div>

            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        background: "#F8F5F0",
        padding: "40px",
    },

    wrapper: {
        maxWidth: "1200px",
        margin: "0 auto",
    },

    backButton: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: "#5D4037",
        fontWeight: "600",
        marginBottom: "25px",
        fontSize: "16px",
    },

    card: {
        background: "#fff",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
    },

    content: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        padding: "35px",
    },

    image: {
        width: "100%",
        height: "600px",
        objectFit: "cover",
        borderRadius: "20px",
    },

    category: {
        display: "inline-block",
        background: "#F5E6CA",
        color: "#8B5E3C",
        padding: "8px 16px",
        borderRadius: "999px",
        fontWeight: "700",
        marginBottom: "20px",
    },

    title: {
        fontSize: "42px",
        fontWeight: "700",
        color: "#3E2723",
        marginBottom: "20px",
        lineHeight: "1.3",
    },

    infoRow: {
        display: "flex",
        gap: "20px",
        marginBottom: "20px",
        alignItems: "center",
    },

    rating: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: "#F59E0B",
        fontWeight: "600",
    },

    sold: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: "#6B7280",
    },

    price: {
        fontSize: "44px",
        fontWeight: "700",
        color: "#B8860B",
        marginBottom: "25px",
    },

    description: {
        color: "#6B7280",
        lineHeight: "1.8",
        marginBottom: "30px",
    },

    featureGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: "15px",
        marginBottom: "30px",
    },

    featureCard: {
        background: "#FAFAFA",
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        padding: "18px",
    },

    featureTitle: {
        fontWeight: "700",
        color: "#3E2723",
        marginBottom: "8px",
    },

    featureText: {
        color: "#6B7280",
        fontSize: "14px",
    },

    buttonGroup: {
        display: "flex",
        gap: "15px",
    },

    contactButton: {
        flex: 1,
        padding: "14px",
        borderRadius: "12px",
        border: "2px solid #8B5E3C",
        background: "#fff",
        color: "#8B5E3C",
        fontWeight: "600",
        cursor: "pointer",
    },

    buyButton: {
        flex: 1,
        padding: "14px",
        borderRadius: "12px",
        border: "none",
        background: "#8B5E3C",
        color: "#fff",
        fontWeight: "600",
        cursor: "pointer",
    },

    descriptionCard: {
        background: "#fff",
        marginTop: "30px",
        padding: "30px",
        borderRadius: "24px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    },

    descriptionTitle: {
        fontSize: "28px",
        fontWeight: "700",
        color: "#3E2723",
        marginBottom: "15px",
    },

    descriptionText: {
        color: "#6B7280",
        lineHeight: "1.9",
    },
};

export default FavoriteProductDetail;