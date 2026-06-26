import { useState } from "react";
import { FiTag, FiUpload, FiCheckCircle, FiClock } from "react-icons/fi";

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
                {/* HEADER */}
                <div style={styles.header}>
                    <span style={styles.badge}>🎁 PROMO SPESIAL</span>
                    <h1 style={styles.title}>Klaim Diskon Furniture</h1>
                    <p style={styles.subtitle}>
                        Ajukan klaim diskon Anda dan tunggu proses verifikasi dari admin.
                        Pastikan data yang Anda masukkan sesuai dengan transaksi yang telah
                        dilakukan.
                    </p>
                </div>

                {/* INFO BOX - PROMO AKTIF */}
                <div style={styles.infoBox}>
                    <div style={styles.infoBoxHeader}>
                        <FiTag size={24} style={{ color: "#B76E79" }} />
                        <h2 style={styles.infoTitle}>
                            Promo Furniture Aktif
                        </h2>
                    </div>

                    <p style={styles.infoDesc}>
                        Promo diperbarui setiap 2 hari sekali dan dapat berubah sesuai
                        kebijakan toko.
                    </p>

                    <div style={styles.promoGrid}>
                        <div style={styles.promoCard}>
                            <div style={styles.promoIconBox}>10%</div>
                            <h3 style={styles.promoTitle}>Diskon 10%</h3>
                            <p style={styles.promoDesc}>Minimal pembelian Rp 2.000.000</p>
                        </div>

                        <div style={{ ...styles.promoCard, ...styles.promoCardHighlight }}>
                            <div style={{ ...styles.promoIconBox, ...styles.promoIconBoxHighlight }}>15%</div>
                            <h3 style={styles.promoTitle}>Diskon 15%</h3>
                            <p style={styles.promoDesc}>Minimal pembelian Rp 3.000.000</p>
                            <span style={styles.popularBadge}>POPULER</span>
                        </div>

                        <div style={styles.promoCard}>
                            <div style={styles.promoIconBox}>20%</div>
                            <h3 style={styles.promoTitle}>Diskon 20%</h3>
                            <p style={styles.promoDesc}>Minimal pembelian Rp 5.000.000</p>
                        </div>
                    </div>
                </div>

                {/* FORM KLAIM */}
                <form style={styles.form} onSubmit={handleSubmit}>
                    <div style={styles.formHeader}>
                        <h2 style={styles.formTitle}>Form Klaim Diskon</h2>
                        <p style={styles.formSubtitle}>Lengkapi data di bawah untuk mengajukan klaim</p>
                    </div>

                    <div style={styles.formGrid}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Nama Lengkap</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Masukkan nama lengkap"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Masukkan email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Nomor HP</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="08xxxxxxxxxx"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Pilih Promo</label>
                            <select
                                name="promo"
                                value={formData.promo}
                                onChange={handleChange}
                                required
                                style={styles.select}
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
                            <label style={styles.label}>Total Pembelian</label>
                            <input
                                type="number"
                                name="totalPurchase"
                                placeholder="Masukkan total pembelian"
                                value={formData.totalPurchase}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Upload Bukti Transaksi</label>
                            <div style={styles.uploadBox}>
                                <FiUpload size={24} style={{ color: "#B76E79", marginBottom: "8px" }} />
                                <p style={styles.uploadText}>Klik untuk upload file</p>
                                <p style={styles.uploadHint}>PNG, JPG, PDF (Max 5MB)</p>
                                <input type="file" style={styles.fileInput} />
                            </div>
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Catatan Tambahan</label>
                        <textarea
                            rows="4"
                            name="note"
                            placeholder="Tambahkan catatan jika diperlukan"
                            value={formData.note}
                            onChange={handleChange}
                            style={styles.textarea}
                        />
                    </div>

                    <button type="submit" style={styles.button}>
                        Kirim Klaim Diskon
                    </button>
                </form>

                {/* STATUS BOX */}
                <div style={styles.statusBox}>
                    <div style={styles.statusHeader}>
                        <FiClock size={24} style={{ color: "#B76E79" }} />
                        <h4 style={styles.statusTitle}>Status Klaim</h4>
                    </div>

                    <p style={styles.statusDesc}>
                        Setelah klaim dikirim, status akan berubah menjadi:
                    </p>

                    <div style={styles.statusFlow}>
                        <div style={styles.statusStep}>
                            <div style={styles.statusIcon}>1</div>
                            <p style={styles.statusLabel}>Klaim Dikirim</p>
                        </div>
                        <div style={styles.statusArrow}>→</div>
                        <div style={{ ...styles.statusStep, ...styles.statusStepActive }}>
                            <div style={{ ...styles.statusIcon, ...styles.statusIconActive }}>2</div>
                            <p style={styles.statusLabel}>Menunggu Verifikasi Admin</p>
                        </div>
                        <div style={styles.statusArrow}>→</div>
                        <div style={styles.statusStep}>
                            <div style={styles.statusIcon}>3</div>
                            <p style={styles.statusLabel}>Disetujui / Ditolak</p>
                        </div>
                    </div>

                    <div style={styles.statusBadge}>
                        <FiClock size={14} />
                        <span>Menunggu Verifikasi Admin</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: {
        background: "linear-gradient(135deg, #FAFAFA 0%, #FDF2F4 100%)",
        minHeight: "100vh",
        padding: "80px 20px",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },

    container: {
        maxWidth: "1100px",
        margin: "auto",
    },

    // HEADER
    header: {
        textAlign: "center",
        marginBottom: "50px",
    },

    badge: {
        display: "inline-block",
        padding: "8px 20px",
        background: "linear-gradient(135deg, #B76E79, #D49AA5)",
        color: "#fff",
        borderRadius: "30px",
        fontSize: "12px",
        fontWeight: "700",
        letterSpacing: "2px",
        marginBottom: "20px",
        boxShadow: "0 8px 20px rgba(183, 110, 121, 0.3)",
    },

    title: {
        fontSize: "42px",
        fontWeight: "800",
        background: "linear-gradient(135deg, #B76E79, #D4A574)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        marginBottom: "16px",
        margin: "0 0 16px",
    },

    subtitle: {
        maxWidth: "700px",
        margin: "0 auto",
        color: "#6B7280",
        lineHeight: "1.8",
        fontSize: "16px",
    },

    // INFO BOX
    infoBox: {
        background: "#FFFFFF",
        borderRadius: "24px",
        padding: "40px",
        marginBottom: "30px",
        border: "1px solid #F3F4F6",
        boxShadow: "0 10px 40px rgba(183, 110, 121, 0.08)",
    },

    infoBoxHeader: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "12px",
    },

    infoTitle: {
        color: "#111827",
        fontSize: "24px",
        fontWeight: "700",
        margin: 0,
    },

    infoDesc: {
        color: "#6B7280",
        fontSize: "14px",
        margin: "0 0 30px",
        lineHeight: "1.6",
    },

    promoGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
        gap: "20px",
    },

    promoCard: {
        background: "linear-gradient(135deg, #FDF2F4 0%, #fff 100%)",
        border: "2px solid #F6E8EB",
        borderRadius: "20px",
        padding: "30px 20px",
        textAlign: "center",
        transition: "all 0.3s",
        position: "relative",
    },

    promoCardHighlight: {
        background: "linear-gradient(135deg, #B76E79 0%, #D49AA5 100%)",
        border: "2px solid #B76E79",
        color: "#fff",
        transform: "scale(1.05)",
        boxShadow: "0 15px 35px rgba(183, 110, 121, 0.3)",
    },

    promoIconBox: {
        width: "70px",
        height: "70px",
        background: "linear-gradient(135deg, #B76E79, #D49AA5)",
        color: "#fff",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "22px",
        fontWeight: "800",
        margin: "0 auto 16px",
        boxShadow: "0 8px 20px rgba(183, 110, 121, 0.3)",
    },

    promoIconBoxHighlight: {
        background: "#fff",
        color: "#B76E79",
    },

    promoTitle: {
        color: "#111827",
        fontSize: "22px",
        fontWeight: "700",
        marginBottom: "8px",
        margin: "0 0 8px",
    },

    promoDesc: {
        color: "#6B7280",
        fontSize: "13px",
        margin: 0,
    },

    popularBadge: {
        position: "absolute",
        top: "-10px",
        right: "20px",
        background: "linear-gradient(135deg, #FFD700, #FFA500)",
        color: "#fff",
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "10px",
        fontWeight: "700",
        letterSpacing: "1px",
        boxShadow: "0 4px 12px rgba(255, 165, 0, 0.4)",
    },

    // FORM
    form: {
        background: "#FFFFFF",
        borderRadius: "24px",
        padding: "40px",
        border: "1px solid #F3F4F6",
        boxShadow: "0 10px 40px rgba(183, 110, 121, 0.08)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },

    formHeader: {
        marginBottom: "10px",
    },

    formTitle: {
        fontSize: "24px",
        fontWeight: "700",
        color: "#111827",
        margin: "0 0 8px",
    },

    formSubtitle: {
        fontSize: "14px",
        color: "#6B7280",
        margin: 0,
    },

    formGrid: {
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
        fontWeight: "600",
        color: "#374151",
        fontSize: "14px",
    },

    input: {
        padding: "14px 16px",
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        fontSize: "15px",
        outline: "none",
        transition: "all 0.2s",
        boxSizing: "border-box",
        fontFamily: "inherit",
    },

    textarea: {
        padding: "14px 16px",
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        fontSize: "15px",
        resize: "none",
        outline: "none",
        fontFamily: "inherit",
        boxSizing: "border-box",
    },

    select: {
        padding: "14px 16px",
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        fontSize: "15px",
        outline: "none",
        background: "#fff",
        fontFamily: "inherit",
        cursor: "pointer",
    },

    uploadBox: {
        border: "2px dashed #D49AA5",
        borderRadius: "12px",
        padding: "30px",
        textAlign: "center",
        background: "#FDF2F4",
        cursor: "pointer",
        transition: "all 0.2s",
        position: "relative",
    },

    uploadText: {
        margin: "0 0 4px",
        fontSize: "14px",
        fontWeight: "600",
        color: "#B76E79",
    },

    uploadHint: {
        margin: 0,
        fontSize: "12px",
        color: "#6B7280",
    },

    fileInput: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 0,
        cursor: "pointer",
    },

    button: {
        background: "linear-gradient(135deg, #B76E79, #D49AA5)",
        color: "#FFFFFF",
        border: "none",
        padding: "16px",
        borderRadius: "12px",
        cursor: "pointer",
        fontWeight: "700",
        fontSize: "16px",
        marginTop: "10px",
        boxShadow: "0 10px 25px rgba(183, 110, 121, 0.3)",
        transition: "all 0.3s",
        fontFamily: "inherit",
    },

    // STATUS BOX
    statusBox: {
        marginTop: "30px",
        background: "#FFFFFF",
        borderRadius: "24px",
        padding: "30px",
        border: "1px solid #F3F4F6",
        boxShadow: "0 10px 40px rgba(183, 110, 121, 0.08)",
    },

    statusHeader: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "12px",
    },

    statusTitle: {
        fontSize: "20px",
        fontWeight: "700",
        color: "#111827",
        margin: 0,
    },

    statusDesc: {
        color: "#6B7280",
        fontSize: "14px",
        margin: "0 0 24px",
    },

    statusFlow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        marginBottom: "24px",
        flexWrap: "wrap",
    },

    statusStep: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
    },

    statusStepActive: {
        transform: "scale(1.1)",
    },

    statusIcon: {
        width: "44px",
        height: "44px",
        background: "#F3F4F6",
        color: "#6B7280",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        fontWeight: "700",
    },

    statusIconActive: {
        background: "linear-gradient(135deg, #B76E79, #D49AA5)",
        color: "#fff",
        boxShadow: "0 8px 20px rgba(183, 110, 121, 0.3)",
    },

    statusLabel: {
        fontSize: "13px",
        color: "#4B5563",
        fontWeight: "600",
        margin: 0,
        textAlign: "center",
    },

    statusArrow: {
        fontSize: "24px",
        color: "#D49AA5",
        fontWeight: "700",
    },

    statusBadge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        marginTop: "10px",
        background: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
        color: "#92400E",
        padding: "12px 20px",
        borderRadius: "30px",
        fontWeight: "700",
        fontSize: "14px",
        boxShadow: "0 4px 12px rgba(254, 243, 199, 0.5)",
    },
};

export default DiscountClaim;