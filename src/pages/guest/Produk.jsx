import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiSearch } from "react-icons/fi";

function Produk() {
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

              <Link
                to={`/products/${item.id}`}
                style={styles.button}
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  hero: {
    height: "450px",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  overlay: {
    background: "rgba(0,0,0,.45)",
    height: "100%",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 10%",
  },

  heroTitle: {
    fontSize: "52px",
    marginBottom: "10px",
  },

  heroText: {
    fontSize: "18px",
  },

  searchBox: {
    width: "90%",
    maxWidth: "500px",
    margin: "40px auto",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "10px",
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
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,.1)",
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
  },

  price: {
    color: "#8B6B3E",
    margin: "15px 0",
  },

  button: {
    display: "inline-block",
    background: "#8B6B3E",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    textDecoration: "none",
  },
};

export default Produk;