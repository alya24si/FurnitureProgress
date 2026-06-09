import { useState } from 'react';

const PaymentMethod = () => {

  const [selectedMethod, setSelectedMethod] = useState('');

  const methods = [
    {
      id: 1,
      title: 'Transfer Bank',
      desc: 'Pembayaran melalui rekening resmi Alya Furniture',
      detail: 'BCA • BRI • Mandiri',
      icon: '🏦',
    },

    {
      id: 2,
      title: 'E-Wallet',
      desc: 'Pembayaran digital cepat & praktis',
      detail: 'DANA • OVO • GoPay • ShopeePay',
      icon: '📱',
    },

    {
      id: 3,
      title: 'QRIS',
      desc: 'Scan QR untuk pembayaran instan',
      detail: 'Semua e-wallet support QRIS',
      icon: '🔳',
    },

    {
      id: 4,
      title: 'Cash On Delivery',
      desc: 'Bayar langsung saat barang diterima',
      detail: 'COD tersedia untuk area tertentu',
      icon: '🚚',
    }
  ];

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <h1 style={styles.title}>Metode Pembayaran</h1>

        <p style={styles.subtitle}>
          Pilih metode pembayaran favorit Anda
        </p>
      </div>

      <div style={styles.cardContainer}>

        {methods.map((method) => (

          <div
            key={method.id}
            onClick={() => setSelectedMethod(method.title)}
            style={{
              ...styles.card,
              border:
                selectedMethod === method.title
                  ? '2px solid #7C3AED'
                  : '2px solid transparent'
            }}
          >

            <div style={styles.icon}>
              {method.icon}
            </div>

            <h2 style={styles.cardTitle}>
              {method.title}
            </h2>

            <p style={styles.cardDesc}>
              {method.desc}
            </p>

            <div style={styles.detailBox}>
              {method.detail}
            </div>

          </div>
        ))}

      </div>

      {selectedMethod && (
        <div style={styles.selectedBox}>

          <h2 style={styles.selectedTitle}>
            Metode Dipilih
          </h2>

          <p style={styles.selectedText}>
            Anda memilih :
            <span style={styles.selectedMethod}>
              {' '}{selectedMethod}
            </span>
          </p>

        </div>
      )}

    </div>
  );
};

const styles = {

  container: {
    minHeight: '100vh',
    padding: '60px 30px',
    background: '#F5F3FF'
  },

  header: {
    textAlign: 'center',
    marginBottom: '50px'
  },

  title: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#6D28D9',
    marginBottom: '10px'
  },

  subtitle: {
    fontSize: '18px',
    color: '#666'
  },

  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  },

  card: {
    background: 'white',
    borderRadius: '30px',
    padding: '35px',
    cursor: 'pointer',
    transition: '0.3s',
    boxShadow: '0 8px 20px rgba(0,0,0,0.08)'
  },

  icon: {
    width: '80px',
    height: '80px',
    borderRadius: '20px',
    background: '#EDE9FE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    marginBottom: '25px'
  },

  cardTitle: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '15px',
    color: '#6D28D9'
  },

  cardDesc: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '20px',
    lineHeight: '1.6'
  },

  detailBox: {
    background: '#F3E8FF',
    padding: '15px',
    borderRadius: '16px',
    color: '#6D28D9',
    fontWeight: '600'
  },

  selectedBox: {
    maxWidth: '700px',
    margin: '50px auto 0',
    background: 'white',
    borderRadius: '25px',
    padding: '30px',
    textAlign: 'center',
    boxShadow: '0 8px 20px rgba(0,0,0,0.08)'
  },

  selectedTitle: {
    fontSize: '28px',
    color: '#6D28D9',
    marginBottom: '15px'
  },

  selectedText: {
    fontSize: '18px',
    color: '#555'
  },

  selectedMethod: {
    color: '#6D28D9',
    fontWeight: '700'
  }
};

export default PaymentMethod;