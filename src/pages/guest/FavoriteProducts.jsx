import Card from '../../Reusable/Card';
import { FiStar, FiShoppingBag } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
function FavoriteProducts() {
  const navigate = useNavigate();
  const favoriteProducts = [
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

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          Produk Furniture Favorit Pelanggan
        </h1>

        <p style={styles.subtitle}>
          Kumpulan furniture terlaris yang paling banyak dibeli dan
          mendapatkan rating terbaik dari pelanggan FurnitureKu.
        </p>

        <div style={styles.stats}>
          <div style={styles.statBox}>
            <h3>898+</h3>
            <span>Transaksi</span>
          </div>

          <div style={styles.statBox}>
            <h3>4.9</h3>
            <span>Rating Rata-rata</span>
          </div>

          <div style={styles.statBox}>
            <h3>95%</h3>
            <span>Pelanggan Puas</span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div style={styles.grid}>
        {favoriteProducts.map((item) => (
          <Card key={item.id} style={styles.card}>
            <div style={styles.imageWrapper}>
              <img
                src={item.image}
                alt={item.name}
                style={styles.image}
              />

              <div style={styles.badge}>
                {item.category}
              </div>
            </div>

            <div style={styles.content}>
              <h3 style={styles.productName}>
                {item.name}
              </h3>

              <div style={styles.rating}>
                <FiStar />
                <span>{item.rating}</span>
              </div>

              <p style={styles.price}>
                {item.price}
              </p>

              <div style={styles.footer}>
                <div style={styles.sold}>
                  <FiShoppingBag />
                  {item.sold} Terjual
                </div>

                <button
                  style={styles.button}
                  onClick={() =>
                    navigate(`/favorite-products/${item.id}`)
                  }
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
  },

  hero: {
    textAlign: 'center',
    marginBottom: '40px',
  },

  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#5D4037',
    marginBottom: '10px',
  },

  subtitle: {
    color: '#6B7280',
    maxWidth: '700px',
    margin: '0 auto 30px',
    lineHeight: '1.7',
  },

  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },

  statBox: {
    background: '#FFF8E7',
    padding: '20px 30px',
    borderRadius: '16px',
    minWidth: '180px',
    border: '1px solid #E5D3B3',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(320px,1fr))',
    gap: '25px',
  },

  card: {
    overflow: 'hidden',
    borderRadius: '20px',
    padding: 0,
    transition: '0.3s',
    border: '1px solid #E5E7EB',
  },

  imageWrapper: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '260px',
    objectFit: 'cover',
    display: 'block',
  },

  badge: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    background: '#6D4C41',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '30px',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },

  content: {
    padding: '20px',
  },

  productName: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#3E2723',
    lineHeight: '1.5',
    minHeight: '60px',
    marginBottom: '10px',
  },

  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#F59E0B',
    fontWeight: '600',
    marginBottom: '12px',
  },

  price: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#B8860B',
    marginBottom: '15px',
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sold: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    color: '#6B7280',
    fontSize: '14px',
  },

  button: {
    background: '#8B5E3C',
    color: '#fff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default FavoriteProducts;