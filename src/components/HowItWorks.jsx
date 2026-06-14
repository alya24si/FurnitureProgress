import { FiLock, FiBox, FiHome } from 'react-icons/fi';
import FeatureSection from '../Reusable/FeatureSection';
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <FiLock />,
      title: '1. Pilih Furniture Favorit',
      description:
        'Temukan furniture yang sesuai kebutuhan rumah Anda.',
    },

    {
      icon: <FiBox />,
      title: '2. Lakukan Pemesanan',
      description:
        'Pesan furniture dengan mudah dan aman.',
    },

    {
      icon: <FiHome />,
      title: '3. Furniture Dikirim',
      description:
        'Produk dikirim langsung ke alamat Anda.',
    },

    {
      icon: <FiLock />,
      title: '4. Daftar Membership',
      description:
        'Dapatkan voucher dan diskon eksklusif member.',
      membership: true,
    },
  ];

  return (
    <FeatureSection style={styles.section}>
      <div className="container text-center">
        <h2 className="section-title">
          Cara Berbelanja
        </h2>

        <p className="section-subtitle">
          Proses pembelian furniture yang mudah,
          cepat, dan aman.
        </p>

        <div style={styles.grid}>
          {steps.map((step, index) => (
            <div
              key={index}
              style={styles.card}
            >
              <div style={styles.iconWrapper}>
                {step.icon}
              </div>

              <h3 style={styles.title}>
                {step.title}
              </h3>

              <p style={styles.description}>
                {step.description}
              </p>

              {step.membership && (
                <button
                  style={styles.memberBtn}
                  onClick={() =>
                    navigate('/membership')
                  }
                >
                  Daftar Sekarang
                </button>
              )}
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
    gridTemplateColumns:
      'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginTop: '48px',
  },

  card: {
    padding: '32px',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow:
      '0 8px 20px rgba(0,0,0,0.08)',
    transition: '0.3s',
  },

  iconWrapper: {
    fontSize: '48px',
    color: '#6E39CB',
    marginBottom: '24px',
  },

  title: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#333',
  },

  description: {
    fontSize: '15px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '20px',
  },

  memberBtn: {
  background: '#C8A97E',
  color: '#fff',
  border: 'none',
  padding: '12px 20px',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: '600',
  width: '100%',
  transition: '0.3s ease',
},
};

export default HowItWorks;