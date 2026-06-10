function MembershipDiscount() {
  return (
    <div style={styles.container}>

      <h1>Kelola Diskon Membership</h1>

      <div style={styles.card}>

        <label>Level Member</label>

        <select style={styles.input}>
          <option>Bronze</option>
          <option>Silver</option>
          <option>Gold</option>
        </select>

        <label>Diskon</label>

        <select style={styles.input}>
          <option>5%</option>
          <option>10%</option>
          <option>15%</option>
          <option>20%</option>
        </select>

        <button style={styles.button}>
          Simpan Diskon
        </button>

      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    display: "grid",
    gap: "15px",
    maxWidth: "600px",
  },

  input: {
    padding: "12px",
  },

  button: {
    background: "#8B5E3C",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
  },
};

export default MembershipDiscount;