import Container from '../../Reusable/Container';

const About = () => {
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
          About Us
        </h1>

        <p
          style={{
            fontSize: '18px',
            color: '#6b7280',
            lineHeight: '32px',
            maxWidth: '800px',
            marginBottom: '50px'
          }}
        >
          Furniture adalah toko furniture modern yang menyediakan
          berbagai kebutuhan rumah dengan desain minimalis,
          elegan, dan berkualitas tinggi.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px'
          }}
        >

          <div style={cardStyle}>
            <h2 style={titleStyle}>Vision</h2>

            <p style={textStyle}>
              Menjadi toko furniture modern terbaik
              dengan pelayanan terpercaya.
            </p>
          </div>

          <div style={cardStyle}>
            <h2 style={titleStyle}>Mission</h2>

            <p style={textStyle}>
              Memberikan produk berkualitas dan
              pengalaman belanja terbaik.
            </p>
          </div>

          <div style={cardStyle}>
            <h2 style={titleStyle}>Quality</h2>

            <p style={textStyle}>
              Menggunakan material premium
              dengan desain modern.
            </p>
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
  marginBottom: '15px',
  color: '#7c3aed'
};

const textStyle = {
  color: '#6b7280',
  lineHeight: '28px'
};

export default About;