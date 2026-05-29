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
          <p style={styles.subtitle}>Koleksi Terbaru</p>

          <h1 style={styles.title}>
            Temukan Furniture <br /> Impian Rumah Anda
          </h1>

          <p style={styles.description}>
            Hadir dengan desain modern, minimalis, dan elegan
            untuk mempercantik ruang tamu, kamar tidur, hingga
            ruang kerja Anda dengan kualitas terbaik.
          </p>

          <Button
            variant="primary"
            className="btn btn-primary"
            style={styles.btn}
            onClick={() => navigate('/products')}
          >
            BELI SEKARANG
          </Button>
        </div>
      </Container>
    </HeroSection>
  );
};

const styles = {
  hero: {
    height: '80vh',
    minHeight: '600px',
    backgroundImage: `url('/assets/images/living_room.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end', /* Puts the card on the right side */
  },
  card: {
    backgroundColor: 'var(--bg-card)',
    padding: '60px',
    borderRadius: '8px',
    maxWidth: '540px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  },
  subtitle: {
    color: 'var(--text-dark)',
    fontWeight: '600',
    letterSpacing: '2px',
    marginBottom: '16px',
  },
  title: {
    color: 'var(--text-dark)',
    fontSize: '48px',
    fontWeight: '700',
    lineHeight: 1.2,
    marginBottom: '16px',
  },
  description: {
    color: 'var(--text-light)',
    fontSize: '16px',
    marginBottom: '32px',
    lineHeight: 1.5,
  },
  btn: {
    padding: '16px 48px',
    fontSize: '16px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    backgroundColor: 'var(--primary)',
  }
};

export default Hero;
