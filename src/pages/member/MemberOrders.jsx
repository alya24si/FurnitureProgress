import { useState } from "react";

function MemberOrders() {
  const [orders] = useState([
    {
      id: "INV-2026-001",
      date: "12 Juni 2026",
      time: "14:32",
      product: "Sofa Premium Scandinavian",
      category: "Ruang Tamu",
      quantity: 1,
      total: 5500000,
      status: "Selesai",
      payment: "Transfer Bank",
      address: "Jl. Sudirman No. 45, Jakarta Selatan",
      courier: "JNE YES",
      tracking: "JNE123456789",
      icon: "🛋",
      deliveredAt: "15 Juni 2026",
    },
    {
      id: "INV-2026-002",
      date: "18 Juni 2026",
      time: "09:15",
      product: "Meja Makan Kayu Jati",
      category: "Ruang Makan",
      quantity: 1,
      total: 3200000,
      status: "Dikirim",
      payment: "Kartu Kredit",
      address: "Jl. Sudirman No. 45, Jakarta Selatan",
      courier: "SiCepat Halu",
      tracking: "SC987654321",
      icon: "🪑",
      estimatedDelivery: "21 Juni 2026",
    },
    {
      id: "INV-2026-003",
      date: "19 Juni 2026",
      time: "16:48",
      product: "Lemari Minimalis 3 Pintu",
      category: "Kamar Tidur",
      quantity: 1,
      total: 4700000,
      status: "Diproses",
      payment: "E-Wallet",
      address: "Jl. Gatot Subroto No. 12, Bandung",
      courier: "-",
      tracking: "-",
      icon: "🗄",
      estimatedDelivery: "25 Juni 2026",
    },
    {
      id: "INV-2026-004",
      date: "05 Juni 2026",
      time: "10:30",
      product: "Kasur King Size Premium",
      category: "Kamar Tidur",
      quantity: 1,
      total: 8750000,
      status: "Selesai",
      payment: "Transfer Bank",
      address: "Jl. Sudirman No. 45, Jakarta Selatan",
      courier: "AnterAja Reg",
      tracking: "AA112233445",
      icon: "🛏",
      deliveredAt: "08 Juni 2026",
    },
    {
      id: "INV-2026-005",
      date: "28 Mei 2026",
      time: "13:20",
      product: "Rak Buku Dinding",
      category: "Ruang Kerja",
      quantity: 2,
      total: 1800000,
      status: "Selesai",
      payment: "Kartu Kredit",
      address: "Jl. Sudirman No. 45, Jakarta Selatan",
      courier: "J&T Express",
      tracking: "JT556677889",
      icon: "📚",
      deliveredAt: "01 Juni 2026",
    },
    {
      id: "INV-2026-006",
      date: "20 Mei 2026",
      time: "11:45",
      product: "Lampu Gantung Kristal",
      category: "Ruang Tamu",
      quantity: 1,
      total: 2400000,
      status: "Batal",
      payment: "E-Wallet",
      address: "Jl. Gatot Subroto No. 12, Bandung",
      courier: "-",
      tracking: "-",
      icon: "💡",
      cancelledAt: "21 Mei 2026",
    },
  ]);

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 4;

  // Filter & search
  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      activeFilter === "all" ||
      order.status.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Stats
  const totalSpending = orders
    .filter((o) => o.status === "Selesai")
    .reduce((sum, o) => sum + o.total, 0);
  const statusCount = (status) =>
    orders.filter((o) => o.status === status).length;

  // Handlers
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleExport = () => {
    alert("Mengexport data pesanan ke CSV...");
  };

  const handleTrackOrder = (order) => {
    alert(
      `Lacak Pesanan ${order.id}\n\nKurir: ${order.courier}\nNo. Resi: ${order.tracking}\n\nEstimasi sampai: ${order.estimatedDelivery}`
    );
  };

  const handleCancelOrder = (order) => {
    if (confirm(`Batalkan pesanan ${order.id}?`)) {
      alert(`Pesanan ${order.id} berhasil dibatalkan.`);
    }
  };

  const handleBuyAgain = (order) => {
    alert(`Membeli lagi: ${order.product}\n\nMengarahkan ke halaman produk...`);
  };

  const handleReview = (order) => {
    alert(`Berikan ulasan untuk: ${order.product}`);
  };

  const handleDownloadInvoice = (order) => {
    alert(`Mengunduh invoice ${order.id}...`);
  };

  const getTrackingSteps = (status) => {
    const steps = [
      { label: "Pesanan Dibuat", icon: "📝" },
      { label: "Dikemas", icon: "📦" },
      { label: "Dikirim", icon: "🚚" },
      { label: "Selesai", icon: "✓" },
    ];

    let activeIndex = 0;
    if (status === "Diproses") activeIndex = 1;
    else if (status === "Dikirim") activeIndex = 2;
    else if (status === "Selesai") activeIndex = 3;

    return { steps, activeIndex };
  };

  const getStatusStyle = (status) => {
    const map = {
      Selesai: { bg: "#D1FAE5", color: "#065F46", dot: "#10B981" },
      Dikirim: { bg: "#DBEAFE", color: "#1E40AF", dot: "#3B82F6" },
      Diproses: { bg: "#FEF3C7", color: "#92400E", dot: "#F59E0B" },
      Batal: { bg: "#FEE2E2", color: "#991B1B", dot: "#EF4444" },
    };
    return map[status] || map.Diproses;
  };

  const tabs = [
    { key: "all", label: "Semua", count: orders.length },
    { key: "diproses", label: "Diproses", count: statusCount("Diproses") },
    { key: "dikirim", label: "Dikirim", count: statusCount("Dikirim") },
    { key: "selesai", label: "Selesai", count: statusCount("Selesai") },
    { key: "batal", label: "Batal", count: statusCount("Batal") },
  ];

  return (
    <div style={styles.wrapper}>

      {/* HEADER */}
      <header style={styles.header}>
        <div>
          <div style={styles.breadcrumb}>
            <span>Dashboard</span>
            <span style={styles.breadcrumbSep}>/</span>
            <span style={styles.breadcrumbCurrent}>Pesanan Saya</span>
          </div>
          <h1 style={styles.pageTitle}>Pesanan Saya</h1>
          <p style={styles.pageSubtitle}>
            Kelola dan pantau semua pesanan pembelian Anda
          </p>
        </div>

        <div style={styles.headerActions}>
          <button style={styles.exportBtn} onClick={handleExport}>
            📥 Export
          </button>
        </div>
      </header>

      {/* STATS */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIconBox}>📦</div>
          <div>
            <p style={styles.statLabel}>Total Pesanan</p>
            <h2 style={styles.statValue}>{orders.length}</h2>
            <p style={styles.statTrend}>Semua transaksi</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIconBox}>💰</div>
          <div>
            <p style={styles.statLabel}>Total Belanja</p>
            <h2 style={styles.statValue}>
              Rp {totalSpending.toLocaleString()}
            </h2>
            <p style={styles.statTrend}>Transaksi selesai</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIconBox}>🚚</div>
          <div>
            <p style={styles.statLabel}>Sedang Dikirim</p>
            <h2 style={styles.statValue}>{statusCount("Dikirim")}</h2>
            <p style={styles.statTrend}>
              <span style={styles.trendUp}>Aktif</span> sekarang
            </p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIconBox}>✅</div>
          <div>
            <p style={styles.statLabel}>Pesanan Selesai</p>
            <h2 style={styles.statValue}>{statusCount("Selesai")}</h2>
            <p style={styles.statTrend}>Berhasil dikirim</p>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div style={styles.filterBar}>
        <div style={styles.searchBox}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Cari invoice atau produk..."
            style={styles.searchInput}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div style={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              style={{
                ...styles.tab,
                ...(activeFilter === tab.key ? styles.tabActive : {}),
              }}
              onClick={() => handleFilterChange(tab.key)}
            >
              {tab.label}
              <span
                style={{
                  ...styles.tabCount,
                  ...(activeFilter === tab.key ? styles.tabCountActive : {}),
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ORDERS LIST */}
      {paginatedOrders.length > 0 ? (
        <div style={styles.ordersList}>
          {paginatedOrders.map((order) => {
            const statusStyle = getStatusStyle(order.status);
            const tracking = getTrackingSteps(order.status);

            return (
              <div key={order.id} style={styles.orderCard}>
                {/* Card Header */}
                <div style={styles.orderHeader}>
                  <div style={styles.orderHeaderLeft}>
                    <code style={styles.invoiceCode}>{order.id}</code>
                    <span style={styles.orderDate}>
                      {order.date} • {order.time}
                    </span>
                  </div>
                  <span
                    style={{
                      ...styles.statusBadge,
                      background: statusStyle.bg,
                      color: statusStyle.color,
                    }}
                  >
                    <span
                      style={{
                        ...styles.statusDot,
                        background: statusStyle.dot,
                      }}
                    ></span>
                    {order.status}
                  </span>
                </div>

                {/* Card Body */}
                <div style={styles.orderBody}>
                  <div style={styles.productThumb}>{order.icon}</div>
                  <div style={styles.productInfo}>
                    <h3 style={styles.productName}>{order.product}</h3>
                    <p style={styles.productMeta}>
                      {order.category} • Qty: {order.quantity}
                    </p>
                    <p style={styles.productAddress}>
                      📍 {order.address}
                    </p>
                  </div>
                  <div style={styles.productTotal}>
                    <p style={styles.totalLabel}>Total</p>
                    <h3 style={styles.totalValue}>
                      Rp {order.total.toLocaleString()}
                    </h3>
                    <p style={styles.paymentMethod}>{order.payment}</p>
                  </div>
                </div>

                {/* Tracking Progress (only for active orders) */}
                {(order.status === "Diproses" ||
                  order.status === "Dikirim" ||
                  order.status === "Selesai") && (
                  <div style={styles.trackingBar}>
                    {tracking.steps.map((step, idx) => {
                      const isActive = idx <= tracking.activeIndex;
                      const isLast = idx === tracking.steps.length - 1;
                      return (
                        <div key={idx} style={styles.trackingStep}>
                          <div
                            style={{
                              ...styles.trackingDot,
                              background: isActive ? "#B76E79" : "#E5E7EB",
                              color: isActive ? "#fff" : "#9CA3AF",
                            }}
                          >
                            {step.icon}
                          </div>
                          <span
                            style={{
                              ...styles.trackingLabel,
                              color: isActive ? "#111827" : "#9CA3AF",
                              fontWeight: isActive ? "600" : "500",
                            }}
                          >
                            {step.label}
                          </span>
                          {!isLast && (
                            <div
                              style={{
                                ...styles.trackingLine,
                                background:
                                  idx < tracking.activeIndex
                                    ? "#B76E79"
                                    : "#E5E7EB",
                              }}
                            ></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Card Footer - Actions */}
                <div style={styles.orderFooter}>
                  <div style={styles.footerLeft}>
                    {order.courier !== "-" && (
                      <span style={styles.courierInfo}>
                        🚚 {order.courier} •{" "}
                        <code style={styles.trackingCode}>
                          {order.tracking}
                        </code>
                      </span>
                    )}
                    {order.deliveredAt && (
                      <span style={styles.deliveredInfo}>
                        ✓ Diterima {order.deliveredAt}
                      </span>
                    )}
                    {order.cancelledAt && (
                      <span style={styles.cancelledInfo}>
                        ✕ Dibatalkan {order.cancelledAt}
                      </span>
                    )}
                    {order.estimatedDelivery && order.status === "Dikirim" && (
                      <span style={styles.estimatedInfo}>
                        ⏱ Estimasi: {order.estimatedDelivery}
                      </span>
                    )}
                  </div>

                  <div style={styles.footerActions}>
                    <button
                      style={styles.actionBtnSecondary}
                      onClick={() => handleDownloadInvoice(order)}
                    >
                      📄 Invoice
                    </button>
                    <button
                      style={styles.actionBtnSecondary}
                      onClick={() => handleViewDetail(order)}
                    >
                      Detail
                    </button>

                    {order.status === "Diproses" && (
                      <button
                        style={styles.actionBtnDanger}
                        onClick={() => handleCancelOrder(order)}
                      >
                        Batalkan
                      </button>
                    )}
                    {order.status === "Dikirim" && (
                      <button
                        style={styles.actionBtnPrimary}
                        onClick={() => handleTrackOrder(order)}
                      >
                        🚚 Lacak
                      </button>
                    )}
                    {order.status === "Selesai" && (
                      <>
                        <button
                          style={styles.actionBtnSecondary}
                          onClick={() => handleReview(order)}
                        >
                          ⭐ Ulasan
                        </button>
                        <button
                          style={styles.actionBtnPrimary}
                          onClick={() => handleBuyAgain(order)}
                        >
                          Beli Lagi
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📭</div>
          <h3 style={styles.emptyTitle}>Tidak ada pesanan ditemukan</h3>
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
            {Math.min(startIndex + itemsPerPage, filteredOrders.length)} dari{" "}
            {filteredOrders.length} pesanan
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

      {/* MODAL DETAIL */}
      {showModal && selectedOrder && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <div>
                <h2 style={styles.modalTitle}>Detail Pesanan</h2>
                <p style={styles.modalSubtitle}>{selectedOrder.id}</p>
              </div>
              <button style={styles.modalClose} onClick={handleCloseModal}>
                ✕
              </button>
            </div>

            <div style={styles.modalBody}>
              {/* Product Info */}
              <div style={styles.modalSection}>
                <h4 style={styles.modalSectionTitle}>Produk</h4>
                <div style={styles.modalProductRow}>
                  <div style={styles.modalProductIcon}>
                    {selectedOrder.icon}
                  </div>
                  <div>
                    <h3 style={styles.modalProductName}>
                      {selectedOrder.product}
                    </h3>
                    <p style={styles.modalProductMeta}>
                      {selectedOrder.category} • Qty: {selectedOrder.quantity}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Info */}
              <div style={styles.modalSection}>
                <h4 style={styles.modalSectionTitle}>Informasi Pesanan</h4>
                <div style={styles.modalInfoRow}>
                  <span style={styles.modalInfoLabel}>Tanggal</span>
                  <strong style={styles.modalInfoValue}>
                    {selectedOrder.date}, {selectedOrder.time}
                  </strong>
                </div>
                <div style={styles.modalInfoRow}>
                  <span style={styles.modalInfoLabel}>Pembayaran</span>
                  <strong style={styles.modalInfoValue}>
                    {selectedOrder.payment}
                  </strong>
                </div>
                <div style={styles.modalInfoRow}>
                  <span style={styles.modalInfoLabel}>Alamat</span>
                  <strong style={styles.modalInfoValue}>
                    {selectedOrder.address}
                  </strong>
                </div>
                {selectedOrder.courier !== "-" && (
                  <div style={styles.modalInfoRow}>
                    <span style={styles.modalInfoLabel}>Kurir</span>
                    <strong style={styles.modalInfoValue}>
                      {selectedOrder.courier}
                    </strong>
                  </div>
                )}
                {selectedOrder.tracking !== "-" && (
                  <div style={styles.modalInfoRow}>
                    <span style={styles.modalInfoLabel}>No. Resi</span>
                    <strong style={styles.modalInfoValue}>
                      <code style={styles.modalCode}>
                        {selectedOrder.tracking}
                      </code>
                    </strong>
                  </div>
                )}
              </div>

              {/* Total */}
              <div style={styles.modalTotalBox}>
                <span>Total Pembayaran</span>
                <h2 style={styles.modalTotalValue}>
                  Rp {selectedOrder.total.toLocaleString()}
                </h2>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button
                style={styles.modalBtnSecondary}
                onClick={handleCloseModal}
              >
                Tutup
              </button>
              <button
                style={styles.modalBtnPrimary}
                onClick={() => handleDownloadInvoice(selectedOrder)}
              >
                📄 Download Invoice
              </button>
            </div>
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

  tabs: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },

  tab: {
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

  tabActive: {
    background: "#B76E79",
    color: "#fff",
    borderColor: "#B76E79",
  },

  tabCount: {
    padding: "2px 7px",
    background: "#F3F4F6",
    borderRadius: "10px",
    fontSize: "11px",
    fontWeight: "600",
  },

  tabCountActive: {
    background: "rgba(255,255,255,0.25)",
    color: "#fff",
  },

  ordersList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "16px",
  },

  orderCard: {
    background: "#fff",
    borderRadius: "14px",
    border: "1px solid #E5E7EB",
    overflow: "hidden",
  },

  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    background: "#FAFAFA",
    borderBottom: "1px solid #F3F4F6",
  },

  orderHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  invoiceCode: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "13px",
    fontFamily: "monospace",
    color: "#111827",
    fontWeight: "600",
  },

  orderDate: {
    fontSize: "13px",
    color: "#6B7280",
  },

  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },

  statusDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
  },

  orderBody: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "20px",
  },

  productThumb: {
    width: "64px",
    height: "64px",
    background: "#FDF2F4",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    flexShrink: 0,
  },

  productInfo: {
    flex: 1,
    minWidth: 0,
  },

  productName: {
    margin: "0 0 4px",
    fontSize: "15px",
    fontWeight: "700",
    color: "#111827",
  },

  productMeta: {
    margin: "0 0 6px",
    fontSize: "13px",
    color: "#6B7280",
  },

  productAddress: {
    margin: 0,
    fontSize: "12px",
    color: "#9CA3AF",
  },

  productTotal: {
    textAlign: "right",
    flexShrink: 0,
  },

  totalLabel: {
    margin: "0 0 2px",
    fontSize: "11px",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  totalValue: {
    margin: "0 0 4px",
    fontSize: "18px",
    fontWeight: "700",
    color: "#B76E79",
  },

  paymentMethod: {
    margin: 0,
    fontSize: "12px",
    color: "#6B7280",
  },

  trackingBar: {
    display: "flex",
    alignItems: "flex-start",
    padding: "16px 20px",
    background: "#FAFAFA",
    borderTop: "1px solid #F3F4F6",
    borderBottom: "1px solid #F3F4F6",
    gap: "0",
  },

  trackingStep: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    gap: "8px",
  },

  trackingDot: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    zIndex: 2,
    border: "3px solid #fff",
    boxShadow: "0 0 0 1px #E5E7EB",
  },

  trackingLabel: {
    fontSize: "11px",
    textAlign: "center",
  },

  trackingLine: {
    position: "absolute",
    top: "16px",
    left: "50%",
    right: "-50%",
    height: "2px",
    zIndex: 1,
  },

  orderFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    gap: "12px",
    flexWrap: "wrap",
  },

  footerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    flexWrap: "wrap",
  },

  courierInfo: {
    fontSize: "12px",
    color: "#4B5563",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },

  trackingCode: {
    background: "#F3F4F6",
    padding: "2px 6px",
    borderRadius: "4px",
    fontFamily: "monospace",
    fontSize: "11px",
    color: "#4B5563",
  },

  deliveredInfo: {
    fontSize: "12px",
    color: "#059669",
    fontWeight: "600",
  },

  cancelledInfo: {
    fontSize: "12px",
    color: "#DC2626",
    fontWeight: "600",
  },

  estimatedInfo: {
    fontSize: "12px",
    color: "#D97706",
    fontWeight: "600",
  },

  footerActions: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },

  actionBtnPrimary: {
    padding: "8px 14px",
    background: "#B76E79",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#fff",
    cursor: "pointer",
  },

  actionBtnSecondary: {
    padding: "8px 14px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#4B5563",
    cursor: "pointer",
  },

  actionBtnDanger: {
    padding: "8px 14px",
    background: "#fff",
    border: "1px solid #FECACA",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#DC2626",
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
    fontFamily: "monospace",
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

  modalSection: {
    marginBottom: "20px",
  },

  modalSectionTitle: {
    margin: "0 0 12px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  modalProductRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px",
    background: "#FAFAFA",
    borderRadius: "10px",
  },

  modalProductIcon: {
    width: "52px",
    height: "52px",
    background: "#FDF2F4",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    flexShrink: 0,
  },

  modalProductName: {
    margin: "0 0 4px",
    fontSize: "15px",
    fontWeight: "700",
    color: "#111827",
  },

  modalProductMeta: {
    margin: 0,
    fontSize: "13px",
    color: "#6B7280",
  },

  modalInfoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    padding: "10px 0",
    borderBottom: "1px solid #F3F4F6",
  },

  modalInfoLabel: {
    fontSize: "13px",
    color: "#6B7280",
    flexShrink: 0,
  },

  modalInfoValue: {
    fontSize: "13px",
    color: "#111827",
    textAlign: "right",
    fontWeight: "600",
  },

  modalCode: {
    background: "#F3F4F6",
    padding: "2px 8px",
    borderRadius: "4px",
    fontFamily: "monospace",
    fontSize: "12px",
  },

  modalTotalBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    background: "#FDF2F4",
    borderRadius: "10px",
    marginTop: "8px",
  },

  modalTotalValue: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
    color: "#B76E79",
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

export default MemberOrders;