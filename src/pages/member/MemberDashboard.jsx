import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

function MemberDashboard() {
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // ✅ STATE BARU UNTUK MODAL TAMBAHAN
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showAllFeaturesModal, setShowAllFeaturesModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeData, setUpgradeData] = useState({
    targetTier: "Platinum",
    ktp: "",
    phone: "",
    reason: "",
    agree: false,
  });

  // ✅ DATA NOTIFIKASI
  const notifications = [
    {
      id: 1,
      icon: "🎫",
      title: "Voucher Baru Tersedia!",
      desc: "Voucher diskon 20% siap diklaim. Berlaku hingga 30 Juni 2026.",
      time: "5 menit lalu",
      unread: true,
    },
    {
      id: 2,
      icon: "📦",
      title: "Pesanan INV002 Sedang Diproses",
      desc: "Pesanan Meja Kerja Anda sedang dalam tahap pengemasan.",
      time: "1 jam lalu",
      unread: true,
    },
    {
      id: 3,
      icon: "⭐",
      title: "Reward Point Bertambah",
      desc: "Anda mendapatkan 500 poin dari transaksi terakhir.",
      time: "2 jam lalu",
      unread: true,
    },
    {
      id: 4,
      icon: "🎉",
      title: "Promo Spesial Member",
      desc: "Dapatkan cashback 10% untuk pembelian furniture di atas Rp 5 juta.",
      time: "1 hari lalu",
      unread: false,
    },
    {
      id: 5,
      icon: "✅",
      title: "Pesanan INV001 Selesai",
      desc: "Sofa Premium telah sampai. Jangan lupa beri ulasan!",
      time: "2 hari lalu",
      unread: false,
    },
  ];

  // ✅ DATA SEMUA FITUR
  const allFeatures = [
    { icon: "🎫", title: "Voucher Saya", desc: "Kelola voucher aktif", route: "/member/rewards" },
    { icon: "⭐", title: "Reward Point", desc: "Tukar poin dengan hadiah", route: "/member/rewards" },
    { icon: "📦", title: "Riwayat Pesanan", desc: "Lihat semua transaksi", route: "/member/orders" },
    { icon: "👤", title: "Edit Profil", desc: "Update data diri", route: "/member/profile" },
    { icon: "📊", title: "Riwayat Aktivitas", desc: "Log aktivitas akun", route: "/member/history" },
    { icon: "💳", title: "Metode Pembayaran", desc: "Kelola metode bayar", route: "/member/profile" },
    { icon: "🏠", title: "Alamat Saya", desc: "Kelola alamat pengiriman", route: "/member/profile" },
    { icon: "🔔", title: "Notifikasi", desc: "Pengaturan notifikasi", route: "/member/profile" },
    { icon: "🎁", title: "Referral Program", desc: "Ajak teman & dapat bonus", route: "/member/rewards" },
    { icon: "💬", title: "Pusat Bantuan", desc: "FAQ & kontak CS", route: "/member/profile" },
    { icon: "🔒", title: "Keamanan Akun", desc: "Password & 2FA", route: "/member/profile" },
    { icon: "📝", title: "Ulasan Saya", desc: "Riwayat ulasan produk", route: "/member/orders" },
  ];

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

  // Handlers (DIMODIFIKASI)
  const handleNotification = () => {
    setShowNotificationModal(true);
  };

  const handleChat = () => {
    alert("Membuka chat dengan Customer Service...");
  };

  const handleViewVoucher = () => {
    navigate("/member/rewards");
  };

  const handleRewardPoint = () => {
    navigate("/member/rewards");
  };

  const handleOrderHistory = () => {
    navigate("/member/history");
  };

  const handleEditProfile = () => {
    navigate("/member/profile");
  };

  const handleSeeAllFeatures = () => {
    setShowAllFeaturesModal(true);
  };

  const handleUpgrade = () => {
    setUpgradeData({
      targetTier: "Platinum",
      ktp: "",
      phone: member?.phone || "",
      reason: "",
      agree: false,
    });
    setShowUpgradeModal(true);
  };

  const handleFilter = () => {
    alert("Membuka filter transaksi...\n\nFilter berdasarkan:\n• Status (Selesai, Diproses, Batal)\n• Tanggal\n• Kategori produk");
  };

  const handleExport = () => {
    alert("Mengexport data transaksi ke CSV...\n\nFile akan diunduh dalam beberapa saat.");
  };

  const handleViewAllTransactions = () => {
    navigate("/member/orders");
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

  // ✅ HANDLER BARU: SUBMIT UPGRADE
  const handleSubmitUpgrade = () => {
    if (!upgradeData.ktp.trim()) {
      alert("Mohon isi nomor KTP!");
      return;
    }
    if (!upgradeData.phone.trim()) {
      alert("Mohon isi nomor telepon!");
      return;
    }
    if (!upgradeData.reason.trim()) {
      alert("Mohon isi alasan upgrade!");
      return;
    }
    if (!upgradeData.agree) {
      alert("Mohon centang persetujuan syarat & ketentuan!");
      return;
    }

    alert(
      `Permintaan Upgrade Berhasil Diajukan!\n\n` +
        `Tier Tujuan: ${upgradeData.targetTier}\n` +
        `No. KTP: ${upgradeData.ktp}\n` +
        `No. HP: ${upgradeData.phone}\n\n` +
        `Tim admin akan memverifikasi data Anda dalam 1x24 jam.\n` +
        `Anda akan menerima notifikasi melalui email.`
    );

    setShowUpgradeModal(false);
  };

  // ✅ HANDLER BARU: KLIK NOTIFIKASI
  const handleNotificationClick = (notif) => {
    alert(`Membuka detail: ${notif.title}\n\n${notif.desc}`);
  };

  // ✅ HANDLER BARU: KLIK FITUR
  const handleFeatureClick = (route) => {
    setShowAllFeaturesModal(false);
    navigate(route);
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
          <button style={styles.iconBtn} onClick={handleNotification}>
            🔔
            <span style={styles.notifBadge}>
              {notifications.filter((n) => n.unread).length}
            </span>
          </button>
          <button style={styles.iconBtn} onClick={handleChat}>💬</button>
          <div style={styles.userChip} onClick={handleEditProfile}>
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

      {/* MODAL DETAIL TRANSAKSI */}
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

      {/* ✅ MODAL NOTIFIKASI */}
      {showNotificationModal && (
        <div style={styles.modalOverlay} onClick={() => setShowNotificationModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div>
                <h2 style={styles.modalTitle}>🔔 Notifikasi</h2>
                <p style={styles.modalSubtitle}>
                  {notifications.filter((n) => n.unread).length} notifikasi belum dibaca
                </p>
              </div>
              <button style={styles.modalClose} onClick={() => setShowNotificationModal(false)}>✕</button>
            </div>
            
            <div style={styles.modalBody}>
              <div style={styles.notifList}>
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    style={{
                      ...styles.notifItem,
                      background: notif.unread ? "#FDF2F4" : "#fff",
                    }}
                    onClick={() => handleNotificationClick(notif)}
                  >
                    <div style={styles.notifIcon}>{notif.icon}</div>
                    <div style={styles.notifContent}>
                      <div style={styles.notifHeader}>
                        <strong style={styles.notifTitle}>{notif.title}</strong>
                        {notif.unread && <span style={styles.notifUnread}></span>}
                      </div>
                      <p style={styles.notifDesc}>{notif.desc}</p>
                      <p style={styles.notifTime}>{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.modalBtnSecondary} onClick={() => setShowNotificationModal(false)}>
                Tutup
              </button>
              <button style={styles.modalBtnPrimary} onClick={() => alert("Menandai semua sebagai dibaca...")}>
                ✓ Tandai Semua Dibaca
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ MODAL SEMUA FITUR */}
      {showAllFeaturesModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAllFeaturesModal(false)}>
          <div style={{ ...styles.modalContent, maxWidth: "600px" }} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div>
                <h2 style={styles.modalTitle}>Semua Fitur</h2>
                <p style={styles.modalSubtitle}>Akses cepat ke semua layanan member</p>
              </div>
              <button style={styles.modalClose} onClick={() => setShowAllFeaturesModal(false)}>✕</button>
            </div>
            
            <div style={styles.modalBody}>
              <div style={styles.featuresGrid}>
                {allFeatures.map((feature, idx) => (
                  <button
                    key={idx}
                    style={styles.featureItem}
                    onClick={() => handleFeatureClick(feature.route)}
                  >
                    <div style={styles.featureIcon}>{feature.icon}</div>
                    <div style={styles.featureText}>
                      <strong style={styles.featureTitle}>{feature.title}</strong>
                      <span style={styles.featureDesc}>{feature.desc}</span>
                    </div>
                    <span style={styles.featureArrow}>→</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.modalBtnSecondary} onClick={() => setShowAllFeaturesModal(false)}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ MODAL UPGRADE MEMBERSHIP */}
      {showUpgradeModal && (
        <div style={styles.modalOverlay} onClick={() => setShowUpgradeModal(false)}>
          <div style={{ ...styles.modalContent, maxWidth: "550px" }} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div>
                <h2 style={styles.modalTitle}>👑 Upgrade Membership</h2>
                <p style={styles.modalSubtitle}>Upgrade ke tier Platinum</p>
              </div>
              <button style={styles.modalClose} onClick={() => setShowUpgradeModal(false)}>✕</button>
            </div>
            
            <div style={styles.modalBody}>
              {/* Info Platinum */}
              <div style={styles.upgradeInfoBox}>
                <h4 style={styles.upgradeInfoTitle}>Keuntungan Platinum:</h4>
                <ul style={styles.upgradeInfoList}>
                  <li>Diskon hingga 30% untuk semua produk</li>
                  <li>Prioritas customer service 24/7</li>
                  <li>Free shipping tanpa minimum belanja</li>
                  <li>Early access promo eksklusif</li>
                  <li>Gift ulang tahun spesial</li>
                </ul>
              </div>

              {/* Form Data */}
              <div style={styles.upgradeForm}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Tier Tujuan</label>
                  <select
                    style={styles.formInput}
                    value={upgradeData.targetTier}
                    onChange={(e) => setUpgradeData({ ...upgradeData, targetTier: e.target.value })}
                  >
                    <option value="Platinum">Platinum</option>
                    <option value="Gold">Gold</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Nomor KTP</label>
                  <input
                    type="text"
                    style={styles.formInput}
                    placeholder="Masukkan nomor KTP"
                    value={upgradeData.ktp}
                    onChange={(e) => setUpgradeData({ ...upgradeData, ktp: e.target.value })}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Nomor Telepon</label>
                  <input
                    type="tel"
                    style={styles.formInput}
                    placeholder="08xxxxxxxxxx"
                    value={upgradeData.phone}
                    onChange={(e) => setUpgradeData({ ...upgradeData, phone: e.target.value })}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Alasan Upgrade</label>
                  <textarea
                    style={styles.formTextarea}
                    placeholder="Jelaskan alasan Anda ingin upgrade membership..."
                    value={upgradeData.reason}
                    onChange={(e) => setUpgradeData({ ...upgradeData, reason: e.target.value })}
                    rows="3"
                  />
                </div>

                <div style={styles.formCheck}>
                  <input
                    type="checkbox"
                    id="agree"
                    checked={upgradeData.agree}
                    onChange={(e) => setUpgradeData({ ...upgradeData, agree: e.target.checked })}
                    style={styles.formCheckbox}
                  />
                  <label htmlFor="agree" style={styles.formCheckLabel}>
                    Saya menyetujui syarat & ketentuan upgrade membership
                  </label>
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.modalBtnSecondary} onClick={() => setShowUpgradeModal(false)}>
                Batal
              </button>
              <button style={styles.modalBtnPrimary} onClick={handleSubmitUpgrade}>
                Ajukan Upgrade
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
    position: "relative",
  },

  // ✅ STYLE BARU: BADGE NOTIFIKASI
  notifBadge: {
    position: "absolute",
    top: "-4px",
    right: "-4px",
    background: "#EF4444",
    color: "#fff",
    fontSize: "10px",
    fontWeight: "700",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #fff",
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
    maxHeight: "90vh",
    overflowY: "auto",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px 24px",
    borderBottom: "1px solid #E5E7EB",
  },

  modalTitle: {
    margin: "0 0 4px",
    fontSize: "18px",
    fontWeight: "700",
    color: "#111827",
  },

  modalSubtitle: {
    margin: 0,
    fontSize: "13px",
    color: "#6B7280",
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

  // ✅ STYLE BARU: NOTIFIKASI
  notifList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  notifItem: {
    display: "flex",
    gap: "12px",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #E5E7EB",
    cursor: "pointer",
    transition: "all 0.2s",
  },

  notifIcon: {
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

  notifContent: {
    flex: 1,
  },

  notifHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "4px",
  },

  notifTitle: {
    fontSize: "14px",
    color: "#111827",
  },

  notifUnread: {
    width: "6px",
    height: "6px",
    background: "#EF4444",
    borderRadius: "50%",
  },

  notifDesc: {
    margin: "0 0 6px",
    fontSize: "13px",
    color: "#6B7280",
    lineHeight: 1.5,
  },

  notifTime: {
    margin: 0,
    fontSize: "11px",
    color: "#9CA3AF",
  },

  // ✅ STYLE BARU: SEMUA FITUR
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },

  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.15s",
  },

  featureIcon: {
    width: "36px",
    height: "36px",
    background: "#FDF2F4",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    flexShrink: 0,
  },

  featureText: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },

  featureTitle: {
    fontSize: "13px",
    color: "#111827",
  },

  featureDesc: {
    fontSize: "11px",
    color: "#6B7280",
  },

  featureArrow: {
    color: "#9CA3AF",
    fontSize: "14px",
  },

  // ✅ STYLE BARU: UPGRADE FORM
  upgradeInfoBox: {
    background: "linear-gradient(135deg, #FDF2F4 0%, #FEE2E2 100%)",
    border: "1px solid #FECACA",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "20px",
  },

  upgradeInfoTitle: {
    margin: "0 0 10px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#B76E79",
  },

  upgradeInfoList: {
    margin: 0,
    paddingLeft: "20px",
    fontSize: "13px",
    color: "#4B5563",
    lineHeight: 1.8,
  },

  upgradeForm: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  formLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
  },

  formInput: {
    padding: "10px 12px",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
  },

  formTextarea: {
    padding: "10px 12px",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
    resize: "vertical",
  },

  formCheck: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
  },

  formCheckbox: {
    marginTop: "2px",
    cursor: "pointer",
  },

  formCheckLabel: {
    fontSize: "12px",
    color: "#6B7280",
    lineHeight: 1.5,
    cursor: "pointer",
  },
};

export default MemberDashboard;