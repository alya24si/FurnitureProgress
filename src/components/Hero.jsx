import { useState, useEffect } from 'react';
import HeroSection from '../Reusable/HeroSection';
import Container from '../Reusable/Container';
import Button from '../Reusable/Button';
import { useNavigate } from 'react-router-dom';

// ✅ HOOK BARU: Deteksi ukuran layar
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const Hero = () => {
  const navigate = useNavigate();
  const { width } = useWindowSize(); // ✅ Ambil lebar layar
  
  const isMobile = width < 768; // ✅ Deteksi mobile
  const isTablet = width >= 768 && width < 1024;

  return (
    <HeroSection style={styles.hero(isMobile)}>
      <Container style={styles.container(isMobile)}>
        <div style={styles.card(isMobile)}>
          <p style={styles.subtitle}>
            Furniture Premium & Membership Exclusive
          </p>

          <h1 style={styles.title(isMobile)}>
            Temukan Furniture <br />
            <span style={styles.titleHighlight}>Impian Rumah Anda</span>
          </h1>

          <p style={styles.description(isMobile)}>
            Belanja furniture berkualitas dan nikmati berbagai
            keuntungan member seperti voucher eksklusif,
            diskon khusus, dan promo menarik setiap bulan.
          </p>

          <div style={styles.buttonGroup(isMobile)}>
            <Button
              variant="primary"
              style={styles.btn(isMobile)}
              onClick={() => navigate('/products')}
            >
              BELI SEKARANG
            </Button>

            <button
              style={styles.memberBtn(isMobile)}
              onClick={() => navigate('/membership')}
            >
              ⭐ DAFTAR MEMBER
            </button>
          </div>
        </div>
      </Container>
    </HeroSection>
  );
};

// ✅ STYLES SEBAGAI FUNCTION (bisa terima parameter isMobile)
const styles = {
  hero: (isMobile) => ({
    minHeight: isMobile ? 'auto' : '650px',
    padding: isMobile ? '40px 0' : '80px 0',
    backgroundImage: isMobile
      ? "linear-gradient(135deg, #FDF2F4 0%, #F6E8EB 100%)" // Mobile: gradient only
      : `linear-gradient(to right, #FDF2F4 0%, rgba(253, 242, 244, 0.95) 45%, transparent 100%), url('/assets/images/living_room.png')`,
    backgroundSize: isMobile ? 'cover' : 'cover, contain',
    backgroundPosition: isMobile ? 'center' : 'center, right center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FDF2F4',
  }),

  container: (isMobile) => ({
    width: '100%',
    justifyContent: isMobile ? 'center' : 'flex-start',
    padding: isMobile ? '0 20px' : '0',
  }),

  card: (isMobile) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: isMobile ? '30px 25px' : '50px 60px',
    borderRadius: '20px',
    maxWidth: isMobile ? '100%' : '550px',
    width: '100%',
    boxShadow: isMobile 
      ? '0 10px 30px rgba(183, 110, 121, 0.15)' 
      : '0 20px 50px rgba(183, 110, 121, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    textAlign: isMobile ? 'center' : 'left',
  }),

  subtitle: {
    color: '#B76E79',
    fontWeight: '700',
    letterSpacing: '2px',
    marginBottom: '12px',
    fontSize: '11px',
    textTransform: 'uppercase',
  },

  title: (isMobile) => ({
    fontSize: isMobile ? '28px' : '44px',
    color: '#1F2937',
    marginBottom: '16px',
    lineHeight: '1.2',
    fontWeight: '800',
  }),

  titleHighlight: {
    background: 'linear-gradient(135deg, #B76E79 0%, #D4A574 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  description: (isMobile) => ({
    color: '#6B7280',
    lineHeight: '1.7',
    marginBottom: '24px',
    fontSize: isMobile ? '14px' : '15px',
  }),

  buttonGroup: (isMobile) => ({
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: isMobile ? 'center' : 'flex-start',
    flexDirection: isMobile ? 'column' : 'row',
  }),

  btn: (isMobile) => ({
    padding: isMobile ? '14px 24px' : '16px 35px',
    background: 'linear-gradient(135deg, #B76E79 0%, #D49AA5 100%)',
    boxShadow: '0 8px 20px rgba(183, 110, 121, 0.3)',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: isMobile ? '14px' : '15px',
    width: isMobile ? '100%' : 'auto',
  }),

  memberBtn: (isMobile) => ({
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    border: 'none',
    padding: isMobile ? '14px 24px' : '16px 35px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    color: '#5C3D2E',
    boxShadow: '0 8px 20px rgba(255, 215, 0, 0.3)',
    fontSize: isMobile ? '14px' : '15px',
    width: isMobile ? '100%' : 'auto',
  }),
};

export default Hero;