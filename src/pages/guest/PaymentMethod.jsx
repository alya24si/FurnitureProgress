import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState("");
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const selectedProduct = JSON.parse(
      localStorage.getItem("selectedProduct")
    );

    if (!selectedProduct) {
      navigate("/products");
      return;
    }

    setProduct(selectedProduct);
  }, [navigate]);

  const methods = [
    {
      id: 1,
      title: "Transfer Bank",
      desc: "Pembayaran melalui rekening resmi",
      detail: "BCA • BRI • Mandiri",
      icon: "🏦",
    },
    {
      id: 2,
      title: "E-Wallet",
      desc: "Pembayaran digital cepat & praktis",
      detail: "DANA • OVO • GoPay • ShopeePay",
      icon: "📱",
    },
    {
      id: 3,
      title: "QRIS",
      desc: "Scan QR untuk pembayaran instan",
      detail: "Semua e-wallet support QRIS",
      icon: "🔳",
    },
    {
      id: 4,
      title: "Cash On Delivery",
      desc: "Bayar saat barang diterima",
      detail: "COD area tertentu",
      icon: "🚚",
    },
  ];

  const handlePayment = () => {
    if (!selectedMethod) {
      alert("Pilih metode pembayaran terlebih dahulu");
      return;
    }

    const customer = JSON.parse(
      localStorage.getItem("customer")
    );

    const orders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      customerName: customer?.name || customer?.email || "Customer",
      productName: product.title,
      price: product.price * 15000,
      quantity: qty,
      total: product.price * 15000 * qty,
      paymentMethod: selectedMethod,
      date: new Date().toLocaleDateString("id-ID"),
    };

    orders.push(newOrder);

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    alert("Pembayaran berhasil!");

    navigate("/");
  };

  if (!product) return null;

  const totalPrice =
    product.price * 15000 * qty;

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>

        <h1 style={styles.title}>
          Checkout Pembayaran
        </h1>

        {/* PRODUK */}
        <div style={styles.productCard}>
          <img
            src={product.thumbnail}
            alt={product.title}
            style={styles.productImage}
          />

          <div>
            <h2>{product.title}</h2>

            <p style={styles.price}>
              Rp {(product.price * 15000).toLocaleString("id-ID")}
            </p>

            <div style={styles.qtyBox}>
              <label>Jumlah :</label>

              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) =>
                  setQty(Number(e.target.value))
                }
                style={styles.qtyInput}
              />
            </div>
          </div>
        </div>

        {/* PAYMENT */}
        <h2 style={styles.sectionTitle}>
          Pilih Metode Pembayaran
        </h2>

        <div style={styles.cardContainer}>
          {methods.map((method) => (
            <div
              key={method.id}
              onClick={() =>
                setSelectedMethod(method.title)
              }
              style={{
                ...styles.card,
                border:
                  selectedMethod === method.title
                    ? "2px solid #B76E79"
                    : "2px solid transparent",
              }}
            >
              <div style={styles.icon}>
                {method.icon}
              </div>

              <h3>{method.title}</h3>

              <p>{method.desc}</p>

              <div style={styles.detailBox}>
                {method.detail}
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div style={styles.summary}>
          <h2>Total Pembayaran</h2>

          <h1 style={styles.totalPrice}>
            Rp {totalPrice.toLocaleString("id-ID")}
          </h1>

          <p>
            Metode :
            <strong>
              {" "}
              {selectedMethod || "-"}
            </strong>
          </p>

          <button
            style={styles.payButton}
            onClick={handlePayment}
          >
            Bayar Sekarang
          </button>
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "#F8F5F2",
    padding: "40px",
  },

  wrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  title: {
    textAlign: "center",
    color: "#B76E79",
    marginBottom: "40px",
  },

  productCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "20px",
    display: "flex",
    gap: "20px",
    marginBottom: "40px",
    boxShadow: "0 5px 20px rgba(0,0,0,.08)",
  },

  productImage: {
    width: "180px",
    height: "180px",
    objectFit: "cover",
    borderRadius: "15px",
  },

  price: {
    color: "#B76E79",
    fontSize: "24px",
    fontWeight: "700",
    marginTop: "10px",
  },

  qtyBox: {
    marginTop: "20px",
  },

  qtyInput: {
    width: "80px",
    padding: "10px",
    marginLeft: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  sectionTitle: {
    marginBottom: "20px",
    color: "#5D4037",
  },

  cardContainer: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "18px",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
  },

  icon: {
    fontSize: "40px",
    marginBottom: "15px",
  },

  detailBox: {
    marginTop: "10px",
    background: "#FCEEF1",
    padding: "10px",
    borderRadius: "10px",
    color: "#B76E79",
    fontWeight: "600",
  },

  summary: {
    marginTop: "40px",
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 5px 20px rgba(0,0,0,.08)",
  },

  totalPrice: {
    color: "#B76E79",
    margin: "15px 0",
  },

  payButton: {
    marginTop: "20px",
    background: "#B76E79",
    color: "#fff",
    border: "none",
    padding: "15px 40px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },
};

export default PaymentMethod;