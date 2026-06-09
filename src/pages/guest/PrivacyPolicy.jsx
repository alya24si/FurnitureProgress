const PrivacyPolicy = () => {
  return (
    <div style={styles.container}>

      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <div style={styles.card}>

        <div style={styles.header}>
          <p style={styles.badge}>Alya Furniture</p>

          <h1 style={styles.title}>
            Kebijakan Privasi
          </h1>

          <p style={styles.subtitle}>
            Kami menjaga keamanan dan kenyamanan seluruh customer
            dalam menggunakan layanan website Alya Furniture.
          </p>
        </div>

        <div style={styles.section}>
          <div style={styles.number}>01</div>

          <div>
            <h2 style={styles.heading}>
              Informasi yang Dikumpulkan
            </h2>

            <p style={styles.text}>
              Kami dapat mengumpulkan beberapa data customer seperti
              nama, email, nomor telepon, alamat, serta riwayat transaksi
              untuk kebutuhan pelayanan dan pengelolaan membership.
            </p>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.number}>02</div>

          <div>
            <h2 style={styles.heading}>
              Penggunaan Data
            </h2>

            <p style={styles.text}>
              Data customer digunakan untuk proses pemesanan produk,
              pengiriman barang, layanan customer service,
              newsletter promo, serta peningkatan kualitas layanan website.
            </p>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.number}>03</div>

          <div>
            <h2 style={styles.heading}>
              Keamanan Data
            </h2>

            <p style={styles.text}>
              Alya Furniture menjaga keamanan data customer dan tidak
              menyebarkan informasi pribadi kepada pihak lain tanpa izin customer.
            </p>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.number}>04</div>

          <div>
            <h2 style={styles.heading}>
              Cookies dan Aktivitas Website
            </h2>

            <p style={styles.text}>
              Website dapat menggunakan cookies untuk membantu
              meningkatkan pengalaman pengguna dan menganalisis aktivitas website.
            </p>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.number}>05</div>

          <div>
            <h2 style={styles.heading}>
              Persetujuan Pengguna
            </h2>

            <p style={styles.text}>
              Dengan menggunakan website Alya Furniture,
              customer dianggap telah menyetujui kebijakan privasi ini.
            </p>
          </div>
        </div>

        <div style={styles.footer}>
          © 2026 Alya Furniture — All Rights Reserved
        </div>

      </div>

    </div>
  );
};

const styles = {

  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #F5F3FF, #EFE7FF)',
    padding: '70px 20px',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  },

  glow1: {
    position: 'absolute',
    width: '350px',
    height: '350px',
    background: '#C4B5FD',
    borderRadius: '50%',
    filter: 'blur(120px)',
    top: '-80px',
    left: '-80px',
    opacity: 0.5
  },

  glow2: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    background: '#DDD6FE',
    borderRadius: '50%',
    filter: 'blur(120px)',
    bottom: '-100px',
    right: '-50px',
    opacity: 0.5
  },

  card: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: '950px',
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(12px)',
    padding: '55px',
    borderRadius: '35px',
    boxShadow: '0 20px 60px rgba(109, 40, 217, 0.12)',
    border: '1px solid rgba(255,255,255,0.5)'
  },

  header: {
    marginBottom: '50px'
  },

  badge: {
    display: 'inline-block',
    background: '#E9D5FF',
    color: '#6D28D9',
    padding: '8px 18px',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '20px'
  },

  title: {
    fontSize: '52px',
    fontWeight: '700',
    color: '#4C1D95',
    marginBottom: '18px',
    lineHeight: '1.1'
  },

  subtitle: {
    fontSize: '18px',
    color: '#6B7280',
    lineHeight: '1.8',
    maxWidth: '700px'
  },

  section: {
    display: 'flex',
    gap: '25px',
    marginBottom: '40px',
    padding: '28px',
    background: '#FFFFFF',
    borderRadius: '24px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.04)',
    transition: '0.3s'
  },

  number: {
    minWidth: '65px',
    height: '65px',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    fontWeight: '700'
  },

  heading: {
    fontSize: '25px',
    color: '#111827',
    marginBottom: '12px',
    fontWeight: '700'
  },

  text: {
    fontSize: '17px',
    color: '#6B7280',
    lineHeight: '1.9'
  },

  footer: {
    marginTop: '50px',
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: '15px',
    borderTop: '1px solid #E5E7EB',
    paddingTop: '25px'
  }
};

export default PrivacyPolicy;