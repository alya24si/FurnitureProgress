import { useState } from 'react';
import Container from '../../Reusable/Container';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Mohon lengkapi semua field!');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div style={styles.wrapper}>
      <Container>
        {/* HEADER */}
        <div style={styles.header}>
          <span style={styles.badge}>HUBUNGI KAMI</span>
          <h1 style={styles.title}>Mari Terhubung</h1>
          <p style={styles.subtitle}>
            Ada pertanyaan tentang produk atau pesanan? Tim kami siap membantu Anda.
          </p>
        </div>

        <div style={styles.grid}>
          {/* LEFT: INFO KONTAK */}
          <div style={styles.leftColumn}>
            <div style={styles.infoCard}>
              <h2 style={styles.infoTitle}>Informasi Kontak</h2>
              <p style={styles.infoDesc}>
                Jangan ragu untuk menghubungi kami melalui berbagai channel berikut.
              </p>

              <div style={styles.infoList}>
                <div style={styles.infoItem}>
                  <div style={styles.iconBox}>
                    <FiMapPin size={20} />
                  </div>
                  <div>
                    <h4 style={styles.infoItemTitle}>Alamat</h4>
                    <p style={styles.infoItemText}>Pekanbaru, Riau, Indonesia</p>
                  </div>
                </div>

                <div style={styles.infoItem}>
                  <div style={styles.iconBox}>
                    <FiPhone size={20} />
                  </div>
                  <div>
                    <h4 style={styles.infoItemTitle}>Telepon</h4>
                    <p style={styles.infoItemText}>+62 812-3456-7890</p>
                  </div>
                </div>

                <div style={styles.infoItem}>
                  <div style={styles.iconBox}>
                    <FiMail size={20} />
                  </div>
                  <div>
                    <h4 style={styles.infoItemTitle}>Email</h4>
                    <p style={styles.infoItemText}>furniture@gmail.com</p>
                  </div>
                </div>

                <div style={styles.infoItem}>
                  <div style={styles.iconBox}>
                    <FiClock size={20} />
                  </div>
                  <div>
                    <h4 style={styles.infoItemTitle}>Jam Operasional</h4>
                    <p style={styles.infoItemText}>Senin - Sabtu, 08:00 - 20:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div style={styles.rightColumn}>
            <div style={styles.formCard}>
              <h2 style={styles.formTitle}>Kirim Pesan</h2>
              <p style={styles.formDesc}>
                Isi form di bawah dan kami akan segera merespon.
              </p>

              {submitted ? (
                <div style={styles.successBox}>
                  <div style={styles.successIcon}>✓</div>
                  <h3 style={styles.successTitle}>Pesan Terkirim!</h3>
                  <p style={styles.successText}>
                    Terima kasih! Tim kami akan menghubungi Anda segera.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={styles.form}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Nama Lengkap</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      style={styles.input}
                      placeholder="Masukkan nama Anda"
                      required
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={styles.input}
                      placeholder="email@example.com"
                      required
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Pesan</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      style={styles.textarea}
                      placeholder="Tulis pesan Anda di sini..."
                      rows="5"
                      required
                    />
                  </div>

                  <button type="submit" style={styles.button}>
                    <FiSend style={{ marginRight: '8px' }} />
                    Kirim Pesan
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '80px 0',
    background: '#FAFAFA',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  badge: {
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
  title: {
    fontSize: '42px',
    fontWeight: '800',
    color: '#111827',
    margin: '0 0 12px',
  },
  subtitle: {
    fontSize: '17px',
    color: '#6B7280',
    margin: 0,
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  leftColumn: {},
  rightColumn: {},
  infoCard: {
    background: 'linear-gradient(135deg, #B76E79 0%, #D49AA5 100%)',
    padding: '40px 32px',
    borderRadius: '24px',
    color: '#fff',
    boxShadow: '0 20px 40px rgba(183, 110, 121, 0.2)',
    height: '100%',
    boxSizing: 'border-box',
  },
  infoTitle: {
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 12px',
  },
  infoDesc: {
    fontSize: '14px',
    opacity: 0.9,
    margin: '0 0 32px',
    lineHeight: 1.6,
  },
  infoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  infoItem: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  iconBox: {
    width: '44px',
    height: '44px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backdropFilter: 'blur(10px)',
  },
  infoItemTitle: {
    margin: '0 0 4px',
    fontSize: '14px',
    fontWeight: '700',
  },
  infoItemText: {
    margin: 0,
    fontSize: '13px',
    opacity: 0.9,
  },
  formCard: {
    background: '#fff',
    padding: '40px 32px',
    borderRadius: '24px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    border: '1px solid #F3F4F6',
  },
  formTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 8px',
  },
  formDesc: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '0 0 28px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1px solid #E5E7EB',
    outline: 'none',
    fontSize: '14px',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
  },
  textarea: {
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1px solid #E5E7EB',
    outline: 'none',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    boxSizing: 'border-box',
  },
  button: {
    background: 'linear-gradient(135deg, #B76E79, #D49AA5)',
    color: '#fff',
    border: 'none',
    padding: '14px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 20px rgba(183, 110, 121, 0.3)',
    transition: 'all 0.3s',
    marginTop: '8px',
  },
  successBox: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  successIcon: {
    width: '70px',
    height: '70px',
    background: 'linear-gradient(135deg, #10B981, #34D399)',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    fontWeight: '700',
    margin: '0 auto 20px',
  },
  successTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 8px',
  },
  successText: {
    fontSize: '14px',
    color: '#6B7280',
    margin: 0,
  },
};

export default Contact;