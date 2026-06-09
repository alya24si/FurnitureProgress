import ProductSection from '../Reusable/ProductSection';

const BrowseRange = () => {
  const categories = [
    {
      name: 'Ruang Makan',
      image: '/assets/images/dining_room.png'
    },
    {
      name: 'Ruang Tamu',
      image: '/assets/images/living_room.png'
    },
    {
      name: 'Kamar Tidur',
      image: '/assets/images/bedroom.png'
    }
  ];

  return (
    <ProductSection style={styles.section}>
      <div className="container">
        <h2 className="section-title">
          Kategori Furniture
        </h2>

        <p className="section-subtitle">
          Pilih furniture terbaik sesuai kebutuhan ruangan Anda.
        </p>

        <div style={styles.grid}>
          {categories.map((cat, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.imageWrapper}>
                <img src={cat.image} alt={cat.name} style={styles.image} />
              </div>
              <h3 style={styles.categoryName}>{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </ProductSection>
  );
};

const styles = {
  section: {
    padding: '80px 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
    marginTop: '40px',
  },
  card: {
    textAlign: 'center',
  },
  imageWrapper: {
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '24px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  },
  image: {
    width: '100%',
    height: '350px',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  categoryName: {
    fontSize: '20px',
    fontWeight: '600',
    color: 'var(--text-dark)',
  }
};

export default BrowseRange;
