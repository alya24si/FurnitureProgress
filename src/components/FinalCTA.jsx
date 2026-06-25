import Container from '../Reusable/Container';
import Button from '../Reusable/Button';
import { useNavigate } from 'react-router-dom';

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section style={styles.section}>
      <Container style={styles.container}>
        <div style={styles.content}>
          <p style={styles.preTitle}>SIAP MEMULAI?</p>
          <h2 style={styles.title}>
            Wujudkan Rumah Impian Anda <br />
            Bersama FurnitureKu
          </h2>
          <p style={styles.description}>
            Bergabunglah dengan ribuan member yang telah merasakan
            keuntungan berbelanja furniture premium dengan harga
            terbaik dan layanan eksklusif.
          </p>

          <div style={styles.buttonGroup}>
            <Button
              variant="primary"
              style={styles.btnPrimary}
              onClick={() => navigate('/membership')}
            >
              DAFTAR SEKARANG
            </Button>

            <button
              type="button"
              style={styles.btnSecondary}
              onClick={() => navigate('/membership')}
            >
              LIHAT KEUNTUNGAN MEMBER
            </button>
          </div>

          <p style={styles.trustText}>
            ✓ Gratis pendaftaran &nbsp; ✓ Garansi resmi &nbsp; ✓
            Pengiriman cepat
          </p>
        </div>
      </Container>
    </section>
  );
};

const styles = {
  section: {
    padding: '100px 0',
    background: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #C9A961 100%)',
    color: '#fff'
  },
  container: {
    textAlign: 'center'
  },
  content: {
    maxWidth: '700px',
    margin: '0 auto'
  },
  preTitle: {
    color: '#FFF8DC',
    fontWeight: '700',
    letterSpacing: '3px',
    marginBottom: '15px',
    fontSize: '14px'
  },
  title: {
    fontSize: '42px',
    marginBottom: '20px',
    lineHeight: '1.3',
    color: '#fff'
  },
  description: {
    fontSize: '18px',
    lineHeight: '1.8',
    marginBottom: '40px',
    color: '#FFF8DC',
    opacity: 0.95
  },
  buttonGroup: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '30px'
  },
  btnPrimary: {
    padding: '18px 40px',
    backgroundColor: '#fff',
    color: '#B8860B',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '16px'
  },
  btnSecondary: {
    padding: '18px 40px',
    backgroundColor: 'transparent',
    color: '#fff',
    border: '2px solid #fff',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '16px'
  },
  trustText: {
    fontSize: '14px',
    color: '#FFF8DC',
    opacity: 0.9
  }
};

export default FinalCTA;