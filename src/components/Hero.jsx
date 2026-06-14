import HeroSection from '../Reusable/HeroSection';
import Container from '../Reusable/Container';
import Button from '../Reusable/Button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <HeroSection style={styles.hero}>
      <Container style={styles.container}>
        <div style={styles.card}>
          <p style={styles.subtitle}>
            Furniture Premium & Membership Exclusive
          </p>

          <h1 style={styles.title}>
            Temukan Furniture <br />
            Impian Rumah Anda
          </h1>

          <p style={styles.description}>
            Belanja furniture berkualitas dan nikmati berbagai
            keuntungan member seperti voucher eksklusif,
            diskon khusus, dan promo menarik setiap bulan.
          </p>

          <div style={styles.buttonGroup}>
            <Button
              variant="primary"
              style={styles.btn}
              onClick={() => navigate('/products')}
            >
              BELI SEKARANG
            </Button>

            <button
              style={styles.memberBtn}
              onClick={() =>
                navigate('/membership')
              }
            >
              ⭐ DAFTAR MEMBER
            </button>
          </div>
        </div>
      </Container>
    </HeroSection>
  );
};

const styles = {
  hero: {
    height: '80vh',
    minHeight: '600px',
    backgroundImage:
      "url('/assets/images/living_room.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
  },

  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  card: {
    backgroundColor: '#fff',
    padding: '60px',
    borderRadius: '20px',
    maxWidth: '600px',
    boxShadow: '0 10px 30px rgba(0,0,0,.1)',
  },

  subtitle: {
    color: '#8B5E3C',
    fontWeight: '700',
    letterSpacing: '2px',
    marginBottom: '15px',
  },

  title: {
    fontSize: '50px',
    color: '#333',
    marginBottom: '15px',
  },

  description: {
    color: '#666',
    lineHeight: '1.8',
    marginBottom: '30px',
  },

  buttonGroup: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
  },

  btn: {
    padding: '16px 35px',
  },

  memberBtn: {
    background: '#FFD700',
    border: 'none',
    padding: '16px 35px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '700',
  },
};

export default Hero;