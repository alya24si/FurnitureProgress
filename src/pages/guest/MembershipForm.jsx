import { useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";

const MembershipForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
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
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const memberCode =
      "MBR" +
      Math.floor(
        100000 + Math.random() * 900000
      );

    const { error } =
      await supabase
        .from("memberships")
        .insert([
          {
            member_code:
              memberCode,

            full_name:
              formData.fullName,

            email:
              formData.email,

            phone:
              formData.phone,

            gender:
              formData.gender,

            address:
              formData.address,

            membership_type:
              formData.membershipType,

            status:
              "Menunggu",
          },
        ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Pendaftaran berhasil dikirim dan sedang menunggu persetujuan admin."
    );

    navigate("/");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>
          Form Pendaftaran Membership
        </h1>

        <p style={styles.subtitle}>
          Lengkapi data berikut untuk
          menjadi member FurnitureKu.
        </p>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >
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
            <option value="">
              Pilih Jenis Kelamin
            </option>

            <option value="Laki-laki">
              Laki-laki
            </option>

            <option value="Perempuan">
              Perempuan
            </option>
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
              Pilih Membership
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

          <button
            type="submit"
            style={styles.button}
          >
            {loading
              ? "Menyimpan..."
              : "Daftar Membership"}
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
    boxShadow:
      "0 10px 30px rgba(0,0,0,.08)",
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

  button: {
    background: '#C8A97E',
  color: '#fff',
  border: 'none',
  padding: '12px 20px',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: '600',
  width: '100%',
  boxShadow: '0 4px 12px rgba(200,169,126,0.3)',
  transition: '0.3s ease',
},
};

export default MembershipForm;