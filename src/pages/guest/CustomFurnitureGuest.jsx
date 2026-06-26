import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMaximize, FiMessageSquare } from "react-icons/fi";
import { supabase } from "../../services/supabase";

function CustomFurnitureGuest() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(null);
  
  const [formData, setFormData] = useState({
    furniture_type: "",
    material: "",
    color: "",
    size: "",
    notes: "",
  });

  useEffect(() => {
    checkLogin();
  }, [navigate]);

  const checkLogin = () => {
    const storedCustomer = localStorage.getItem("customer");
    
    if (!storedCustomer) {
      alert("Silahkan login terlebih dahulu untuk mengajukan custom furniture!");
      navigate("/login-customer");
      return;
    }
    
    const customerData = JSON.parse(storedCustomer);
    
    // ✅ Cek apakah user adalah MEMBER
    if (customerData.membership_type) {
      alert("Custom Furniture hanya untuk customer regular. Member sudah memiliki fasilitas sendiri.");
      navigate("/member/dashboard");
      return;
    }
    
    setCustomer(customerData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ PERBAIKAN: Hanya insert kolom yang ADA di tabel Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Submitting form...");
      console.log("Customer:", customer);
      console.log("Form data:", formData);

      // ✅ Hanya insert kolom yang ADA di tabel
      const insertData = {
        customer_name: customer?.full_name || customer?.email || "Unknown",
        customer_email: customer?.email || "",
        furniture_type: formData.furniture_type,
        material: formData.material,
        color: formData.color || null,
        size: formData.size || null,
        notes: formData.notes || null,
        status: "pending",
        price: null,
      };

      console.log("Data to insert:", insertData);

      const { data, error } = await supabase
        .from("custom_furniture")
        .insert([insertData])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Success! Data inserted:", data);
      alert("Permintaan custom furniture berhasil dikirim! Tim kami akan menghubungi Anda segera.");
      
      // Reset form
      setFormData({
        furniture_type: "",
        material: "",
        color: "",
        size: "",
        notes: "",
      });
      
    } catch (error) {
      console.error("Full error:", error);
      alert(`Error: ${error.message || "Terjadi kesalahan. Silakan coba lagi."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Custom Furniture</h1>
        <p style={styles.subtitle}>
          Wujudkan furniture impian Anda dengan desain custom sesuai kebutuhan
        </p>
      </div>

      <div style={styles.formCard}>
        <h2 style={styles.formTitle}>Ajukan Permintaan Custom Furniture</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.sectionTitle}>Informasi Kontak</div>
          
          <div style={styles.infoBox}>
            <p><strong>Nama:</strong> {customer?.full_name || customer?.email}</p>
            <p><strong>Email:</strong> {customer?.email}</p>
            <p><strong>Telepon:</strong> {customer?.phone || "-"}</p>
          </div>

          <div style={styles.sectionTitle}>Detail Furniture</div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Jenis Furniture *</label>
              <select
                name="furniture_type"
                value={formData.furniture_type}
                onChange={handleChange}
                style={styles.select}
                required
              >
                <option value="">Pilih Jenis Furniture</option>
                <option value="Meja">Meja</option>
                <option value="Kursi">Kursi</option>
                <option value="Lemari">Lemari</option>
                <option value="Rak">Rak</option>
                <option value="Tempat Tidur">Tempat Tidur</option>
                <option value="Sofa">Sofa</option>
                <option value="Buffet">Buffet</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Material *</label>
              <select
                name="material"
                value={formData.material}
                onChange={handleChange}
                style={styles.select}
                required
              >
                <option value="">Pilih Material</option>
                <option value="Kayu Jati">Kayu Jati</option>
                <option value="Kayu Mahoni">Kayu Mahoni</option>
                <option value="Kayu Pinus">Kayu Pinus</option>
                <option value="MDF">MDF</option>
                <option value="Particle Board">Particle Board</option>
                <option value="Plywood">Plywood</option>
              </select>
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Warna</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                style={styles.input}
                placeholder="Contoh: Natural, Walnut, White"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Ukuran (P x L x T)</label>
              <div style={styles.inputWithIcon}>
                <FiMaximize style={styles.icon} />
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="120cm x 60cm x 75cm"
                />
              </div>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Catatan Desain</label>
            <div style={styles.textareaWrapper}>
              <FiMessageSquare style={styles.icon} />
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                style={styles.textarea}
                rows="4"
                placeholder="Jelaskan detail desain yang Anda inginkan..."
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={loading ? styles.buttonDisabled : styles.button}
          >
            {loading ? "Mengirim..." : "📤 Kirim Permintaan"}
          </button>

          <p style={styles.infoText}>
            💡 Setelah dikirim, tim kami akan menghubungi Anda untuk konfirmasi dan penawaran harga.
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #FAFAFA 0%, #FDF2F4 100%)",
    padding: "40px 20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: "12px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#6B7280",
    maxWidth: "600px",
    margin: "0 auto",
  },
  formCard: {
    background: "#fff",
    padding: "40px",
    borderRadius: "24px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
    border: "1px solid rgba(183, 110, 121, 0.1)",
    maxWidth: "800px",
    margin: "0 auto",
  },
  formTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#B76E79",
    marginTop: "10px",
    marginBottom: "15px",
    paddingBottom: "10px",
    borderBottom: "2px solid #F3F4F6",
  },
  infoBox: {
    background: "#FDF2F4",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(183, 110, 121, 0.2)",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    padding: "14px 16px",
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.3s",
  },
  select: {
    padding: "14px 16px",
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
    fontSize: "15px",
    outline: "none",
    background: "#fff",
    cursor: "pointer",
  },
  inputWithIcon: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: "14px",
    left: "14px",
    color: "#B76E79",
    fontSize: "18px",
  },
  textareaWrapper: {
    position: "relative",
  },
  textarea: {
    width: "100%",
    padding: "14px 16px 14px 45px",
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
    fontSize: "15px",
    outline: "none",
    resize: "vertical",
    boxSizing: "border-box",
  },
  button: {
    padding: "16px",
    background: "linear-gradient(135deg, #B76E79, #D49AA5)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 8px 20px rgba(183, 110, 121, 0.3)",
  },
  buttonDisabled: {
    padding: "16px",
    background: "#D1D5DB",
    color: "#9CA3AF",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "not-allowed",
    marginTop: "10px",
  },
  infoText: {
    textAlign: "center",
    fontSize: "14px",
    color: "#6B7280",
    marginTop: "10px",
    fontStyle: "italic",
  },
};

export default CustomFurnitureGuest;