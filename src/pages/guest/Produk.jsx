import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiSearch, FiShoppingCart } from "react-icons/fi";

function Produk() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/category/furniture")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleBuyNow = (product) => {
    const customer = localStorage.getItem("customer");

    if (!customer) {
      alert("Silahkan login terlebih dahulu!");
      navigate("/login-customer");
      return;
    }

    localStorage.setItem(
      "selectedProduct",
      JSON.stringify(product)
    );

    navigate("/payment-method");
  };

  return (
    <div>

      {/* SEARCH */}
      <div style={styles.searchBox}>
        <FiSearch />

        <input
          type="text"
          placeholder="Cari furniture..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* PRODUK */}
      <div style={styles.grid}>
        {filteredProducts.map((item) => (
          <div key={item.id} style={styles.card}>

            <img
              src={item.thumbnail}
              alt={item.title}
              style={styles.image}
            />

            <div style={styles.cardBody}>

              <h3>{item.title}</h3>

              <p style={styles.desc}>
                {item.description.substring(0, 70)}...
              </p>

              <h2 style={styles.price}>
                Rp {(item.price * 15000).toLocaleString("id-ID")}
              </h2>

              <div style={styles.buttonGroup}>

                <Link
                  to={`/products/${item.id}`}
                  style={styles.detailButton}
                >
                  Detail
                </Link>

                <button
                  style={styles.buyButton}
                  onClick={() => handleBuyNow(item)}
                >
                  <FiShoppingCart />
                  Beli Sekarang
                </button>

              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  searchBox: {
    width: "90%",
    maxWidth: "500px",
    margin: "40px auto",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "12px",
    background: "#fff",
  },

  input: {
    border: "none",
    outline: "none",
    width: "100%",
  },

  grid: {
    width: "90%",
    margin: "0 auto 80px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "25px",
  },

  card: {
    background: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
    transition: ".3s",
  },

  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
  },

  cardBody: {
    padding: "20px",
  },

  desc: {
    color: "#666",
    fontSize: "14px",
    marginTop: "10px",
  },

  price: {
    color: "#B76E79",
    margin: "15px 0",
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },

  detailButton: {
    flex: 1,
    textAlign: "center",
    textDecoration: "none",
    background: "#F6E8EB",
    color: "#B76E79",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "600",
  },

  buyButton: {
    flex: 1,
    border: "none",
    background: "#B76E79",
    color: "#fff",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
};

export default Produk;