const About = () => {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1>Tentang FurnitureKu</h1>
        <p>
          Kami menghadirkan berbagai pilihan furniture modern,
          minimalis, dan berkualitas tinggi untuk menciptakan rumah
          impian yang nyaman dan elegan.
        </p>
      </div>

      <div style={styles.stats}>
        <div style={styles.card}>
          <h2>5000+</h2>
          <p>Pelanggan</p>
        </div>

        <div style={styles.card}>
          <h2>250+</h2>
          <p>Produk</p>
        </div>

        <div style={styles.card}>
          <h2>10+</h2>
          <p>Tahun Pengalaman</p>
        </div>

        <div style={styles.card}>
          <h2>98%</h2>
          <p>Kepuasan Pelanggan</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2>Visi Kami</h2>
        <p>
          Menjadi toko furniture terpercaya yang menyediakan produk
          berkualitas dengan pelayanan terbaik.
        </p>
      </div>

      <div style={styles.section}>
        <h2>Misi Kami</h2>

        <ul>
          <li>Menyediakan furniture berkualitas premium</li>
          <li>Memberikan pelayanan terbaik</li>
          <li>Mengutamakan kepuasan pelanggan</li>
          <li>Menghadirkan desain modern dan elegan</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "80px 10%",
  },
  hero: {
    textAlign: "center",
    marginBottom: "60px",
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "60px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,.1)",
  },
  section: {
    marginBottom: "40px",
  },
};

export default About;