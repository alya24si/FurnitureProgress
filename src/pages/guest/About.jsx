import { FiAward, FiHeart, FiStar, FiHome, FiShield, FiTruck, FiTarget, FiUsers } from 'react-icons/fi';

const About = () => {
  return (
    <div style={styles.container}>
      {/* HERO SECTION */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <span style={styles.badge}>✨ TENTANG FURNITUREKU</span>
          <h1 style={styles.heroTitle}>
            Mewujudkan Ruang Impian<br />
            <span style={styles.highlight}>dengan Sentuhan Elegan</span>
          </h1>
          <p style={styles.heroDesc}>
            FurnitureKu hadir untuk menghadirkan furniture premium berkualitas tinggi 
            yang memadukan estetika modern dengan kenyamanan maksimal. Kami percaya 
            setiap rumah memiliki cerita, dan kami di sini untuk membantu Anda menulisnya.
          </p>
        </div>
      </div>

{/* OUR STORY */}
<div style={styles.storySection}>
  <div style={styles.storyGrid}>
    {/* ✅ BAGIAN INI YANG MENAMPILKAN FOTO */}
    <div style={styles.storyImage}>
      <img 
        src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=600&fit=crop" 
        alt="Showroom FurnitureKu"
        style={styles.storyImg}
      />
      <div style={styles.storyImageOverlay}>
        <span style={styles.storyYear}>SEJAK 2014</span>
      </div>
    </div>
    
    <div style={styles.storyContent}>
      <span style={styles.sectionBadge}>KISAH KAMI</span>
      <h2 style={styles.storyTitle}>
        Lebih dari Sekadar Toko Furniture
      </h2>
      <p style={styles.storyText}>
        Berawal dari passion terhadap desain interior, FurnitureKu didirikan 
        dengan satu visi sederhana: menghadirkan furniture berkualitas premium 
        yang terjangkau untuk setiap rumah di Indonesia.
      </p>
      <p style={styles.storyText}>
        Selama lebih dari satu dekade, kami telah membantu ribuan keluarga 
        menciptakan ruang hidup yang nyaman, elegan, dan penuh karakter. 
        Setiap produk kami dipilih dengan cermat untuk memastikan kualitas, 
        estetika, dan daya tahan terbaik.
      </p>
      <div style={styles.storyFeatures}>
        <div style={styles.storyFeature}>
          <div style={styles.featureIcon}>✓</div>
          <div>
            <strong style={styles.featureTitle}>Material Premium</strong>
            <p style={styles.featureDesc}>Hanya menggunakan bahan berkualitas tinggi</p>
          </div>
        </div>
        <div style={styles.storyFeature}>
          <div style={styles.featureIcon}>✓</div>
          <div>
            <strong style={styles.featureTitle}>Desain Modern</strong>
            <p style={styles.featureDesc}>Trendi dan sesuai dengan gaya hidup masa kini</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* VISION & MISSION */}
      <div style={styles.vmSection}>
        <div style={styles.vmHeader}>
          <span style={styles.sectionBadge}>ARAH KAMI</span>
          <h2 style={styles.vmTitle}>Visi & Misi</h2>
        </div>
        <div style={styles.vmGrid}>
          {/* VISI */}
          <div style={styles.vmCard}>
            <div style={styles.vmIconBox}>
              <FiTarget size={36} />
            </div>
            <h3 style={styles.vmCardTitle}>Visi Kami</h3>
            <p style={styles.vmCardText}>
              Menjadi destinasi utama furniture terpercaya di Indonesia yang 
              menyediakan produk berkualitas dengan pelayanan terbaik, serta 
              menginspirasi setiap keluarga untuk menciptakan hunian impian.
            </p>
          </div>

          {/* MISI */}
          <div style={styles.vmCard}>
            <div style={styles.vmIconBox}>
              <FiHeart size={36} />
            </div>
            <h3 style={styles.vmCardTitle}>Misi Kami</h3>
            <ul style={styles.missionList}>
              <li>Menyediakan furniture berkualitas premium dengan harga terjangkau.</li>
              <li>Memberikan pelayanan pelanggan yang responsif dan personal.</li>
              <li>Menghadirkan desain modern yang fungsional dan elegan.</li>
              <li>Mengutamakan kepuasan dan kenyamanan setiap pelanggan.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div style={styles.whySection}>
        <div style={styles.whyHeader}>
          <span style={styles.sectionBadge}>KEUNGGULAN KAMI</span>
          <h2 style={styles.whyTitle}>Kenapa Memilih FurnitureKu?</h2>
          <p style={styles.whySubtitle}>
            Kami berkomitmen memberikan pengalaman berbelanja terbaik untuk Anda
          </p>
        </div>
        <div style={styles.whyGrid}>
          <div style={styles.whyCard}>
            <div style={styles.whyIconBox}>
              <FiAward size={28} />
            </div>
            <h3 style={styles.whyCardTitle}>Kualitas Terjamin</h3>
            <p style={styles.whyCardDesc}>
              Setiap produk melalui quality control ketat untuk memastikan Anda 
              mendapatkan furniture dengan standar terbaik.
            </p>
          </div>
          <div style={styles.whyCard}>
            <div style={styles.whyIconBox}>
              <FiHome size={28} />
            </div>
            <h3 style={styles.whyCardTitle}>Desain Eksklusif</h3>
            <p style={styles.whyCardDesc}>
              Koleksi kami dikurasi oleh desainer interior profesional untuk 
              menghadirkan tampilan modern dan elegan.
            </p>
          </div>
          <div style={styles.whyCard}>
            <div style={styles.whyIconBox}>
              <FiTruck size={28} />
            </div>
            <h3 style={styles.whyCardTitle}>Pengiriman Aman</h3>
            <p style={styles.whyCardDesc}>
              Gratis ongkir dan asuransi pengiriman untuk menjaga furniture 
              Anda tetap sempurna sampai di rumah.
            </p>
          </div>
          <div style={styles.whyCard}>
            <div style={styles.whyIconBox}>
              <FiShield size={28} />
            </div>
            <h3 style={styles.whyCardTitle}>Garansi Resmi</h3>
            <p style={styles.whyCardDesc}>
              Garansi hingga 5 tahun untuk produk tertentu, karena kami sangat 
              percaya dengan kualitas produk kami.
            </p>
          </div>
          <div style={styles.whyCard}>
            <div style={styles.whyIconBox}>
              <FiUsers size={28} />
            </div>
            <h3 style={styles.whyCardTitle}>Customer Service 24/7</h3>
            <p style={styles.whyCardDesc}>
              Tim kami siap membantu Anda kapan saja, dari konsultasi desain 
              hingga after-sales service.
            </p>
          </div>
          <div style={styles.whyCard}>
            <div style={styles.whyIconBox}>
              <FiStar size={28} />
            </div>
            <h3 style={styles.whyCardTitle}>Member Eksklusif</h3>
            <p style={styles.whyCardDesc}>
              Bergabung dengan membership dan nikmati diskon, voucher, serta 
              reward point di setiap transaksi.
            </p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={styles.statsSection}>
        <div style={styles.statsGrid}>
          <div style={styles.statItem}>
            <h2 style={styles.statNumber}>5000+</h2>
            <p style={styles.statLabel}>Pelanggan Bahagia</p>
          </div>
          <div style={styles.statItem}>
            <h2 style={styles.statNumber}>250+</h2>
            <p style={styles.statLabel}>Produk Premium</p>
          </div>
          <div style={styles.statItem}>
            <h2 style={styles.statNumber}>10+</h2>
            <p style={styles.statLabel}>Tahun Pengalaman</p>
          </div>
          <div style={styles.statItem}>
            <h2 style={styles.statNumber}>98%</h2>
            <p style={styles.statLabel}>Kepuasan Pelanggan</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Siap Wujudkan Rumah Impian Anda?</h2>
        <p style={styles.ctaDesc}>
          Jelajahi koleksi furniture premium kami dan temukan piece yang sempurna untuk ruang Anda.
        </p>
        <div style={styles.ctaButtons}>
          <a href="/products" style={styles.ctaBtnPrimary}>
            Belanja Sekarang
          </a>
          <a href="/membership" style={styles.ctaBtnSecondary}>
            ⭐ Jadi Member
          </a>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#FAFAFA',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#111827',
  },

  // HERO
  hero: {
    position: 'relative',
    padding: '120px 10% 100px',
    background: 'linear-gradient(135deg, #FDF2F4 0%, #F6E8EB 50%, #E8C5CE 100%)',
    textAlign: 'center',
    overflow: 'hidden',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(183, 110, 121, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(212, 169, 116, 0.15) 0%, transparent 50%)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '800px',
    margin: '0 auto',
  },
  badge: {
    display: 'inline-block',
    padding: '8px 20px',
    background: 'rgba(183, 110, 121, 0.1)',
    color: '#B76E79',
    borderRadius: '30px',
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '2px',
    marginBottom: '24px',
    border: '1px solid rgba(183, 110, 121, 0.2)',
  },
  heroTitle: {
    fontSize: '52px',
    fontWeight: '800',
    color: '#111827',
    margin: '0 0 24px',
    lineHeight: 1.2,
    letterSpacing: '-1px',
  },
  highlight: {
    background: 'linear-gradient(135deg, #B76E79 0%, #D4A574 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroDesc: {
    fontSize: '18px',
    color: '#4B5563',
    lineHeight: 1.8,
    margin: '0 auto',
    maxWidth: '650px',
  },

  // STORY
  storySection: {
    padding: '100px 10%',
    background: '#fff',
  },
  storyGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '80px',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  storyImage: {
    width: '100%',
    height: '450px',
    background: 'linear-gradient(135deg, #FDF2F4 0%, #E8C5CE 100%)',
    borderRadius: '24px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 20px 50px rgba(183, 110, 121, 0.15)',
  },
  storyImageOverlay: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    padding: '30px',
    background: 'linear-gradient(to top, rgba(183, 110, 121, 0.9), transparent)',
  },
  storyYear: {
    color: '#fff',
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '2px',
  },
  sectionBadge: {
    display: 'inline-block',
    padding: '6px 16px',
    background: '#FDF2F4',
    color: '#B76E79',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '2px',
    marginBottom: '16px',
  },
  storyTitle: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#111827',
    margin: '0 0 24px',
    lineHeight: 1.2,
  },
  storyText: {
    fontSize: '16px',
    color: '#4B5563',
    lineHeight: 1.8,
    margin: '0 0 20px',
  },
  storyFeatures: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '30px',
  },
  storyFeature: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  featureIcon: {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #B76E79, #D49AA5)',
    color: '#fff',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: '700',
    flexShrink: 0,
  },
  featureTitle: {
    fontSize: '15px',
    color: '#111827',
    display: 'block',
    marginBottom: '4px',
  },
  featureDesc: {
    fontSize: '13px',
    color: '#6B7280',
    margin: 0,
  },

  // VISION & MISSION
  vmSection: {
    padding: '100px 10%',
    background: '#FAFAFA',
  },
  vmHeader: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  vmTitle: {
    fontSize: '40px',
    fontWeight: '800',
    color: '#111827',
    margin: '16px 0 0',
  },
  vmGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  vmCard: {
    background: '#fff',
    padding: '40px',
    borderRadius: '24px',
    border: '1px solid #F3F4F6',
    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
  },
  vmIconBox: {
    width: '72px',
    height: '72px',
    background: 'linear-gradient(135deg, #B76E79, #D49AA5)',
    color: '#fff',
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    boxShadow: '0 10px 25px rgba(183, 110, 121, 0.25)',
  },
  vmCardTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 16px',
  },
  vmCardText: {
    fontSize: '15px',
    color: '#4B5563',
    lineHeight: 1.8,
    margin: 0,
  },
  missionList: {
    margin: 0,
    padding: '0 0 0 20px',
    color: '#4B5563',
    fontSize: '15px',
    lineHeight: 2,
  },

  // WHY CHOOSE US
  whySection: {
    padding: '100px 10%',
    background: '#fff',
  },
  whyHeader: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  whyTitle: {
    fontSize: '40px',
    fontWeight: '800',
    color: '#111827',
    margin: '16px 0',
  },
  whySubtitle: {
    fontSize: '17px',
    color: '#6B7280',
    margin: 0,
  },
  whyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  whyCard: {
    background: '#FAFAFA',
    padding: '32px 28px',
    borderRadius: '20px',
    border: '1px solid #F3F4F6',
    transition: 'all 0.3s',
  },
  whyIconBox: {
    width: '56px',
    height: '56px',
    background: '#FDF2F4',
    color: '#B76E79',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  whyCardTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 12px',
  },
  whyCardDesc: {
    fontSize: '14px',
    color: '#6B7280',
    lineHeight: 1.7,
    margin: 0,
  },

  // STATS
  statsSection: {
    padding: '80px 10%',
    background: 'linear-gradient(135deg, #B76E79 0%, #D49AA5 50%, #D4A574 100%)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  statItem: {},
  statNumber: {
    fontSize: '56px',
    fontWeight: '800',
    color: '#fff',
    margin: '0 0 8px',
    lineHeight: 1,
    textShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  statLabel: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    margin: 0,
  },

  // CTA
  ctaSection: {
    padding: '100px 10%',
    background: '#111827',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#fff',
    margin: '0 0 16px',
  },
  ctaDesc: {
    fontSize: '17px',
    color: 'rgba(255,255,255,0.7)',
    margin: '0 0 40px',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  ctaButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaBtnPrimary: {
    padding: '16px 36px',
    background: 'linear-gradient(135deg, #B76E79, #D4A574)',
    color: '#fff',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '15px',
    boxShadow: '0 10px 25px rgba(183, 110, 121, 0.4)',
  },
  ctaBtnSecondary: {
    padding: '16px 36px',
    background: 'transparent',
    color: '#fff',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '15px',
    border: '2px solid rgba(255,255,255,0.3)',
  },
  storyImage: {
  width: '100%',
  height: '450px',
  borderRadius: '24px',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 20px 50px rgba(183, 110, 121, 0.15)',
},
storyImg: {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
},
};

export default About;