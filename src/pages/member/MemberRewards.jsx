import { useState } from "react";

function MemberPoints() {
  const [points] = useState(15250);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const itemsPerPage = 5;

  const histories = [
    {
      id: 1,
      title: "Belanja Sofa Premium",
      description: "Transaksi INV-2026-001",
      point: 500,
      type: "earn",
      date: "12 Juni 2026",
      time: "14:32",
      icon: "🛋",
      category: "Transaksi",
    },
    {
      id: 2,
      title: "Tukar Voucher Diskon 20%",
      description: "VCR-20-JUN • Berlaku s/d 30 Juni",
      point: -1000,
      type: "redeem",
      date: "10 Juni 2026",
      time: "09:15",
      icon: "🎫",
      category: "Penukaran",
    },
    {
      id: 3,
      title: "Belanja Lemari Minimalis",
      description: "Transaksi INV-2026-003",
      point: 350,
      type: "earn",
      date: "05 Juni 2026",
      time: "16:48",
      icon: "🗄",
      category: "Transaksi",
    },
    {
      id: 4,
      title: "Bonus Member Baru",
      description: "Promo pendaftaran member",
      point: 1000,
      type: "earn",
      date: "01 Juni 2026",
      time: "10:00",
      icon: "🎁",
      category: "Bonus",
    },
    {
      id: 5,
      title: "Tukar Gratis Ongkir",
      description: "VCR-FREE-SHIP",
      point: -500,
      type: "redeem",
      date: "28 Mei 2026",
      time: "13:45",
      icon: "🚚",
      category: "Penukaran",
    },
    {
      id: 6,
      title: "Belanja Kasur King Size",
      description: "Transaksi INV-2026-004",
      point: 875,
      type: "earn",
      date: "20 Mei 2026",
      time: "10:30",
      icon: "🛏",
      category: "Transaksi",
    },
    {
      id: 7,
      title: "Tukar Cashback Rp100.000",
      description: "VCR-CASHBACK-100",
      point: -2000,
      type: "redeem",
      date: "15 Mei 2026",
      time: "11:20",
      icon: "💰",
      category: "Penukaran",
    },
    {
      id: 8,
      title: "Referral Bonus",
      description: "Mengundang teman bergabung",
      point: 2000,
      type: "earn",
      date: "10 Mei 2026",
      time: "09:00",
      icon: "👥",
      category: "Bonus",
    },
    {
      id: 9,
      title: "Poin Hangus",
      description: "Poin kadaluarsa 12 bulan",
      point: -150,
      type: "expire",
      date: "01 Mei 2026",
      time: "00:00",
      icon: "⏰",
      category: "Hangus",
    },
  ];

  const rewards = [
    {
      id: 1,
      title: "Voucher Diskon 20%",
      description: "Untuk semua produk furniture",
      points: 1000,
      icon: "🎫",
      stock: 15,
      popular: true,
    },
    {
      id: 2,
      title: "Gratis Ongkir",
      description: "Seluruh Indonesia, min. belanja 500rb",
      points: 500,
      icon: "🚚",
      stock: 30,
    },
    {
      id: 3,
      title: "Cashback Rp100.000",
      description: "Langsung masuk ke e-wallet",
      points: 2000,
      icon: "💰",
      stock: 8,
      popular: true,
    },
    {
      id: 4,
      title: "Cashback Rp250.000",
      description: "Untuk transaksi di atas 2 juta",
      points: 5000,
      icon: "💎",
      stock: 5,
    },
    {
      id: 5,
      title: "Diskon 50% Aksesori",
      description: "Khusus kategori aksesori",
      points: 750,
      icon: "🏷",
      stock: 20,
    },
    {
      id: 6,
      title: "Free Assembly Service",
      description: "Jasa pasang gratis untuk furniture",
      points: 3000,
      icon: "🔧",
      stock: 10,
    },
  ];

  // Filter & search
  const filteredHistories = histories.filter((item) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "earn" && item.type === "earn") ||
      (activeFilter === "redeem" && item.type === "redeem") ||
      (activeFilter === "expire" && item.type === "expire");
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredHistories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHistories = filteredHistories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Stats
  const earnedThisMonth = histories
    .filter((h) => h.type === "earn" && h.date.includes("Juni"))
    .reduce((sum, h) => sum + h.point, 0);
  const redeemedThisMonth = histories
    .filter((h) => h.type === "redeem" && h.date.includes("Juni"))
    .reduce((sum, h) => sum + Math.abs(h.point), 0);
  const nextReward = 500;
  const progressToNext = Math.min((points % nextReward) / nextReward * 100, 100);

  // Handlers
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleRedeemClick = () => {
    setShowRedeemModal(true);
  };

  const handleCloseModal = () => {
    setShowRedeemModal(false);
    setSelectedReward(null);
  };

  const handleSelectReward = (reward) => {
    setSelectedReward(reward);
  };

  const handleConfirmRedeem = () => {
    if (selectedReward) {
      alert(
        `Berhasil menukar ${selectedReward.points} poin!\n\nReward: ${selectedReward.title}\n\nSisa poin Anda: ${(points - selectedReward.points).toLocaleString()}`
      );
      handleCloseModal();
    }
  };

  const handleViewDetail = (item) => {
    alert(
      `Detail Aktivitas\n\n${item.title}\n${item.description}\n\nPoin: ${item.point > 0 ? "+" : ""}${item.point}\nTanggal: ${item.date}, ${item.time}\nKategori: ${item.category}`
    );
  };

  const handleExport = () => {
    alert("Mengexport riwayat poin ke CSV...");
  };

  const handleHowToEarn = () => {
    alert(
      "Cara Mendapatkan Poin:\n\n• Belanja produk: Rp 10.000 = 1 poin\n• Referral teman: 2.000 poin\n• Review produk: 100 poin\n• Login harian: 10 poin\n• Ulang tahun member: 500 poin"
    );
  };

  const filters = [
    { key: "all", label: "Semua", count: histories.length },
    { key: "earn", label: "Didapat", count: histories.filter((h) => h.type === "earn").length },
    { key: "redeem", label: "Ditukar", count: histories.filter((h) => h.type === "redeem").length },
    { key: "expire", label: "Hangus", count: histories.filter((h) => h.type === "expire").length },
  ];

  return (
    <div style={styles.wrapper}>

      {/* HEADER */}
      <header style={styles.header}>
        <div>
          <div style={styles.breadcrumb}>
            <span>Dashboard</span>
            <span style={styles.breadcrumbSep}>/</span>
            <span style={styles.breadcrumbCurrent}>Reward Point</span>
          </div>
          <h1 style={styles.pageTitle}>Reward Point</h1>
          <p style={styles.pageSubtitle}>
            Kelola dan tukarkan poin reward membership Anda
          </p>
        </div>

        <div style={styles.headerActions}>
          <button style={styles.headerBtn} onClick={handleHowToEarn}>
            ❓ Cara Dapat Poin
          </button>
          <button style={styles.headerBtnPrimary} onClick={handleExport}>
            📥 Export
          </button>
        </div>
      </header>

      {/* POINTS HERO CARD */}
      <div style={styles.heroCard}>
        <div style={styles.heroPattern}></div>
        <div style={styles.heroPattern2}></div>

        <div style={styles.heroContent}>
          <div style={styles.heroLeft}>
            <p style={styles.heroLabel}>TOTAL REWARD POINT</p>
            <div style={styles.heroPoints}>
              <h1 style={styles.heroValue}>
                {points.toLocaleString()}
              </h1>
              <span style={styles.heroBadge}>Gold Member</span>
            </div>
            <p style={styles.heroEquiv}>
              Setara dengan Rp {(points * 100).toLocaleString()}
            </p>

            <div style={styles.heroProgress}>
              <div style={styles.progressHeader}>
                <span style={styles.progressLabel}>
                  {nextReward - (points % nextReward)} poin lagi untuk reward berikutnya
                </span>
                <span style={styles.progressPercent}>
                  {Math.round(progressToNext)}%
                </span>
              </div>
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${progressToNext}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div style={styles.heroRight}>
            <div style={styles.heroCircle}>
              <span style={styles.heroCircleIcon}>⭐</span>
              <span style={styles.heroCircleText}>REWARD</span>
            </div>
            <button style={styles.heroBtn} onClick={handleRedeemClick}>
              Tukar Poin →
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIconBox}>💰</div>
          <div>
            <p style={styles.statLabel}>Poin Bulan Ini</p>
            <h2 style={styles.statValue}>+{earnedThisMonth.toLocaleString()}</h2>
            <p style={styles.statTrend}>
              <span style={styles.trendUp}>↑ 15%</span> dari bulan lalu
            </p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIconBox}>🎁</div>
          <div>
            <p style={styles.statLabel}>Poin Ditukar</p>
            <h2 style={styles.statValue}>-{redeemedThisMonth.toLocaleString()}</h2>
            <p style={styles.statTrend}>2 voucher diklaim</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIconBox}>📊</div>
          <div>
            <p style={styles.statLabel}>Total Transaksi</p>
            <h2 style={styles.statValue}>12</h2>
            <p style={styles.statTrend}>Menghasilkan poin</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIconBox}>⏰</div>
          <div>
            <p style={styles.statLabel}>Kadaluarsa</p>
            <h2 style={styles.statValue}>30 Juni 2027</h2>
            <p style={styles.statTrend}>365 hari lagi</p>
          </div>
        </div>
      </div>

      {/* REWARDS CATALOG */}
      <div style={styles.section}>
        <div style={styles.sectionHead}>
          <div>
            <h2 style={styles.sectionTitle}>Tukar Dengan Reward</h2>
            <p style={styles.sectionSubtitle}>
              Pilih reward yang ingin Anda tukarkan
            </p>
          </div>
          <a style={styles.seeAll}>Lihat semua →</a>
        </div>

        <div style={styles.rewardsGrid}>
          {rewards.map((reward) => {
            const canRedeem = points >= reward.points;
            return (
              <div
                key={reward.id}
                style={{
                  ...styles.rewardCard,
                  opacity: canRedeem ? 1 : 0.6,
                }}
              >
                {reward.popular && (
                  <span style={styles.popularBadge}>🔥 Populer</span>
                )}
                <div style={styles.rewardIconBox}>{reward.icon}</div>
                <h3 style={styles.rewardTitle}>{reward.title}</h3>
                <p style={styles.rewardDesc}>{reward.description}</p>
                <div style={styles.rewardFooter}>
                  <div>
                    <p style={styles.rewardPointsLabel}>Butuh</p>
                    <p style={styles.rewardPointsValue}>
                      {reward.points.toLocaleString()}
                      <span style={styles.rewardPointsUnit}> poin</span>
                    </p>
                  </div>
                  <button
                    style={{
                      ...styles.rewardBtn,
                      ...(canRedeem ? {} : styles.rewardBtnDisabled),
                    }}
                    onClick={() => {
                      if (canRedeem) {
                        setSelectedReward(reward);
                        setShowRedeemModal(true);
                      } else {
                        alert(
                          `Poin Anda belum cukup.\n\nButuh: ${reward.points.toLocaleString()} poin\nAnda memiliki: ${points.toLocaleString()} poin\nKurang: ${(reward.points - points).toLocaleString()} poin`
                        );
                      }
                    }}
                    disabled={!canRedeem}
                  >
                    {canRedeem ? "Tukar" : "Kurang"}
                  </button>
                </div>
                <p style={styles.rewardStock}>
                  Sisa {reward.stock} voucher
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FILTER BAR */}
      <div style={styles.filterBar}>
        <div style={styles.searchBox}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Cari aktivitas poin..."
            style={styles.searchInput}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div style={styles.filterPills}>
          {filters.map((filter) => (
            <button
              key={filter.key}
              style={{
                ...styles.pill,
                ...(activeFilter === filter.key ? styles.pillActive : {}),
              }}
              onClick={() => handleFilterChange(filter.key)}
            >
              {filter.label}
              <span
                style={{
                  ...styles.pillCount,
                  ...(activeFilter === filter.key ? styles.pillCountActive : {}),
                }}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* HISTORY LIST */}
      {paginatedHistories.length > 0 ? (
        <div style={styles.section}>
          <div style={styles.sectionHead}>
            <h2 style={styles.sectionTitle}>
              Riwayat Poin ({filteredHistories.length})
            </h2>
            <span style={styles.sectionCount}>
              Halaman {currentPage} dari {totalPages}
            </span>
          </div>

          <div style={styles.historyList}>
            {paginatedHistories.map((item) => {
              const isPositive = item.point > 0;
              const isExpire = item.type === "expire";
              return (
                <div
                  key={item.id}
                  style={styles.historyItem}
                  onClick={() => handleViewDetail(item)}
                >
                  <div
                    style={{
                      ...styles.historyIconBox,
                      background: isPositive
                        ? "#D1FAE5"
                        : isExpire
                        ? "#FEE2E2"
                        : "#FEF3C7",
                    }}
                  >
                    {item.icon}
                  </div>

                  <div style={styles.historyContent}>
                    <div style={styles.historyTop}>
                      <h3 style={styles.historyTitle}>{item.title}</h3>
                      <span
                        style={{
                          ...styles.historyCategory,
                          background: isPositive
                            ? "#D1FAE5"
                            : isExpire
                            ? "#FEE2E2"
                            : "#FEF3C7",
                          color: isPositive
                            ? "#065F46"
                            : isExpire
                            ? "#991B1B"
                            : "#92400E",
                        }}
                      >
                        {item.category}
                      </span>
                    </div>
                    <p style={styles.historyDesc}>{item.description}</p>
                    <p style={styles.historyDate}>
                      {item.date} • {item.time}
                    </p>
                  </div>

                  <div style={styles.historyPoint}>
                    <span
                      style={{
                        ...styles.pointValue,
                        color: isPositive
                          ? "#059669"
                          : isExpire
                          ? "#DC2626"
                          : "#D97706",
                      }}
                    >
                      {isPositive ? "+" : ""}
                      {item.point.toLocaleString()}
                    </span>
                    <span style={styles.pointLabel}>poin</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>🔍</div>
          <h3 style={styles.emptyTitle}>Tidak ada aktivitas ditemukan</h3>
          <p style={styles.emptyDesc}>
            Coba ubah filter atau kata kunci pencarian Anda
          </p>
          <button
            style={styles.emptyBtn}
            onClick={() => {
              setActiveFilter("all");
              setSearchQuery("");
            }}
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div style={styles.paginationWrap}>
          <p style={styles.paginationInfo}>
            Menampilkan {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, filteredHistories.length)} dari{" "}
            {filteredHistories.length} aktivitas
          </p>
          <div style={styles.pagination}>
            <button
              style={{
                ...styles.pageBtn,
                ...(currentPage === 1 ? styles.pageBtnDisabled : {}),
              }}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹ Sebelumnya
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  style={{
                    ...styles.pageBtn,
                    ...(currentPage === page ? styles.pageBtnActive : {}),
                  }}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            )}
            <button
              style={{
                ...styles.pageBtn,
                ...(currentPage === totalPages ? styles.pageBtnDisabled : {}),
              }}
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
              disabled={currentPage === totalPages}
            >
              Selanjutnya ›
            </button>
          </div>
        </div>
      )}

      {/* REDEEM MODAL */}
      {showRedeemModal && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Tukar Reward Point</h2>
              <button style={styles.modalClose} onClick={handleCloseModal}>
                ✕
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.modalBalance}>
                <span style={styles.modalBalanceLabel}>Poin Anda</span>
                <h3 style={styles.modalBalanceValue}>
                  {points.toLocaleString()}
                </h3>
              </div>

              {!selectedReward ? (
                <>
                  <h4 style={styles.modalSectionTitle}>Pilih Reward</h4>
                  <div style={styles.modalRewardsList}>
                    {rewards.map((reward) => {
                      const canRedeem = points >= reward.points;
                      return (
                        <div
                          key={reward.id}
                          style={{
                            ...styles.modalRewardItem,
                            opacity: canRedeem ? 1 : 0.5,
                            cursor: canRedeem ? "pointer" : "not-allowed",
                          }}
                          onClick={() => canRedeem && handleSelectReward(reward)}
                        >
                          <div style={styles.modalRewardIcon}>
                            {reward.icon}
                          </div>
                          <div style={styles.modalRewardInfo}>
                            <h5 style={styles.modalRewardTitle}>
                              {reward.title}
                            </h5>
                            <p style={styles.modalRewardPoints}>
                              {reward.points.toLocaleString()} poin
                            </p>
                          </div>
                          {!canRedeem && (
                            <span style={styles.modalRewardInsufficient}>
                              Kurang
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div style={styles.modalSelectedReward}>
                    <div style={styles.modalSelectedIcon}>
                      {selectedReward.icon}
                    </div>
                    <div>
                      <h3 style={styles.modalSelectedTitle}>
                        {selectedReward.title}
                      </h3>
                      <p style={styles.modalSelectedDesc}>
                        {selectedReward.description}
                      </p>
                    </div>
                  </div>

                  <div style={styles.modalSummary}>
                    <div style={styles.modalSummaryRow}>
                      <span>Poin saat ini</span>
                      <strong>{points.toLocaleString()}</strong>
                    </div>
                    <div style={styles.modalSummaryRow}>
                      <span>Biaya tukar</span>
                      <strong style={{ color: "#DC2626" }}>
                        -{selectedReward.points.toLocaleString()}
                      </strong>
                    </div>
                    <div style={{ ...styles.modalSummaryRow, ...styles.modalSummaryTotal }}>
                      <span>Sisa poin</span>
                      <strong>
                        {(points - selectedReward.points).toLocaleString()}
                      </strong>
                    </div>
                  </div>

                  <div style={styles.modalWarning}>
                    ⚠️ Poin yang sudah ditukar tidak dapat dikembalikan
                  </div>

                  <button
                    style={styles.modalBackBtn}
                    onClick={() => setSelectedReward(null)}
                  >
                    ← Pilih reward lain
                  </button>
                </>
              )}
            </div>

            {selectedReward && (
              <div style={styles.modalFooter}>
                <button
                  style={styles.modalBtnSecondary}
                  onClick={handleCloseModal}
                >
                  Batal
                </button>
                <button
                  style={styles.modalBtnPrimary}
                  onClick={handleConfirmRedeem}
                >
                  ✓ Konfirmasi Tukar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#F3F4F6",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: "24px 32px",
    maxWidth: "1400px",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
    margin: "0 0 6px",
    fontSize: "24px",
    fontWeight: "700",
    color: "#111827",
  },

  pageSubtitle: {
    margin: 0,
    fontSize: "14px",
    color: "#6B7280",
  },

  headerActions: {
    display: "flex",
    gap: "8px",
  },

  headerBtn: {
    padding: "10px 16px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#4B5563",
    cursor: "pointer",
  },

  headerBtnPrimary: {
    padding: "10px 16px",
    background: "#111827",
    border: "none",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#fff",
    cursor: "pointer",
  },

  /* HERO CARD */
  heroCard: {
    background:
      "linear-gradient(135deg, #B76E79 0%, #D49AA5 40%, #E8C5CE 70%, #D4A574 100%)",
    borderRadius: "16px",
    padding: "32px",
    marginBottom: "24px",
    position: "relative",
    overflow: "hidden",
    boxShadow:
      "0 10px 30px rgba(183, 110, 121, 0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
    color: "#fff",
  },

  heroPattern: {
    position: "absolute",
    top: "-50%",
    right: "-10%",
    width: "400px",
    height: "400px",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
    borderRadius: "50%",
  },

  heroPattern2: {
    position: "absolute",
    bottom: "-40%",
    left: "-10%",
    width: "350px",
    height: "350px",
    background:
      "radial-gradient(circle, rgba(212,165,116,0.4) 0%, transparent 70%)",
    borderRadius: "50%",
  },

  heroContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "32px",
    position: "relative",
    zIndex: 1,
  },

  heroLeft: {
    flex: 1,
  },

  heroLabel: {
    letterSpacing: "2px",
    fontSize: "11px",
    opacity: 0.9,
    margin: "0 0 8px",
    fontWeight: "600",
  },

  heroPoints: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "6px",
  },

  heroValue: {
    margin: 0,
    fontSize: "48px",
    fontWeight: "700",
    letterSpacing: "-1px",
  },

  heroBadge: {
    padding: "4px 12px",
    background: "rgba(255,255,255,0.25)",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    border: "1px solid rgba(255,255,255,0.3)",
  },

  heroEquiv: {
    margin: "0 0 20px",
    fontSize: "14px",
    opacity: 0.9,
  },

  heroProgress: {
    maxWidth: "400px",
  },

  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "12px",
  },

  progressLabel: {
    opacity: 0.9,
  },

  progressPercent: {
    fontWeight: "700",
  },

  progressBar: {
    width: "100%",
    height: "8px",
    background: "rgba(255,255,255,0.25)",
    borderRadius: "10px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "#fff",
    borderRadius: "10px",
    transition: "width 0.5s ease",
  },

  heroRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },

  heroCircle: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    border: "3px solid rgba(255,255,255,0.4)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(10px)",
  },

  heroCircleIcon: {
    fontSize: "36px",
    marginBottom: "4px",
  },

  heroCircleText: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "2px",
  },

  heroBtn: {
    padding: "12px 24px",
    background: "#fff",
    color: "#B76E79",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },

  /* STATS */
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
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  statIconBox: {
    width: "48px",
    height: "48px",
    background: "#FDF2F4",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    flexShrink: 0,
  },

  statLabel: {
    margin: "0 0 4px",
    fontSize: "12px",
    color: "#6B7280",
    fontWeight: "500",
  },

  statValue: {
    margin: "0 0 4px",
    fontSize: "20px",
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

  /* SECTION */
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
    alignItems: "flex-start",
    marginBottom: "20px",
  },

  sectionTitle: {
    margin: "0 0 4px",
    fontSize: "16px",
    fontWeight: "700",
    color: "#111827",
  },

  sectionSubtitle: {
    margin: 0,
    fontSize: "13px",
    color: "#6B7280",
  },

  sectionCount: {
    fontSize: "13px",
    color: "#6B7280",
    padding: "4px 10px",
    background: "#F3F4F6",
    borderRadius: "12px",
    fontWeight: "500",
  },

  seeAll: {
    fontSize: "13px",
    color: "#B76E79",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
  },

  /* REWARDS GRID */
  rewardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: "16px",
  },

  rewardCard: {
    background: "#FAFAFA",
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
    padding: "18px",
    position: "relative",
    transition: "all 0.2s",
  },

  popularBadge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    padding: "3px 8px",
    background: "#FEF3C7",
    color: "#92400E",
    borderRadius: "10px",
    fontSize: "10px",
    fontWeight: "700",
  },

  rewardIconBox: {
    width: "48px",
    height: "48px",
    background: "#FDF2F4",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    marginBottom: "12px",
  },

  rewardTitle: {
    margin: "0 0 4px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#111827",
  },

  rewardDesc: {
    margin: "0 0 14px",
    fontSize: "12px",
    color: "#6B7280",
    lineHeight: "1.5",
    minHeight: "36px",
  },

  rewardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "8px",
  },

  rewardPointsLabel: {
    margin: "0 0 2px",
    fontSize: "10px",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  rewardPointsValue: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    color: "#B76E79",
  },

  rewardPointsUnit: {
    fontSize: "12px",
    color: "#6B7280",
    fontWeight: "500",
  },

  rewardBtn: {
    padding: "8px 16px",
    background: "#B76E79",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },

  rewardBtnDisabled: {
    background: "#E5E7EB",
    color: "#9CA3AF",
    cursor: "not-allowed",
  },

  rewardStock: {
    margin: 0,
    fontSize: "11px",
    color: "#9CA3AF",
  },

  /* FILTER BAR */
  filterBar: {
    background: "#fff",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #E5E7EB",
    marginBottom: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    padding: "8px 14px",
    minWidth: "280px",
  },

  searchIcon: {
    fontSize: "14px",
    color: "#9CA3AF",
  },

  searchInput: {
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: "14px",
    color: "#111827",
    width: "100%",
  },

  filterPills: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },

  pill: {
    padding: "8px 14px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#4B5563",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  pillActive: {
    background: "#B76E79",
    color: "#fff",
    borderColor: "#B76E79",
  },

  pillCount: {
    padding: "2px 7px",
    background: "#F3F4F6",
    borderRadius: "10px",
    fontSize: "11px",
    fontWeight: "600",
  },

  pillCountActive: {
    background: "rgba(255,255,255,0.25)",
    color: "#fff",
  },

  /* HISTORY LIST */
  historyList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  historyItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px",
    background: "#FAFAFA",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.15s",
  },

  historyIconBox: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    flexShrink: 0,
  },

  historyContent: {
    flex: 1,
    minWidth: 0,
  },

  historyTop: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "4px",
  },

  historyTitle: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "700",
    color: "#111827",
  },

  historyCategory: {
    padding: "2px 8px",
    borderRadius: "8px",
    fontSize: "10px",
    fontWeight: "600",
  },

  historyDesc: {
    margin: "0 0 4px",
    fontSize: "12px",
    color: "#6B7280",
  },

  historyDate: {
    margin: 0,
    fontSize: "11px",
    color: "#9CA3AF",
  },

  historyPoint: {
    textAlign: "right",
    flexShrink: 0,
  },

  pointValue: {
    display: "block",
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "2px",
  },

  pointLabel: {
    fontSize: "11px",
    color: "#9CA3AF",
  },

  /* EMPTY STATE */
  emptyState: {
    background: "#fff",
    padding: "60px 24px",
    borderRadius: "12px",
    border: "1px solid #E5E7EB",
    textAlign: "center",
    marginBottom: "16px",
  },

  emptyIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },

  emptyTitle: {
    margin: "0 0 8px",
    fontSize: "18px",
    fontWeight: "700",
    color: "#111827",
  },

  emptyDesc: {
    margin: "0 0 20px",
    fontSize: "14px",
    color: "#6B7280",
  },

  emptyBtn: {
    padding: "10px 20px",
    background: "#B76E79",
    border: "none",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#fff",
    cursor: "pointer",
  },

  /* PAGINATION */
  paginationWrap: {
    background: "#fff",
    padding: "16px 24px",
    borderRadius: "12px",
    border: "1px solid #E5E7EB",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px",
    flexWrap: "wrap",
    gap: "12px",
  },

  paginationInfo: {
    margin: 0,
    fontSize: "13px",
    color: "#6B7280",
  },

  pagination: {
    display: "flex",
    gap: "4px",
  },

  pageBtn: {
    padding: "8px 14px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#4B5563",
    cursor: "pointer",
  },

  pageBtnActive: {
    background: "#B76E79",
    color: "#fff",
    borderColor: "#B76E79",
  },

  pageBtnDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
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
    padding: "20px",
  },

  modalContent: {
    background: "#fff",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "520px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
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
    padding: "20px 24px",
  },

  modalBalance: {
    background: "linear-gradient(135deg, #B76E79, #D49AA5)",
    color: "#fff",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalBalanceLabel: {
    fontSize: "12px",
    opacity: 0.9,
  },

  modalBalanceValue: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "700",
  },

  modalSectionTitle: {
    margin: "0 0 12px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  modalRewardsList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  modalRewardItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    background: "#FAFAFA",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
  },

  modalRewardIcon: {
    width: "40px",
    height: "40px",
    background: "#FDF2F4",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    flexShrink: 0,
  },

  modalRewardInfo: {
    flex: 1,
  },

  modalRewardTitle: {
    margin: "0 0 2px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
  },

  modalRewardPoints: {
    margin: 0,
    fontSize: "12px",
    color: "#B76E79",
    fontWeight: "600",
  },

  modalRewardInsufficient: {
    padding: "4px 8px",
    background: "#FEE2E2",
    color: "#991B1B",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: "600",
  },

  modalSelectedReward: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px",
    background: "#FDF2F4",
    borderRadius: "12px",
    marginBottom: "16px",
  },

  modalSelectedIcon: {
    width: "52px",
    height: "52px",
    background: "#fff",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    flexShrink: 0,
  },

  modalSelectedTitle: {
    margin: "0 0 4px",
    fontSize: "15px",
    fontWeight: "700",
    color: "#111827",
  },

  modalSelectedDesc: {
    margin: 0,
    fontSize: "12px",
    color: "#6B7280",
  },

  modalSummary: {
    background: "#FAFAFA",
    borderRadius: "10px",
    padding: "14px",
    marginBottom: "12px",
  },

  modalSummaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    fontSize: "13px",
    color: "#4B5563",
    borderBottom: "1px solid #E5E7EB",
  },

  modalSummaryTotal: {
    borderBottom: "none",
    paddingTop: "12px",
    marginTop: "4px",
    borderTop: "2px solid #E5E7EB",
    fontSize: "14px",
    color: "#111827",
  },

  modalWarning: {
    padding: "10px 14px",
    background: "#FEF3C7",
    color: "#92400E",
    borderRadius: "8px",
    fontSize: "12px",
    marginBottom: "12px",
  },

  modalBackBtn: {
    padding: "8px 14px",
    background: "transparent",
    border: "none",
    color: "#B76E79",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
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

export default MemberPoints;