import { useState } from "react";

const MembershipForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    membershipType: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      "Pendaftaran Membership berhasil dikirim dan menunggu persetujuan admin."
    );

    console.log(formData);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>
          Form Pendaftaran Membership
        </h1>

        <p style={styles.subtitle}>
          Lengkapi data berikut untuk menjadi member FurnitureKu.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="fullName"
            placeholder="Nama Lengkap"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Nomor HP"
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            onChange={handleChange}
            required
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option>Laki-laki</option>
            <option>Perempuan</option>
          </select>

          <textarea
            name="address"
            placeholder="Alamat Lengkap"
            rows="4"
            onChange={handleChange}
            required
          />

          <select
            name="membershipType"
            onChange={handleChange}
            required
          >
            <option value="">
              Pilih Jenis Membership
            </option>

            <option value="Bronze">
              Bronze - Rp50.000/Tahun
            </option>

            <option value="Silver">
              Silver - Rp100.000/Tahun
            </option>

            <option value="Gold">
              Gold - Rp200.000/Tahun
            </option>
          </select>

          <button type="submit">
            Daftar Membership
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: "#F8F5F0",
    minHeight: "100vh",
    padding: "60px 20px",
  },

  container: {
    maxWidth: "700px",
    margin: "auto",
    background: "#fff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
  },

  title: {
    textAlign: "center",
    color: "#8B6F47",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#666",
  },

  form: {
    display: "grid",
    gap: "15px",
  },
};

export default MembershipForm;