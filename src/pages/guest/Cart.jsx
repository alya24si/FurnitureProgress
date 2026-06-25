import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiTrash2, FiShoppingCart, FiArrowLeft } from "react-icons/fi";

function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load cart dari localStorage
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(cart);
        setLoading(false);
    }, []);

    // Hitung total harga
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * 15000 * item.quantity,
        0
    );

    // Hapus item dari cart
    const handleRemoveItem = (productId) => {
        const updatedCart = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Update quantity
    const handleUpdateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCart = cartItems.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        );

        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Checkout
    const handleCheckout = () => {
        const customer = localStorage.getItem("customer");

        if (!customer) {
            localStorage.setItem("redirectAfterLogin", "/guest-checkout");
            alert("Silahkan login terlebih dahulu untuk checkout!");
            navigate("/login-customer");
            return;
        }

        if (cartItems.length === 0) {
            alert("Keranjang belanja kosong!");
            return;
        }

        // Simpan cart ke localStorage untuk digunakan di checkout
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        navigate("/guest-checkout");
    };

    if (loading) {
        return (
            <div style={styles.loading}>
                <div style={styles.spinner}></div>
                <p>Memuat keranjang...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => navigate(-1)} style={styles.backButton}>
                    <FiArrowLeft /> Kembali
                </button>
                <h1 style={styles.pageTitle}>
                    <FiShoppingCart style={{ marginRight: "10px" }} />
                    Keranjang Belanja
                </h1>
            </div>

            {cartItems.length === 0 ? (
                <div style={styles.emptyCart}>
                    <div style={styles.emptyIcon}>🛒</div>
                    <h2>Keranjang Belanja Kosong</h2>
                    <p>Yuk, mulai belanja furniture impian Anda!</p>
                    <Link to="/products" style={styles.shopButton}>
                        Mulai Belanja
                    </Link>
                </div>
            ) : (
                <div style={styles.content}>
                    {/* Cart Items */}
                    <div style={styles.cartItems}>
                        {cartItems.map((item) => (
                            <div key={item.id} style={styles.cartItem}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={styles.itemImage}
                                />

                                <div style={styles.itemInfo}>
                                    <h3 style={styles.itemTitle}>{item.title}</h3>
                                    <p style={styles.itemCategory}>{item.category}</p>
                                    <p style={styles.itemPrice}>
                                        Rp {(item.price * 15000).toLocaleString("id-ID")}
                                    </p>
                                </div>

                                <div style={styles.itemActions}>
                                    <div style={styles.quantityControl}>
                                        <button
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                            style={styles.qtyButton}
                                        >
                                            -
                                        </button>
                                        <span style={styles.qtyValue}>{item.quantity}</span>
                                        <button
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                            style={styles.qtyButton}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        style={styles.deleteButton}
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div style={styles.cartSummary}>
                        <h2 style={styles.summaryTitle}>Ringkasan Pesanan</h2>

                        <div style={styles.summaryRow}>
                            <span>Total Item</span>
                            <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} produk</span>
                        </div>

                        <div style={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
                        </div>

                        <div style={styles.summaryRow}>
                            <span>Ongkos Kirim</span>
                            <span style={styles.freeShipping}>GRATIS</span>
                        </div>

                        <div style={styles.divider}></div>

                        <div style={styles.totalRow}>
                            <span>Total Pembayaran</span>
                            <span style={styles.totalPrice}>Rp {totalPrice.toLocaleString("id-ID")}</span>
                        </div>

                        <button onClick={handleCheckout} style={styles.checkoutButton}>
                            Lanjutkan ke Checkout
                        </button>

                        <Link to="/products" style={styles.continueShopping}>
                            Lanjutkan Belanja
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "40px 20px",
    },
    header: {
        maxWidth: "1200px",
        margin: "0 auto 30px",
    },
    backButton: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 20px",
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
        marginBottom: "20px",
    },
    pageTitle: {
        fontSize: "32px",
        fontWeight: "700",
        color: "#111827",
        display: "flex",
        alignItems: "center",
    },
    loading: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: "16px",
    },
    spinner: {
        width: "40px",
        height: "40px",
        border: "4px solid #E5E7EB",
        borderTopColor: "#B76E79",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
    },
    content: {
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 400px",
        gap: "30px",
    },
    cartItems: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    cartItem: {
        background: "#fff",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        display: "flex",
        gap: "20px",
        alignItems: "center",
    },
    itemImage: {
        width: "120px",
        height: "120px",
        objectFit: "cover",
        borderRadius: "12px",
    },
    itemInfo: {
        flex: 1,
    },
    itemTitle: {
        fontSize: "18px",
        fontWeight: "700",
        color: "#111827",
        margin: "0 0 8px",
    },
    itemCategory: {
        fontSize: "14px",
        color: "#6B7280",
        margin: "0 0 8px",
    },
    itemPrice: {
        fontSize: "18px",
        fontWeight: "700",
        color: "#B76E79",
        margin: 0,
    },
    itemActions: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        alignItems: "flex-end",
    },
    quantityControl: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "#F3F4F6",
        padding: "8px 16px",
        borderRadius: "8px",
    },
    qtyButton: {
        width: "32px",
        height: "32px",
        border: "none",
        background: "#B76E79",
        color: "#fff",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    qtyValue: {
        fontSize: "16px",
        fontWeight: "600",
        minWidth: "32px",
        textAlign: "center",
    },
    deleteButton: {
        padding: "8px 16px",
        background: "#FEE2E2",
        color: "#DC2626",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    cartSummary: {
        background: "#fff",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        height: "fit-content",
        position: "sticky",
        top: "20px",
    },
    summaryTitle: {
        fontSize: "20px",
        fontWeight: "700",
        color: "#111827",
        marginBottom: "24px",
    },
    summaryRow: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "16px",
        fontSize: "15px",
        color: "#4B5563",
    },
    freeShipping: {
        color: "#10B981",
        fontWeight: "700",
    },
    divider: {
        height: "1px",
        background: "#E5E7EB",
        margin: "20px 0",
    },
    totalRow: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "24px",
        fontSize: "18px",
        fontWeight: "700",
    },
    totalPrice: {
        color: "#B76E79",
        fontSize: "24px",
    },
    checkoutButton: {
        width: "100%",
        padding: "16px",
        background: "#B76E79",
        color: "#fff",
        border: "none",
        borderRadius: "12px",
        fontSize: "16px",
        fontWeight: "700",
        cursor: "pointer",
        marginBottom: "12px",
    },
    continueShopping: {
        display: "block",
        textAlign: "center",
        padding: "12px",
        color: "#6B7280",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "500",
    },
    emptyCart: {
        textAlign: "center",
        padding: "80px 20px",
        background: "#fff",
        borderRadius: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    },
    emptyIcon: {
        fontSize: "80px",
        marginBottom: "20px",
    },
    shopButton: {
        display: "inline-block",
        padding: "14px 32px",
        background: "#B76E79",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "12px",
        fontWeight: "600",
        marginTop: "20px",
    },
};

// Add animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default Cart;