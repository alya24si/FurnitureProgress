import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <h2>Memuat...</h2>;

  return (
    <div style={styles.container}>
      <Link to="/products" style={styles.back}>
        ← Kembali
      </Link>

      <div style={styles.card}>
        <img
          src={product.thumbnail}
          alt={product.title}
          style={styles.image}
        />

        <div style={styles.info}>
          <h1>{product.title}</h1>

          <p style={styles.desc}>
            {product.description}
          </p>

          <h2 style={styles.price}>
            Rp {(product.price * 15000).toLocaleString("id-ID")}
          </h2>

          <div style={styles.box}>
            <p>
              <b>Stok:</b> {product.stock}
            </p>

            <p>
              <b>Rating:</b> ⭐ {product.rating}
            </p>

            <p>
              <b>Kategori:</b> {product.category}
            </p>
          </div>

          <button style={styles.button}>
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "90%",
    margin: "50px auto",
  },

  back: {
    textDecoration: "none",
    color: "#8B6B3E",
  },

  card: {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    alignItems: "center",
  },

  image: {
    width: "100%",
    borderRadius: "20px",
  },

  info: {
    display: "flex",
    flexDirection: "column",
  },

  desc: {
    lineHeight: "1.8",
    color: "#666",
  },

  price: {
    color: "#8B6B3E",
    margin: "20px 0",
    fontSize: "32px",
  },

  box: {
    background: "#F8F5F0",
    padding: "20px",
    borderRadius: "12px",
  },

  button: {
    marginTop: "20px",
    background: "#8B6B3E",
    color: "#fff",
    border: "none",
    padding: "15px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ProductDetail;