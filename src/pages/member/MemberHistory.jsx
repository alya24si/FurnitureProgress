import { useState } from "react";

function MemberHistory() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const activities = [
    {
      id: 1,
      type: "transaction",
      title: "Pembelian Sofa Premium",
      description: "Pesanan telah selesai dan dikirim ke alamat Anda",
      date: "12 Juni 2026",
      time: "14:32 WIB",
      amount: "Rp 5.500.000",
      invoice: "INV-2026-001",
      status: "Selesai",
      icon: "🛋",
    },
    {
      id: 2,
      type: "voucher",
      title: "Klaim Voucher 20%",
      description: "Voucher diskon untuk kategori furniture",
      date: "10 Juni 2026",
      time: "09:15 WIB",
      code: "VCR-20-JUN",
      validUntil: "30 Juni 2026",
      status: "Aktif",
      icon: "🎫",
    },
    {
      id: 3,
      type: "membership",
      title: "Upgrade Membership",
      description: "Berhasil upgrade dari Silver ke Gold",
      date: "05 Juni 2026",
      time: "16:48 WIB",
      from: "Silver",
      to: "Gold",
      status: "Berhasil",
      icon: "⭐",
    },
    {
      id: 4,
      type: "transaction",
      title: "Pembelian Meja Kerja",
      description: "Pesanan sedang dalam proses pengiriman",
      date: "02 Juni 2026",
      time: "11:20 WIB",
      amount: "Rp 2.000.000",
      invoice: "INV-2026-002",
      status: "Diproses",
      icon: "🪑",
    },
    {
      id: 5,
      type: "reward",
      title: "Tukar Reward Point",
      description: "Menukarkan 500 poin dengan voucher belanja",
      date: "28 Mei 2026",
      time: "13:45 WIB",
      points: "500 poin",
      status: "Berhasil",
      icon: "🎁",
    },
    {
      id: 6,
      type: "transaction",
      title: "Pembelian Kasur King Size",
      description: "Pesanan telah selesai dan dikirim",
      date: "20 Mei 2026",
      time: "10:30 WIB",
      amount: "Rp 8.750.000",
      invoice: "INV-2026-003",
      status: "Selesai",
      icon: "🛏",
    },
  ];

  // Filter activities berdasarkan tipe dan search
  const filteredActivities = activities.filter((activity) => {
    const matchesFilter = activeFilter === "all" || activity.type === activeFilter;
    const matchesSearch =
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedActivities = filteredActivities.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handlers
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1); // Reset ke halaman 1 saat filter berubah
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset ke halaman 1 saat search berubah
  };

  const handleExport = () => {
    alert("Export data riwayat aktivitas ke CSV/PDF");
  };

  const handleViewDetail = (activity) => {
    alert(`Detail aktivitas: ${activity.title}\n\n${activity.description}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getTypeStyle = (type) => {
    const map = {
      transaction: { bg: "#DBEAFE", color: "#1E40AF", label: "Transaksi" },
      voucher: { bg: "#FEF3C7", color: "#92400E", label: "Voucher" },
      membership: { bg: "#FDF2F4", color: "#B76E79", label: "Membership" },
      reward: { bg: "#D1FAE5", color: "#065F46", label: "Reward" },
    };
    return map[type] || map.transaction;
  };

  return (
    <div style={styles.wrapper}>

      {/* HEADER */}
      <header style={styles.header}>
        <div>
          <div style={styles.breadcrumb}>
            <span>Dashboard</span>
            <span style={styles.breadcrumbSep}>/</span>
            <span style={styles.breadcrumbCurrent}>Riwayat Aktivitas</span>
          </div>
          <h1 style={styles.pageTitle}>Riwayat Aktivitas</h1>
          <p style={styles.pageSubtitle}>
            Pantau semua aktivitas akun membership Anda
          </p>
        </div>

        <div style={styles.headerActions}>
          <button style={styles.exportBtn} onClick={handleExport}>
            📥 Export
          </button>
          <button style={styles.filterBtn} onClick={() => alert("Filter advanced")}>
            🔽 Filter
          </button>
        </div>
      </header>

      {/* STATS SUMMARY */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIconBox}>📊</div>
          <div>
            <p style={styles.statLabel}>Total Aktivitas</p>
            <h2 style={styles.statValue}>{activities.length}</h2>
            <p style={styles.statTrend}>
              <span style={styles.trendUp}>↑ 8</span> bulan ini
            </p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIconBox}>💳</div>
          <div>
            <p style={styles.statLabel}>Transaksi</p>
            <h2 style={styles.statValue}>
              {activities.filter((a) => a.type === "transaction").length}
            </h2>
            <p style={styles.statTrend}>
              Rp 24.750.000 total
            </p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIconBox}>🎫</div>
          <div>
            <p style={styles.statLabel}>Voucher Diklaim</p>
            <h2 style={styles.statValue}>
              {activities.filter((a) => a.type === "voucher").length}
            </h2>
            <p style={styles.statTrend}>
              3 voucher aktif
            </p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIconBox}>⭐</div>
          <div>
            <p style={styles.statLabel}>Upgrade Tier</p>
            <h2 style={styles.statValue}>
              {activities.filter((a) => a.type === "membership").length}
            </h2>
            <p style={styles.statTrend}>
              Terakhir: Gold
            </p>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div style={styles.filterBar}>
        <div style={styles.searchBox}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Cari aktivitas..."
            style={styles.searchInput}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div style={styles.filterPills}>
          <button
            style={{
              ...styles.pill,
              ...(activeFilter === "all" ? styles.pillActive : {}),
            }}
            onClick={() => handleFilterChange("all")}
          >
            Semua
          </button>
          <button
            style={{
              ...styles.pill,
              ...(activeFilter === "transaction" ? styles.pillActive : {}),
            }}
            onClick={() => handleFilterChange("transaction")}
          >
            Transaksi
          </button>
          <button
            style={{
              ...styles.pill,
              ...(activeFilter === "voucher" ? styles.pillActive : {}),
            }}
            onClick={() => handleFilterChange("voucher")}
          >
            Voucher
          </button>
          <button
            style={{
              ...styles.pill,
              ...(activeFilter === "membership" ? styles.pillActive : {}),
            }}
            onClick={() => handleFilterChange("membership")}
          >
            Membership
          </button>
          <button
            style={{
              ...styles.pill,
              ...(activeFilter === "reward" ? styles.pillActive : {}),
            }}
            onClick={() => handleFilterChange("reward")}
          >
            Reward
          </button>
        </div>
      </div>

      {/* ACTIVITIES LIST */}
      {paginatedActivities.length > 0 ? (
        <div style={styles.section}>
          <div style={styles.sectionHead}>
            <h2 style={styles.sectionTitle}>
              {filteredActivities.length} Aktivitas Ditemukan
            </h2>
            <span style={styles.sectionCount}>
              Halaman {currentPage} dari {totalPages}
            </span>
          </div>

          <div style={styles.activitiesList}>
            {paginatedActivities.map((activity) => {
              const typeStyle = getTypeStyle(activity.type);
              return (
                <div key={activity.id} style={styles.activityCard}>
                  <div style={styles.activityHeader}>
                    <div style={styles.activityLeft}>
                      <div style={styles.activityIconBox}>
                        {activity.icon}
                      </div>
                      <div>
                        <h3 style={styles.activityTitle}>{activity.title}</h3>
                        <p style={styles.activityDesc}>{activity.description}</p>
                      </div>
                    </div>

                    <div style={styles.activityRight}>
                      <span
                        style={{
                          ...styles.typeBadge,
                          background: typeStyle.bg,
                          color: typeStyle.color,
                        }}
                      >
                        {typeStyle.label}
                      </span>
                      <span style={styles.statusBadge}>
                        {activity.status}
                      </span>
                    </div>
                  </div>

                  <div style={styles.activityMeta}>
                    <div style={styles.metaItem}>
                      <span style={styles.metaIcon}>📅</span>
                      <span>{activity.date}</span>
                      <span style={styles.metaSep}>•</span>
                      <span>{activity.time}</span>
                    </div>

                    {activity.amount && (
                      <div style={styles.metaItem}>
                        <span style={styles.metaIcon}>💰</span>
                        <strong style={styles.amountText}>{activity.amount}</strong>
                      </div>
                    )}

                    {activity.invoice && (
                      <div style={styles.metaItem}>
                        <span style={styles.metaIcon}>📄</span>
                        <code style={styles.code}>{activity.invoice}</code>
                      </div>
                    )}

                    {activity.code && (
                      <div style={styles.metaItem}>
                        <span style={styles.metaIcon}>🎟</span>
                        <code style={styles.code}>{activity.code}</code>
                        <span style={styles.metaSep}>•</span>
                        <span style={styles.validText}>
                          Berlaku s/d {activity.validUntil}
                        </span>
                      </div>
                    )}

                    {activity.from && (
                      <div style={styles.metaItem}>
                        <span style={styles.metaIcon}>🔄</span>
                        <span>{activity.from} → </span>
                        <strong style={styles.tierText}>{activity.to}</strong>
                      </div>
                    )}

                    {activity.points && (
                      <div style={styles.metaItem}>
                        <span style={styles.metaIcon}>⭐</span>
                        <strong>{activity.points}</strong>
                      </div>
                    )}
                  </div>

                  <div style={styles.activityFooter}>
                    <button
                      style={styles.detailBtn}
                      onClick={() => handleViewDetail(activity)}
                    >
                      Lihat Detail →
                    </button>
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
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div style={styles.paginationWrap}>
          <p style={styles.paginationInfo}>
            Menampilkan {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredActivities.length)} dari {filteredActivities.length} aktivitas
          </p>
          <div style={styles.pagination}>
            <button
              style={{
                ...styles.pageBtn,
                ...(currentPage === 1 ? styles.pageBtnDisabled : {}),
              }}
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹ Sebelumnya
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                style={{
                  ...styles.pageBtn,
                  ...(currentPage === page ? styles.pageBtnActive : {}),
                }}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              style={{
                ...styles.pageBtn,
                ...(currentPage === totalPages ? styles.pageBtnDisabled : {}),
              }}
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Selanjutnya ›
            </button>
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

  exportBtn: {
    padding: "10px 16px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#4B5563",
    cursor: "pointer",
  },

  filterBtn: {
    padding: "10px 16px",
    background: "#111827",
    border: "none",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#fff",
    cursor: "pointer",
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
    fontSize: "22px",
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

  filterBar: {
    background: "#fff",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #E5E7EB",
    marginBottom: "20px",
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
    padding: "8px 16px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#4B5563",
    cursor: "pointer",
  },

  pillActive: {
    background: "#B76E79",
    color: "#fff",
    borderColor: "#B76E79",
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
    marginBottom: "24px",
    paddingBottom: "16px",
    borderBottom: "1px solid #F3F4F6",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "700",
    color: "#111827",
  },

  sectionCount: {
    fontSize: "13px",
    color: "#6B7280",
    padding: "4px 10px",
    background: "#F3F4F6",
    borderRadius: "12px",
    fontWeight: "500",
  },

  activitiesList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  activityCard: {
    background: "#FAFAFA",
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
    padding: "18px",
  },

  activityHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "14px",
    gap: "12px",
  },

  activityLeft: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    flex: 1,
  },

  activityIconBox: {
    width: "44px",
    height: "44px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    flexShrink: 0,
  },

  activityTitle: {
    margin: "0 0 4px",
    fontSize: "15px",
    fontWeight: "700",
    color: "#111827",
  },

  activityDesc: {
    margin: 0,
    fontSize: "13px",
    color: "#6B7280",
  },

  activityRight: {
    display: "flex",
    gap: "6px",
    flexShrink: 0,
  },

  typeBadge: {
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.3px",
  },

  statusBadge: {
    padding: "4px 10px",
    background: "#D1FAE5",
    color: "#065F46",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: "600",
  },

  activityMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px 20px",
    padding: "12px 0",
    borderTop: "1px dashed #E5E7EB",
    borderBottom: "1px dashed #E5E7EB",
    marginBottom: "12px",
  },

  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: "#4B5563",
  },

  metaIcon: {
    fontSize: "13px",
  },

  metaSep: {
    color: "#D1D5DB",
    margin: "0 2px",
  },

  amountText: {
    color: "#B76E79",
    fontWeight: "700",
  },

  code: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontFamily: "monospace",
    color: "#4B5563",
  },

  validText: {
    color: "#059669",
    fontSize: "12px",
  },

  tierText: {
    color: "#B76E79",
    fontWeight: "700",
  },

  activityFooter: {
    display: "flex",
    justifyContent: "flex-end",
  },

  detailBtn: {
    padding: "6px 12px",
    background: "transparent",
    border: "none",
    color: "#B76E79",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },

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
    margin: 0,
    fontSize: "14px",
    color: "#6B7280",
  },

  paginationWrap: {
    background: "#fff",
    padding: "16px 24px",
    borderRadius: "12px",
    border: "1px solid #E5E7EB",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px",
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
};

export default MemberHistory;