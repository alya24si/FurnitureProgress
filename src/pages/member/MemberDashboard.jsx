import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

function MemberDashboard() {
  const [member, setMember] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    getMember();
  }, []);

  const getMember = async () => {
    const { data, error } = await supabase
      .from("memberships")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setMember(data);
  };

  // Handlers
  const handleNotification = () => {
    alert("Anda memiliki 3 notifikasi baru:\n\n• Voucher diskon 20% siap diklaim\n• Pesanan INV002 sedang diproses\n• Reward point bertambah 500");
  };

  const handleChat = () => {
    alert("Membuka chat dengan Customer Service...");
  };

  const handleViewVoucher = () => {
    alert("Membuka halaman Voucher\n\nAnda memiliki 3 voucher aktif:\n• VCR-20-JUN: Diskon 20%\n• VCR-FREE-SHIP: Gratis ongkir\n• VCR-CASHBACK: Cashback 500rb");
  };

  const handleRewardPoint = () => {
    alert(`Membuka halaman Reward Point\n\nPoin Anda: ${rewardPoints}\nSetara dengan: Rp ${(rewardPoints * 100).toLocaleString()}\n\nTukar poin Anda dengan voucher menarik!`);
  };

  const handleOrderHistory = () => {
    alert("Membuka halaman Riwayat Pesanan...");
  };

  const handleEditProfile = () => {
    alert("Membuka halaman Edit Profil...");
  };

  const handleSeeAllFeatures = () => {
    alert("Membuka halaman Semua Fitur...");
  };

  const handleUpgrade = () => {
    alert("Membuka halaman Upgrade Membership\n\nUpgrade ke Platinum untuk mendapatkan:\n• Diskon hingga 30%\n• Prioritas customer service\n• Free shipping tanpa minimum\n• Early access promo");
  };

  const handleFilter = () => {
    alert("Membuka filter transaksi...\n\nFilter berdasarkan:\n• Status (Selesai, Diproses, Batal)\n• Tanggal\n• Kategori produk");
  };

  const handleExport = () => {
    alert("Mengexport data transaksi ke CSV...\n\nFile akan diunduh dalam beberapa saat.");
  };

  const handleViewAllTransactions = () => {
    alert("Membuka halaman Semua Transaksi...");
  };

  const handleViewDetail = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
  };

  const handlePageChange = (page) => {
    alert(`Membuka halaman ${page}...`);
  };

  if (!member) {
    return (
      <div style={styles.loading}>
        <div style={styles.loadingDot}></div>
        <p>Memuat data member...</p>
      </div>
    );
  }

  const rewardPoints = Math.floor(
    Number(member.total_spending || 0) / 10000
  );

  return (
    <div style={styles.wrapper}>

      {/* TOPBAR */}
      <header style={styles.topbar}>
        <div>
          <div style={styles.breadcrumb}>
            <span>Dashboard</span>
            <span style={styles.breadcrumbSep}>/</span>
            <span style={styles.breadcrumbCurrent}>Overview</span>
          </div>
          <h1 style={styles.pageTitle}>Selamat datang kembali</h1>
        </div>

        <div style={styles.topbarRight}>
          <button style={styles.iconBtn} onClick={handleNotification}>🔔</button>
          <button style={styles.iconBtn} onClick={handleChat}>💬</button>
          <div style={styles.userChip}>
            <div style={styles.userAvatar}>
              {member.full_name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={styles.userName}>{member.full_name}</p>
              <p style={styles.userRole}>Premium Member</p>
            </div>
          </div>
        </div>
      </header>

      {/* MEMBERSHIP CARD */}
      <div style={styles.membershipCard}>
        <div style={styles.cardPattern}></div>
        <div style={styles.cardPattern2}></div>

        <div style={styles.cardTop}>
          <div>
            <p style={styles.cardLabel}>MEMBERSHIP CARD</p>
            <p style={styles.cardTier}>
              {member.membership_type.toUpperCase()} TIER
            </p>
          </div>
          <div style={styles.cardChip}></div>
        </div>

        <div style={styles.cardBody}>
          <div>
            <p style={styles.cardHolderLabel}>Card Holder</p>
            <h2 style={styles.cardHolder}>{member.full_name}</h2>
          </div>
          <div style={styles.cardRight}>
            <p style={styles.cardHolderLabel}>Member ID</p>
            <p style={styles.cardId}>{member.member_code}</p>
          </div>
        </div>

        <div style={styles.cardBottom}>
          <div>
            <p style={styles.cardMiniLabel}>Status</p>
            <p style={styles.cardMiniValue}>● ACTIVE</p>
          </div>
          <div>
            <p style={styles.cardMiniLabel}>Since</p>
            <p style={styles.cardMiniValue}>2024</p>
          </div>
          <div>
            <p style={styles.cardMiniLabel}>Valid Thru</p>
            <p style={styles.cardMiniValue}>12/26</p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={styles.statsGrid}>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <span style={styles.statLabel}>Total Spending</span>
            <span style={styles.statIcon}>💰</span>
          </div>
          <h2 style={styles.statValue}>
            Rp{" "}
            {Number(
              member.total_spending || 0
            ).toLocaleString()}
          </h2>
          <p style={styles.statTrend}>
            <span style={styles.trendUp}>↑ 12.5%</span> dari bulan lalu
          </p>
        </div>

        <div style={styles.statCard} onClick={handleRewardPoint}>
          <div style={styles.statHeader}>
            <span style={styles.statLabel}>Reward Point</span>
            <span style={styles.statIcon}>⭐</span>
          </div>
          <h2 style={styles.statValue}>
            {rewardPoints.toLocaleString()}
          </h2>
          <p style={styles.statTrend}>
            Setara Rp {(rewardPoints * 100).toLocaleString()}
          </p>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <span style={styles.statLabel}>Status</span>
            <span style={styles.statIcon}>✓</span>
          </div>
          <h2 style={styles.statValue}>
            {member.status}
          </h2>
          <p style={styles.statTrend}>
            <span style={styles.statusDot}></span>
            Akun terverifikasi
          </p>
        </div>

        <div style={styles.statCard} onClick={handleUpgrade}>
          <div style={styles.statHeader}>
            <span style={styles.statLabel}>Membership</span>
            <span style={styles.statIcon}>👑</span>
          </div>
          <h2 style={styles.statValue}>
            {member.membership_type}
          </h2>
          <p style={styles.statTrend}>
            <span style={styles.upgradeLink}>
              Upgrade ke Platinum →
            </span>
          </p>
        </div>

      </div>

      {/* QUICK ACTION + PROFILE ROW */}
      <div style={styles.twoCol}>

        {/* QUICK ACTION */}
        <div style={styles.section}>
          <div style={styles.sectionHead}>
            <h2 style={styles.sectionTitle}>Quick Access</h2>
            <a style={styles.seeAll} onClick={handleSeeAllFeatures}>Semua fitur →</a>
          </div>

          <div style={styles.actionGrid}>
            <button style={styles.actionButton} onClick={handleViewVoucher}>
              <div style={styles.actionIconBox}>🎫</div>
              <div style={styles.actionText}>
                <strong>Lihat Voucher</strong>
                <span>3 voucher aktif</span>
              </div>
              <span style={styles.actionArrow}>→</span>
            </button>

            <button style={styles.actionButton} onClick={handleRewardPoint}>
              <div style={styles.actionIconBox}>⭐</div>
              <div style={styles.actionText}>
                <strong>Reward Point</strong>
                <span>Tukar poin sekarang</span>
              </div>
              <span style={styles.actionArrow}>→</span>
            </button>

            <button style={styles.actionButton} onClick={handleOrderHistory}>
              <div style={styles.actionIconBox}>📦</div>
              <div style={styles.actionText}>
                <strong>Riwayat Pesanan</strong>
                <span>12 transaksi</span>
              </div>
              <span style={styles.actionArrow}>→</span>
            </button>

            <button style={styles.actionButton} onClick={handleEditProfile}>
              <div style={styles.actionIconBox}>👤</div>
              <div style={styles.actionText}>
                <strong>Edit Profil</strong>
                <span>Update data diri</span>
              </div>
              <span style={styles.actionArrow}>→</span>
            </button>
          </div>
        </div>

        {/* PROFILE */}
        <div style={styles.section}>
          <div style={styles.sectionHead}>
            <h2 style={styles.sectionTitle}>Informasi Member</h2>
            <a style={styles.seeAll} onClick={handleEditProfile}>Edit →</a>
          </div>

          <div style={styles.profileHead}>
            <div style={styles.profileAvatar}>
              {member.full_name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 style={styles.profileName}>{member.full_name}</h3>
              <p style={styles.profileSub}>{member.email}</p>
            </div>
          </div>

          <div style={styles.infoList}>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>No. Telepon</span>
              <strong style={styles.infoValue}>{member.phone}</strong>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Jenis Kelamin</span>
              <strong style={styles.infoValue}>{member.gender}</strong>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Alamat</span>
              <strong style={styles.infoValue}>{member.address}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* TRANSACTION */}
      <div style={styles.section}>
        <div style={styles.sectionHead}>
          <h2 style={styles.sectionTitle}>Transaksi Terakhir</h2>
          <div style={styles.tableActions}>
            <button style={styles.filterBtn} onClick={handleFilter}>Filter</button>
            <button style={styles.filterBtn} onClick={handleExport}>Export</button>
            <a style={styles.seeAll} onClick={handleViewAllTransactions}>Lihat semua →</a>
          </div>
        </div>

        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Invoice</th>
                <th>Produk</th>
                <th>Total</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Aksi</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <div style={styles.cellDate}>
                    <strong>12 Jun 2026</strong>
                    <span>14:32 WIB</span>
                  </div>
                </td>
                <td>
                  <code style={styles.code}>INV001</code>
                </td>
                <td>
                  <div style={styles.cellProd}>
                    <div style={styles.prodThumb}>🛋</div>
                    <span>Sofa Premium</span>
                  </div>
                </td>
                <td>
                  <strong>Rp 5.500.000</strong>
                </td>
                <td>
                  <span style={styles.successBadge}>
                    <span style={styles.badgeDot}></span>
                    Selesai
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button 
                    style={styles.rowBtn} 
                    onClick={() => handleViewDetail({
                      invoice: "INV001",
                      date: "12 Jun 2026, 14:32 WIB",
                      product: "Sofa Premium",
                      total: "Rp 5.500.000",
                      status: "Selesai"
                    })}
                  >
                    Detail
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <div style={styles.cellDate}>
                    <strong>18 Jun 2026</strong>
                    <span>09:15 WIB</span>
                  </div>
                </td>
                <td>
                  <code style={styles.code}>INV002</code>
                </td>
                <td>
                  <div style={styles.cellProd}>
                    <div style={styles.prodThumb}>🪑</div>
                    <span>Meja Kerja</span>
                  </div>
                </td>
                <td>
                  <strong>Rp 2.000.000</strong>
                </td>
                <td>
                  <span style={styles.processBadge}>
                    <span style={{ ...styles.badgeDot, background: "#F59E0B" }}></span>
                    Diproses
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button 
                    style={styles.rowBtn} 
                    onClick={() => handleViewDetail({
                      invoice: "INV002",
                      date: "18 Jun 2026, 09:15 WIB",
                      product: "Meja Kerja",
                      total: "Rp 2.000.000",
                      status: "Diproses"
                    })}
                  >
                    Detail
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <div style={styles.cellDate}>
                    <strong>05 Jun 2026</strong>
                    <span>16:48 WIB</span>
                  </div>
                </td>
                <td>
                  <code style={styles.code}>INV003</code>
                </td>
                <td>
                  <div style={styles.cellProd}>
                    <div style={styles.prodThumb}>🛏</div>
                    <span>Kasur King Size</span>
                  </div>
                </td>
                <td>
                  <strong>Rp 8.750.000</strong>
                </td>
                <td>
                  <span style={styles.successBadge}>
                    <span style={styles.badgeDot}></span>
                    Selesai
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button 
                    style={styles.rowBtn} 
                    onClick={() => handleViewDetail({
                      invoice: "INV003",
                      date: "05 Jun 2026, 16:48 WIB",
                      product: "Kasur King Size",
                      total: "Rp 8.750.000",
                      status: "Selesai"
                    })}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={styles.tableFooter}>
          <p>Menampilkan 3 dari 12 transaksi</p>
          <div style={styles.pagination}>
            <button style={styles.pageBtn} onClick={() => handlePageChange("prev")}>‹</button>
            <button style={{ ...styles.pageBtn, ...styles.pageBtnActive }} onClick={() => handlePageChange(1)}>1</button>
            <button style={styles.pageBtn} onClick={() => handlePageChange(2)}>2</button>
            <button style={styles.pageBtn} onClick={() => handlePageChange(3)}>3</button>
            <button style={styles.pageBtn} onClick={() => handlePageChange("next")}>›</button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && selectedTransaction && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Detail Transaksi</h2>
              <button style={styles.modalClose} onClick={handleCloseModal}>✕</button>
            </div>
            
            <div style={styles.modalBody}>
              <div style={styles.modalRow}>
                <span style={styles.modalLabel}>Invoice</span>
                <strong style={styles.modalValue}>{selectedTransaction.invoice}</strong>
              </div>
              <div style={styles.modalRow}>
                <span style={styles.modalLabel}>Tanggal</span>
                <strong style={styles.modalValue}>{selectedTransaction.date}</strong>
              </div>
              <div style={styles.modalRow}>
                <span style={styles.modalLabel}>Produk</span>
                <strong style={styles.modalValue}>{selectedTransaction.product}</strong>
              </div>
              <div style={styles.modalRow}>
                <span style={styles.modalLabel}>Total</span>
                <strong style={{ ...styles.modalValue, color: "#B76E79" }}>{selectedTransaction.total}</strong>
              </div>
              <div style={styles.modalRow}>
                <span style={styles.modalLabel}>Status</span>
                <strong style={styles.modalValue}>{selectedTransaction.status}</strong>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.modalBtnSecondary} onClick={handleCloseModal}>
                Tutup
              </button>
              <button style={styles.modalBtnPrimary} onClick={() => alert("Mencetak invoice...")}>
                🖨️ Cetak Invoice
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const styles = {
  loading: {
    padding: "80px 20px",
    textAlign: "center",
    fontSize: "15px",
    color: "#6B7280",
    background: "#F9FAFB",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
  },

  loadingDot: {
    width: "32px",
    height: "32px",
    border: "3px solid #E5E7EB",
    borderTopColor: "#B76E79",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },

  wrapper: {
    minHeight: "100vh",
    background: "#F3F4F6",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: "24px 32px",
    maxWidth: "1400px",
    margin: "0 auto",
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },

  breadcrumb: {
    fontSize: "13px",
    color: "#9CA3AF",
    marginBottom: "4px",
  },

  breadcrumbSep: {
    margin: "0 6px",
  },

  breadcrumbCurrent: {
    color: "#4B5563",
  },

  pageTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
    color: "#111827",
  },

  topbarRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  iconBtn: {
    width: "40px",
    height: "40px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  userChip: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "6px 12px 6px 6px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    marginLeft: "8px",
    cursor: "pointer",
  },

  userAvatar: {
    width: "32px",
    height: "32px",
    background: "linear-gradient(135deg, #B76E79, #D49AA5)",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "14px",
  },

  userName: {
    margin: 0,
    fontSize: "13px",
    fontWeight: "600",
    color: "#111827",
  },

  userRole: {
    margin: 0,
    fontSize: "11px",
    color: "#9CA3AF",
  },

  /* MEMBERSHIP CARD - ROSE GOLD */
  membershipCard: {
    background:
      "linear-gradient(135deg, #B76E79 0%, #D49AA5 40%, #E8C5CE 70%, #D4A574 100%)",
    color: "#fff",
    borderRadius: "16px",
    padding: "28px",
    marginBottom: "24px",
    position: "relative",
    overflow: "hidden",
    boxShadow:
      "0 10px 30px rgba(183, 110, 121, 0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
  },

  cardPattern: {
    position: "absolute",
    top: "-50%",
    right: "-10%",
    width: "400px",
    height: "400px",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
    borderRadius: "50%",
  },

  cardPattern2: {
    position: "absolute",
    bottom: "-40%",
    left: "-10%",
    width: "350px",
    height: "350px",
    background:
      "radial-gradient(circle, rgba(212,165,116,0.4) 0%, transparent 70%)",
    borderRadius: "50%",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "32px",
    position: "relative",
    zIndex: 1,
  },

  cardLabel: {
    letterSpacing: "2px",
    fontSize: "11px",
    opacity: 0.9,
    margin: "0 0 4px",
    fontWeight: "600",
  },

  cardTier: {
    fontSize: "18px",
    fontWeight: "700",
    margin: 0,
    letterSpacing: "1px",
  },

  cardChip: {
    width: "48px",
    height: "36px",
    background:
      "linear-gradient(135deg, #F4D48A 0%, #D4A574 50%, #B8864A 100%)",
    borderRadius: "6px",
    boxShadow:
      "inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.2)",
    position: "relative",
  },

  cardBody: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "32px",
    position: "relative",
    zIndex: 1,
  },

  cardHolderLabel: {
    fontSize: "10px",
    letterSpacing: "1.5px",
    opacity: 0.85,
    margin: "0 0 6px",
    textTransform: "uppercase",
    fontWeight: "600",
  },

  cardHolder: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    textShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },

  cardRight: {
    textAlign: "right",
  },

  cardId: {
    margin: 0,
    fontSize: "18px",
    fontFamily: "monospace",
    letterSpacing: "2px",
    fontWeight: "600",
  },

  cardBottom: {
    display: "flex",
    gap: "40px",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255,255,255,0.3)",
    position: "relative",
    zIndex: 1,
  },

  cardMiniLabel: {
    fontSize: "10px",
    letterSpacing: "1.5px",
    opacity: 0.85,
    margin: "0 0 4px",
    textTransform: "uppercase",
    fontWeight: "600",
  },

  cardMiniValue: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "16px",
    marginBottom: "24px",
  },

  statCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #E5E7EB",
    cursor: "pointer",
    transition: "all 0.2s",
  },

  statHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },

  statLabel: {
    fontSize: "13px",
    color: "#6B7280",
    fontWeight: "500",
  },

  statIcon: {
    width: "32px",
    height: "32px",
    background: "#F3F4F6",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },

  statValue: {
    margin: "0 0 8px",
    fontSize: "24px",
    fontWeight: "700",
    color: "#111827",
  },

  statTrend: {
    margin: 0,
    fontSize: "12px",
    color: "#6B7280",
  },

  trendUp: {
    color: "#059669",
    fontWeight: "600",
  },

  statusDot: {
    display: "inline-block",
    width: "6px",
    height: "6px",
    background: "#10B981",
    borderRadius: "50%",
    marginRight: "6px",
    verticalAlign: "middle",
  },

  upgradeLink: {
    color: "#B76E79",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
  },

  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "16px",
  },

  section: {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid #E5E7EB",
    marginBottom: "16px",
  },

  sectionHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "700",
    color: "#111827",
  },

  seeAll: {
    fontSize: "13px",
    color: "#B76E79",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
  },

  actionGrid: {
    display: "grid",
    gap: "10px",
  },

  actionButton: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.15s",
  },

  actionIconBox: {
    width: "40px",
    height: "40px",
    background: "#FDF2F4",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0,
  },

  actionText: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },

  actionArrow: {
    color: "#9CA3AF",
    fontSize: "16px",
  },

  profileHead: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "20px",
    paddingBottom: "20px",
    borderBottom: "1px solid #F3F4F6",
  },

  profileAvatar: {
    width: "52px",
    height: "52px",
    background: "linear-gradient(135deg, #B76E79, #D49AA5)",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "20px",
  },

  profileName: {
    margin: "0 0 2px",
    fontSize: "16px",
    fontWeight: "700",
    color: "#111827",
  },

  profileSub: {
    margin: 0,
    fontSize: "13px",
    color: "#6B7280",
  },

  infoList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    paddingBottom: "14px",
    borderBottom: "1px solid #F9FAFB",
  },

  infoLabel: {
    fontSize: "13px",
    color: "#6B7280",
    flexShrink: 0,
  },

  infoValue: {
    fontSize: "13px",
    color: "#111827",
    textAlign: "right",
    fontWeight: "500",
  },

  tableActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  filterBtn: {
    padding: "6px 12px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#4B5563",
    cursor: "pointer",
  },

  tableWrap: {
    overflowX: "auto",
    margin: "0 -24px",
    padding: "0 24px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },

  code: {
    background: "#F3F4F6",
    padding: "3px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    fontFamily: "monospace",
    color: "#4B5563",
  },

  cellDate: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },

  cellProd: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  prodThumb: {
    width: "36px",
    height: "36px",
    background: "#F3F4F6",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
  },

  successBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "#D1FAE5",
    color: "#065F46",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
  },

  processBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "#FEF3C7",
    color: "#92400E",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
  },

  badgeDot: {
    width: "6px",
    height: "6px",
    background: "#10B981",
    borderRadius: "50%",
  },

  rowBtn: {
    padding: "6px 12px",
    background: "transparent",
    border: "1px solid #E5E7EB",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "500",
    color: "#4B5563",
    cursor: "pointer",
  },

  tableFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    paddingTop: "16px",
    borderTop: "1px solid #F3F4F6",
    fontSize: "13px",
    color: "#6B7280",
  },

  pagination: {
    display: "flex",
    gap: "4px",
  },

  pageBtn: {
    width: "32px",
    height: "32px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#4B5563",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  pageBtnActive: {
    background: "#111827",
    color: "#fff",
    borderColor: "#111827",
  },

  /* MODAL */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    animation: "fadeIn 0.2s",
  },

  modalContent: {
    background: "#fff",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    animation: "slideUp 0.3s",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid #E5E7EB",
  },

  modalTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    color: "#111827",
  },

  modalClose: {
    width: "32px",
    height: "32px",
    background: "#F3F4F6",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  modalBody: {
    padding: "24px",
  },

  modalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #F3F4F6",
  },

  modalLabel: {
    fontSize: "14px",
    color: "#6B7280",
  },

  modalValue: {
    fontSize: "14px",
    color: "#111827",
    fontWeight: "600",
  },

  modalFooter: {
    display: "flex",
    gap: "10px",
    padding: "16px 24px",
    borderTop: "1px solid #E5E7EB",
    justifyContent: "flex-end",
  },

  modalBtnSecondary: {
    padding: "10px 20px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#4B5563",
    cursor: "pointer",
  },

  modalBtnPrimary: {
    padding: "10px 20px",
    background: "#B76E79",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#fff",
    cursor: "pointer",
  },
};

export default MemberDashboard;