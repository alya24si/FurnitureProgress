import { useState } from "react";

const DiscountClaim = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        promo: "",
        totalPurchase: "",
        note: "",
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
            "Klaim diskon berhasil dikirim dan sedang menunggu verifikasi admin."
        );

        console.log(formData);
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Klaim Diskon Furniture</h1>

                    <p style={styles.subtitle}>
                        Ajukan klaim diskon Anda dan tunggu proses verifikasi dari admin.
                        Pastikan data yang Anda masukkan sesuai dengan transaksi yang telah
                        dilakukan.
                    </p>
                </div>

                <div style={styles.infoBox}>
                    <h2 style={{ color: "#6E39CB", marginBottom: "10px" }}>
                        Promo Furniture Aktif
                    </h2>

                    <p style={{ color: "#6B7280" }}>
                        Promo diperbarui setiap 2 hari sekali dan dapat berubah sesuai
                        kebijakan toko.
                    </p>

                    <div style={styles.promoGrid}>
                        <div style={styles.promoCard}>
                            <h3 style={styles.promoTitle}>Diskon 10%</h3>
                            <p>Minimal pembelian Rp 2.000.000</p>
                        </div>

                        <div style={styles.promoCard}>
                            <h3 style={styles.promoTitle}>Diskon 15%</h3>
                            <p>Minimal pembelian Rp 3.000.000</p>
                        </div>

                        <div style={styles.promoCard}>
                            <h3 style={styles.promoTitle}>Diskon 20%</h3>
                            <p>Minimal pembelian Rp 5.000.000</p>
                        </div>
                    </div>
                </div>

                <form style={styles.form} onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label>Nama Lengkap</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Masukkan nama lengkap"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Masukkan email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Nomor HP</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="08xxxxxxxxxx"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Pilih Promo</label>
                        <select
                            name="promo"
                            value={formData.promo}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Pilih Promo --</option>
                            <option value="Diskon 10%">
                                Diskon 10% (Min Rp 2.000.000)
                            </option>
                            <option value="Diskon 15%">
                                Diskon 15% (Min Rp 3.000.000)
                            </option>
                            <option value="Diskon 20%">
                                Diskon 20% (Min Rp 5.000.000)
                            </option>
                        </select>
                    </div>

                    <div style={styles.formGroup}>
                        <label>Total Pembelian</label>
                        <input
                            type="number"
                            name="totalPurchase"
                            placeholder="Masukkan total pembelian"
                            value={formData.totalPurchase}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Upload Bukti Transaksi</label>
                        <input type="file" />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Catatan Tambahan</label>
                        <textarea
                            rows="4"
                            name="note"
                            placeholder="Tambahkan catatan jika diperlukan"
                            value={formData.note}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" style={styles.button}>
                        Kirim Klaim Diskon
                    </button>
                </form>

                <div style={styles.statusBox}>
                    <h4>Status Klaim</h4>

                    <p>
                        Setelah klaim dikirim, status akan berubah menjadi:
                    </p>

                    <span style={styles.status}>
                        Menunggu Verifikasi Admin
                    </span>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: {
        background: "#F5F7FA",
        minHeight: "100vh",
        padding: "80px 20px",
    },

    container: {
        maxWidth: "1100px",
        margin: "auto",
    },

    header: {
        textAlign: "center",
        marginBottom: "40px",
    },

    title: {
        fontSize: "42px",
        fontWeight: "700",
        color: "#6E39CB",
        marginBottom: "12px",
    },

    subtitle: {
        maxWidth: "700px",
        margin: "0 auto",
        color: "#6B7280",
        lineHeight: "1.8",
        fontSize: "16px",
    },

    infoBox: {
        background: "#FFFFFF",
        borderRadius: "20px",
        padding: "30px",
        marginBottom: "30px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    },

    promoGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginTop: "20px",
    },

    promoCard: {
        background: "#FAF7FF",
        border: "2px solid #E9D5FF",
        borderRadius: "16px",
        padding: "20px",
        textAlign: "center",
        transition: "0.3s",
    },

    promoTitle: {
        color: "#6E39CB",
        fontSize: "22px",
        fontWeight: "700",
        marginBottom: "10px",
    },

    form: {
        background: "#FFFFFF",
        borderRadius: "20px",
        padding: "35px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        display: "grid",
        gap: "20px",
    },

    formGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },

    label: {
        fontWeight: "600",
        color: "#374151",
    },

    input: {
        padding: "14px",
        border: "1px solid #D1D5DB",
        borderRadius: "12px",
        fontSize: "15px",
        outline: "none",
    },

    textarea: {
        padding: "14px",
        border: "1px solid #D1D5DB",
        borderRadius: "12px",
        fontSize: "15px",
        resize: "none",
        outline: "none",
    },

    select: {
        padding: "14px",
        border: "1px solid #D1D5DB",
        borderRadius: "12px",
        fontSize: "15px",
        outline: "none",
        background: "#fff",
    },

    button: {
        background: "#6E39CB",
        color: "#FFFFFF",
        border: "none",
        padding: "16px",
        borderRadius: "12px",
        cursor: "pointer",
        fontWeight: "700",
        fontSize: "16px",
        marginTop: "10px",
    },

    statusBox: {
        marginTop: "30px",
        background: "#FFFFFF",
        borderRadius: "20px",
        padding: "25px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    },

    status: {
        display: "inline-block",
        marginTop: "10px",
        background: "#FEF3C7",
        color: "#92400E",
        padding: "10px 18px",
        borderRadius: "30px",
        fontWeight: "700",
    },
};

export default DiscountClaim;