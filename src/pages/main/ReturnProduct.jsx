import { useState } from 'react';

const ReturnProduct = () => {

  const [form, setForm] = useState({
    name: '',
    orderId: '',
    date: '',
    reason: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert('Pengajuan pengembalian berhasil dikirim!');
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        {/* HEADER */}
        <div style={styles.header}>

          <div style={styles.iconBox}>
            📦
          </div>

          <h1 style={styles.title}>
            Pengajuan Pengembalian Barang
          </h1>

          <p style={styles.subtitle}>
            Pengajuan hanya dapat dilakukan maksimal
            <span style={styles.highlight}> 3 hari </span>
            setelah barang diterima customer.
          </p>

        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Nama Customer
            </label>

            <input
              type="text"
              name="name"
              placeholder="Masukkan nama lengkap"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Nomor Order
            </label>

            <input
              type="text"
              name="orderId"
              placeholder="Contoh : ORD-001"
              value={form.orderId}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Tanggal Barang Diterima
            </label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Alasan Pengembalian
            </label>

            <textarea
              rows="5"
              name="reason"
              placeholder="Jelaskan alasan pengembalian barang"
              value={form.reason}
              onChange={handleChange}
              style={styles.textarea}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Upload Bukti Foto
            </label>

            <input
              type="file"
              style={styles.fileInput}
            />
          </div>

          <button type="submit" style={styles.button}>
            Ajukan Pengembalian
          </button>

        </form>

      </div>

    </div>
  );
};

const styles = {

  container: {
    minHeight: '100vh',
    background: '#F5F3FF',
    padding: '60px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  card: {
    width: '100%',
    maxWidth: '750px',
    background: 'white',
    borderRadius: '35px',
    padding: '45px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
  },

  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },

  iconBox: {
    width: '90px',
    height: '90px',
    margin: '0 auto 20px',
    borderRadius: '25px',
    background: '#EDE9FE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '42px'
  },

  title: {
    fontSize: '38px',
    fontWeight: '700',
    color: '#6D28D9',
    marginBottom: '15px'
  },

  subtitle: {
    color: '#666',
    fontSize: '17px',
    lineHeight: '1.7'
  },

  highlight: {
    color: '#6D28D9',
    fontWeight: '700'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },

  label: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333'
  },

  input: {
    padding: '16px',
    borderRadius: '16px',
    border: '1px solid #D1D5DB',
    fontSize: '15px',
    outline: 'none'
  },

  textarea: {
    padding: '16px',
    borderRadius: '16px',
    border: '1px solid #D1D5DB',
    fontSize: '15px',
    outline: 'none',
    resize: 'none'
  },

  fileInput: {
    padding: '14px',
    borderRadius: '16px',
    border: '1px solid #D1D5DB',
    background: '#FAFAFA'
  },

  button: {
    marginTop: '10px',
    padding: '18px',
    background: '#6D28D9',
    color: 'white',
    border: 'none',
    borderRadius: '18px',
    fontSize: '17px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: '0.3s'
  }
};

export default ReturnProduct;