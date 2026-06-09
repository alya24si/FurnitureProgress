import { FiLock, FiBox, FiHome } from 'react-icons/fi';
import FeatureSection from '../Reusable/FeatureSection';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FiLock />,
      title: '1. Pilih Furniture Favorit',
      description: 'Temukan berbagai pilihan furniture modern dengan kualitas terbaik untuk rumah Anda.'
    },
    {
      icon: <FiBox />,
      title: '2. Pengiriman Cepat & Aman',
      description: 'Pesanan dikemas dengan aman dan dikirim langsung dari gudang kami di Pekanbaru.'
    },
    {
      icon: <FiHome />,
      title: '3. Percantik Ruangan Anda',
      description: 'Ciptakan suasana rumah yang nyaman dan elegan dengan furniture pilihan terbaik.'
    }
  ];

  return (
    <FeatureSection style={styles.section}>
      <div className="container text-center">
        <h2 className="section-title">
          Cara Berbelanja
        </h2>

        <p className="section-subtitle">
          Proses pembelian furniture yang mudah, cepat, dan aman.
        </p>
        <div style={styles.grid}>
          {steps.map((step, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.iconWrapper}>
                {step.icon}
              </div>
              <h3 style={styles.title}>{step.title}</h3>
              <p style={styles.description}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </FeatureSection>
  );
};

const styles = {
  section: {
    padding: '80px 0',
    backgroundColor: 'var(--bg-light)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginTop: '48px',
  },
  card: {
    padding: '32px',
    backgroundColor: 'var(--bg-color)',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  },
  iconWrapper: {
    fontSize: '48px',
    color: 'var(--primary)',
    marginBottom: '24px',
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px',
    color: 'var(--text-dark)',
  },
  description: {
    fontSize: '15px',
    color: 'var(--text-light)',
    lineHeight: '1.6',
  }
};

export default HowItWorks;
