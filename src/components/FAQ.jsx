import { useState } from 'react';
import Container from '../Reusable/Container';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Apakah layanan ini gratis?',
      answer:
        'Tidak, kami menawarkan model freemium. Layanan dasar gratis selamanya, sementara fitur premium tersedia dengan langganan bulanan yang terjangkau. Anda dapat meningkatkan kapan saja.'
    },
    {
      question: 'Bagaimana cara mendaftar membership?',
      answer:
        'Anda dapat mendaftar membership melalui halaman registrasi kami. Pilih paket membership yang sesuai, isi data diri, dan lakukan pembayaran. Membership akan aktif dalam 1x24 jam.'
    },
    {
      question: 'Apakah ada garansi untuk produk furniture?',
      answer:
        'Ya, semua produk furniture kami dilengkapi garansi resmi minimal 1 tahun. Untuk produk premium, garansi dapat mencapai 5 tahun tergantung merek dan jenis produk.'
    },
    {
      question: 'Bagaimana cara klaim diskon member?',
      answer:
        'Setelah menjadi member, Anda akan menerima voucher eksklusif setiap bulan. Voucher dapat diklaim melalui halaman MemberVoucher dan otomatis terpotong saat checkout.'
    }
  ];

  return (
    <section style={styles.section}>
      <Container>
        <div style={styles.header}>
          <p style={styles.preTitle}>FAQ</p>
          <h2 style={styles.title}>Pertanyaan yang Sering Diajukan</h2>
          <p style={styles.subtitle}>
            Temukan jawaban untuk pertanyaan umum seputar layanan kami
          </p>
        </div>

        <div style={styles.faqList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                ...styles.faqItem,
                borderBottom:
                  index === faqs.length - 1 ? 'none' : '1px solid #F0E6C8'
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                style={styles.questionBtn}
              >
                <span style={styles.questionText}>{faq.question}</span>
                <span
                  style={{
                    ...styles.icon,
                    transform:
                      openIndex === index ? 'rotate(45deg)' : 'rotate(0)'
                  }}
                >
                  +
                </span>
              </button>

              {openIndex === index && (
                <div style={styles.answer}>
                  <p style={styles.answerText}>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

const styles = {
  section: {
    padding: '80px 0',
    backgroundColor: '#FDF8E8'
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px'
  },
  preTitle: {
    color: '#B8860B',
    fontWeight: '700',
    letterSpacing: '2px',
    marginBottom: '10px'
  },
  title: {
    fontSize: '36px',
    color: '#333',
    marginBottom: '15px'
  },
  subtitle: {
    color: '#666',
    fontSize: '16px'
  },
  faqList: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(212, 175, 55, 0.15)',
    border: '1px solid #F0E6C8'
  },
  faqItem: {
    padding: '20px 0'
  },
  questionBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0'
  },
  questionText: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    textAlign: 'left'
  },
  icon: {
    fontSize: '24px',
    color: '#D4AF37',
    transition: 'transform 0.3s ease',
    fontWeight: '700'
  },
  answer: {
    marginTop: '15px',
    paddingLeft: '10px',
    borderLeft: '3px solid #D4AF37'
  },
  answerText: {
    color: '#666',
    lineHeight: '1.8',
    fontSize: '15px'
  }
};

export default FAQ;