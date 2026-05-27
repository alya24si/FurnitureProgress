import Card from '../../Reusable/Card';

function FavoriteProducts() {

  const favoriteProducts = [
    {
      id: 1,
      name: 'Sofa Scandinavian',
      price: 'Rp 6.500.000',
      sold: 98,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'
    },
    {
      id: 2,
      name: 'Meja Kayu Minimalis',
      price: 'Rp 3.200.000',
      sold: 124,
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85'
    },
    {
      id: 3,
      name: 'Lemari Pakaian Jati',
      price: 'Rp 8.000.000',
      sold: 74,
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85'
    },
  ];

  return (
    <div>
      <h1 className="admin-page-title">
        Produk Paling Diminati
      </h1>

      <p
        style={{
          color: '#667085',
          marginBottom: '24px'
        }}
      >
        Daftar produk yang paling sering dibeli customer.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))',
          gap: '20px',
        }}
      >
        {favoriteProducts.map((item) => (
          <Card
            key={item.id}
            style={{
              padding: '16px',
              borderRadius: '16px',
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: '100%',
                height: '180px',
                objectFit: 'cover',
                borderRadius: '12px',
                marginBottom: '14px',
              }}
            />

            <h3
              style={{
                fontSize: '18px',
                marginBottom: '8px',
              }}
            >
              {item.name}
            </h3>

            <p
              style={{
                color: '#6E39CB',
                fontWeight: '700',
                marginBottom: '8px',
              }}
            >
              {item.price}
            </p>

            <div
              style={{
                background: '#EDE4F9',
                color: '#6E39CB',
                display: 'inline-block',
                padding: '6px 12px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '600',
              }}
            >
              {item.sold} terjual
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FavoriteProducts;