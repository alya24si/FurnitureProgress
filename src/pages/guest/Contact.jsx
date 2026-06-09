import Container from '../../Reusable/Container';

const Contact = () => {
  return (
    <div style={{ padding: '80px 0', background: '#f9fafb' }}>

      <Container>

        <h1
          style={{
            fontSize: '42px',
            fontWeight: '700',
            marginBottom: '20px',
            color: '#111827'
          }}
        >
          Contact Us
        </h1>

        <p
          style={{
            fontSize: '18px',
            color: '#6b7280',
            marginBottom: '50px'
          }}
        >
          Hubungi kami untuk informasi produk dan pemesanan.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}
        >

          {/* LEFT */}
          <div style={cardStyle}>

            <h2 style={titleStyle}>
              Information
            </h2>

            <div style={{ lineHeight: '35px', color: '#6b7280' }}>
              <p>📍 Pekanbaru, Riau</p>
              <p>📞 +62 812-3456-7890</p>
              <p>📧 furniture@gmail.com</p>
              <p>🕒 Monday - Saturday</p>
            </div>

          </div>

          {/* RIGHT */}
          <div style={cardStyle}>

            <h2 style={titleStyle}>
              Send Message
            </h2>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

              <input
                type="text"
                placeholder="Your Name"
                style={inputStyle}
              />

              <input
                type="email"
                placeholder="Your Email"
                style={inputStyle}
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                style={inputStyle}
              ></textarea>

              <button style={buttonStyle}>
                Send Message
              </button>

            </form>

          </div>

        </div>

      </Container>

    </div>
  );
};

const cardStyle = {
  background: '#fff',
  padding: '30px',
  borderRadius: '20px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
};

const titleStyle = {
  fontSize: '24px',
  marginBottom: '20px',
  color: '#7c3aed'
};

const inputStyle = {
  width: '100%',
  padding: '14px',
  borderRadius: '12px',
  border: '1px solid #ddd',
  outline: 'none',
  fontSize: '15px'
};

const buttonStyle = {
  background: '#7c3aed',
  color: '#fff',
  border: 'none',
  padding: '14px',
  borderRadius: '12px',
  cursor: 'pointer',
  fontWeight: '600'
};

export default Contact;