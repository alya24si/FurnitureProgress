import { useState } from "react";

function MemberProfile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [profile, setProfile] = useState({
    full_name: "Alya Deka",
    email: "alya.deka@email.com",
    phone: "+62 812-3456-7890",
    gender: "Perempuan",
    birth_date: "22 Juli 1998",
    member_since: "Januari 2024",
    membership_type: "Gold",
    member_code: "MBR-2024-0812",
    avatar: "A",
    bio: "Pecinta desain interior minimalis dan furniture scandinavian",
  });

  const [formData, setFormData] = useState({
    full_name: profile.full_name,
    email: profile.email,
    phone: profile.phone,
    gender: profile.gender,
    birth_date: profile.birth_date,
    bio: profile.bio,
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Rumah",
      name: "Alya Deka",
      phone: "+62 812-3456-7890",
      address: "Jl. Sudirman No. 45, RT 05/RW 02",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postal: "12190",
      isDefault: true,
      icon: "🏠",
    },
    {
      id: 2,
      label: "Kantor",
      name: "Alya Deka",
      phone: "+62 812-3456-7890",
      address: "Gedung Menara BCA Lt. 15, Jl. MH Thamrin No. 1",
      city: "Jakarta Pusat",
      province: "DKI Jakarta",
      postal: "10310",
      isDefault: false,
      icon: "🏢",
    },
    {
      id: 3,
      label: "Rumah Orang Tua",
      name: "Ibu Deka",
      phone: "+62 811-2233-4455",
      address: "Jl. Asia Afrika No. 88",
      city: "Bandung",
      province: "Jawa Barat",
      postal: "40110",
      isDefault: false,
      icon: "🏡",
    },
  ]);

  const [preferences, setPreferences] = useState({
    emailNotif: true,
    smsNotif: false,
    promoNotif: true,
    orderNotif: true,
    language: "Indonesia",
    currency: "IDR - Rupiah",
    theme: "Light",
  });

  const securityInfo = [
    {
      id: 1,
      title: "Password",
      description: "Terakhir diubah 3 bulan yang lalu",
      icon: "🔐",
      action: "Ubah",
      status: "Aman",
      statusColor: "#059669",
    },
    {
      id: 2,
      title: "Two-Factor Authentication",
      description: "Lindungi akun dengan verifikasi ganda",
      icon: "🛡",
      action: "Aktifkan",
      status: "Belum Aktif",
      statusColor: "#D97706",
    },
    {
      id: 3,
      title: "Perangkat Terhubung",
      description: "3 perangkat aktif saat ini",
      icon: "📱",
      action: "Kelola",
      status: "3 Aktif",
      statusColor: "#3B82F6",
    },
    {
      id: 4,
      title: "Login Activity",
      description: "Pantau riwayat login akun Anda",
      icon: "📊",
      action: "Lihat",
      status: "Aman",
      statusColor: "#059669",
    },
  ];

  const tabs = [
    { key: "personal", label: "Informasi Pribadi", icon: "👤" },
    { key: "address", label: "Alamat Pengiriman", icon: "📍" },
    { key: "security", label: "Keamanan Akun", icon: "🔐" },
    { key: "preferences", label: "Preferensi", icon: "⚙" },
  ];

  // Handlers
  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setFormData({
      full_name: profile.full_name,
      email: profile.email,
      phone: profile.phone,
      gender: profile.gender,
      birth_date: profile.birth_date,
      bio: profile.bio,
    });
  };

  const handleSaveProfile = () => {
    setProfile({ ...profile, ...formData });
    setEditMode(false);
    alert("Profil berhasil diperbarui!");
  };

  const handleOpenModal = (type, data = null) => {
    setModalType(type);
    setSelectedAddress(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType("");
    setSelectedAddress(null);
  };

  const handleDeleteAddress = (id) => {
    if (confirm("Hapus alamat ini?")) {
      setAddresses(addresses.filter((a) => a.id !== id));
      alert("Alamat berhasil dihapus.");
    }
  };

  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    alert("Alamat utama berhasil diubah.");
  };

  const handleTogglePreference = (key) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  const handleChangePassword = () => {
    alert("Membuka form ubah password...");
  };

  const handleEnable2FA = () => {
    alert("Mengaktifkan Two-Factor Authentication...");
  };

  const handleManageDevices = () => {
    alert("Membuka daftar perangkat terhubung...");
  };

  const handleViewLoginActivity = () => {
    alert("Membuka riwayat login...");
  };

  const handleLogout = () => {
    if (confirm("Yakin ingin keluar dari akun?")) {
      alert("Berhasil logout.");
    }
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "PERINGATAN: Tindakan ini tidak dapat dibatalkan!\n\nSemua data Anda akan dihapus permanen.\n\nLanjutkan?"
      )
    ) {
      alert("Permintaan penghapusan akun telah dikirim.");
    }
  };

  return (
    <div style={styles.wrapper}>

      {/* HEADER */}
      <header style={styles.header}>
        <div>
          <div style={styles.breadcrumb}>
            <span>Dashboard</span>
            <span style={styles.breadcrumbSep}>/</span>
            <span style={styles.breadcrumbCurrent}>Profil Saya</span>
          </div>
          <h1 style={styles.pageTitle}>Profil Saya</h1>
          <p style={styles.pageSubtitle}>
            Kelola informasi pribadi dan pengaturan akun Anda
          </p>
        </div>
      </header>

      {/* PROFILE HERO */}
      <div style={styles.heroCard}>
        <div style={styles.heroPattern}></div>
        <div style={styles.heroPattern2}></div>

        <div style={styles.heroContent}>
          <div style={styles.heroAvatar}>
            {profile.avatar}
            <span style={styles.heroAvatarBadge}>
              {profile.membership_type}
            </span>
          </div>

          <div style={styles.heroInfo}>
            <h2 style={styles.heroName}>{profile.full_name}</h2>
            <p style={styles.heroEmail}>{profile.email}</p>

            <div style={styles.heroMeta}>
              <span style={styles.heroMetaItem}>
                📧 {profile.member_code}
              </span>
              <span style={styles.heroMetaDivider}>•</span>
              <span style={styles.heroMetaItem}>
                📅 Member sejak {profile.member_since}
              </span>
            </div>

            <p style={styles.heroBio}>{profile.bio}</p>
          </div>

          <div style={styles.heroActions}>
            <button
              style={styles.heroBtnPrimary}
              onClick={handleEditProfile}
            >
              ✏️ Edit Profil
            </button>
            <button style={styles.heroBtnSecondary}>
              📷 Ganti Foto
            </button>
          </div>
        </div>
      </div>

      {/* TAB NAVIGATION */}
      <div style={styles.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            style={{
              ...styles.tab,
              ...(activeTab === tab.key ? styles.tabActive : {}),
            }}
            onClick={() => setActiveTab(tab.key)}
          >
            <span style={styles.tabIcon}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === "personal" && (
        <div style={styles.section}>
          <div style={styles.sectionHead}>
            <div>
              <h2 style={styles.sectionTitle}>Informasi Pribadi</h2>
              <p style={styles.sectionSubtitle}>
                Data yang akan ditampilkan di profil publik Anda
              </p>
            </div>
            {!editMode && (
              <button style={styles.editBtn} onClick={handleEditProfile}>
                ✏️ Edit
              </button>
            )}
          </div>

          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Nama Lengkap</label>
              {editMode ? (
                <input
                  type="text"
                  style={styles.formInput}
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                />
              ) : (
                <p style={styles.formValue}>{profile.full_name}</p>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Email</label>
              {editMode ? (
                <input
                  type="email"
                  style={styles.formInput}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              ) : (
                <p style={styles.formValue}>{profile.email}</p>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>No. Telepon</label>
              {editMode ? (
                <input
                  type="tel"
                  style={styles.formInput}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              ) : (
                <p style={styles.formValue}>{profile.phone}</p>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Jenis Kelamin</label>
              {editMode ? (
                <select
                  style={styles.formInput}
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                >
                  <option>Perempuan</option>
                  <option>Laki-laki</option>
                </select>
              ) : (
                <p style={styles.formValue}>{profile.gender}</p>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Tanggal Lahir</label>
              {editMode ? (
                <input
                  type="text"
                  style={styles.formInput}
                  value={formData.birth_date}
                  onChange={(e) =>
                    setFormData({ ...formData, birth_date: e.target.value })
                  }
                />
              ) : (
                <p style={styles.formValue}>{profile.birth_date}</p>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Member ID</label>
              <p style={{ ...styles.formValue, fontFamily: "monospace" }}>
                {profile.member_code}
              </p>
            </div>

            <div style={{ ...styles.formGroup, gridColumn: "1 / -1" }}>
              <label style={styles.formLabel}>Bio</label>
              {editMode ? (
                <textarea
                  style={{ ...styles.formInput, minHeight: "80px", resize: "vertical" }}
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
              ) : (
                <p style={styles.formValue}>{profile.bio}</p>
              )}
            </div>
          </div>

          {editMode && (
            <div style={styles.formActions}>
              <button style={styles.cancelBtn} onClick={handleCancelEdit}>
                Batal
              </button>
              <button style={styles.saveBtn} onClick={handleSaveProfile}>
                💾 Simpan Perubahan
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === "address" && (
        <div style={styles.section}>
          <div style={styles.sectionHead}>
            <div>
              <h2 style={styles.sectionTitle}>Alamat Pengiriman</h2>
              <p style={styles.sectionSubtitle}>
                Kelola alamat untuk pengiriman pesanan Anda
              </p>
            </div>
            <button
              style={styles.addBtn}
              onClick={() => handleOpenModal("addAddress")}
            >
              + Tambah Alamat
            </button>
          </div>

          <div style={styles.addressGrid}>
            {addresses.map((addr) => (
              <div
                key={addr.id}
                style={{
                  ...styles.addressCard,
                  ...(addr.isDefault ? styles.addressCardDefault : {}),
                }}
              >
                {addr.isDefault && (
                  <span style={styles.defaultBadge}>✓ Utama</span>
                )}

                <div style={styles.addressHeader}>
                  <div style={styles.addressIcon}>{addr.icon}</div>
                  <div>
                    <h3 style={styles.addressLabel}>{addr.label}</h3>
                    <p style={styles.addressName}>{addr.name}</p>
                  </div>
                </div>

                <div style={styles.addressBody}>
                  <p style={styles.addressLine}>📱 {addr.phone}</p>
                  <p style={styles.addressLine}>{addr.address}</p>
                  <p style={styles.addressLine}>
                    {addr.city}, {addr.province}
                  </p>
                  <p style={styles.addressLine}>Kode Pos: {addr.postal}</p>
                </div>

                <div style={styles.addressActions}>
                  {!addr.isDefault && (
                    <button
                      style={styles.addressBtnSecondary}
                      onClick={() => handleSetDefault(addr.id)}
                    >
                      Jadikan Utama
                    </button>
                  )}
                  <button
                    style={styles.addressBtnSecondary}
                    onClick={() => handleOpenModal("editAddress", addr)}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.addressBtnDanger}
                    onClick={() => handleDeleteAddress(addr.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "security" && (
        <div style={styles.section}>
          <div style={styles.sectionHead}>
            <div>
              <h2 style={styles.sectionTitle}>Keamanan Akun</h2>
              <p style={styles.sectionSubtitle}>
                Lindungi akun Anda dengan pengaturan keamanan
              </p>
            </div>
          </div>

          <div style={styles.securityList}>
            {securityInfo.map((item) => (
              <div key={item.id} style={styles.securityItem}>
                <div style={styles.securityIcon}>{item.icon}</div>
                <div style={styles.securityInfo}>
                  <h3 style={styles.securityTitle}>{item.title}</h3>
                  <p style={styles.securityDesc}>{item.description}</p>
                </div>
                <span
                  style={{
                    ...styles.securityStatus,
                    color: item.statusColor,
                  }}
                >
                  ● {item.status}
                </span>
                <button
                  style={styles.securityAction}
                  onClick={() => {
                    if (item.title === "Password") handleChangePassword();
                    else if (item.title.includes("Two-Factor")) handleEnable2FA();
                    else if (item.title.includes("Perangkat")) handleManageDevices();
                    else handleViewLoginActivity();
                  }}
                >
                  {item.action} →
                </button>
              </div>
            ))}
          </div>

          {/* DANGER ZONE */}
          <div style={styles.dangerZone}>
            <h3 style={styles.dangerTitle}>⚠️ Zona Berbahaya</h3>
            <p style={styles.dangerDesc}>
              Tindakan di bawah ini bersifat permanen dan tidak dapat dibatalkan
            </p>

            <div style={styles.dangerActions}>
              <button style={styles.dangerBtn} onClick={handleLogout}>
                🚪 Keluar dari Akun
              </button>
              <button style={styles.dangerBtnCritical} onClick={handleDeleteAccount}>
                🗑️ Hapus Akun Permanen
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "preferences" && (
        <div style={styles.section}>
          <div style={styles.sectionHead}>
            <div>
              <h2 style={styles.sectionTitle}>Preferensi</h2>
              <p style={styles.sectionSubtitle}>
                Sesuaikan pengalaman Anda di platform
              </p>
            </div>
          </div>

          <div style={styles.prefSection}>
            <h3 style={styles.prefSectionTitle}>🔔 Notifikasi</h3>
            <p style={styles.prefSectionDesc}>
              Pilih notifikasi yang ingin Anda terima
            </p>

            <div style={styles.prefList}>
              <div style={styles.prefItem}>
                <div>
                  <h4 style={styles.prefTitle}>Notifikasi Email</h4>
                  <p style={styles.prefDesc}>
                    Terima update pesanan dan promo via email
                  </p>
                </div>
                <button
                  style={{
                    ...styles.toggle,
                    ...(preferences.emailNotif ? styles.toggleOn : {}),
                  }}
                  onClick={() => handleTogglePreference("emailNotif")}
                >
                  <span
                    style={{
                      ...styles.toggleDot,
                      ...(preferences.emailNotif ? styles.toggleDotOn : {}),
                    }}
                  ></span>
                </button>
              </div>

              <div style={styles.prefItem}>
                <div>
                  <h4 style={styles.prefTitle}>Notifikasi SMS</h4>
                  <p style={styles.prefDesc}>
                    Terima notifikasi penting via SMS
                  </p>
                </div>
                <button
                  style={{
                    ...styles.toggle,
                    ...(preferences.smsNotif ? styles.toggleOn : {}),
                  }}
                  onClick={() => handleTogglePreference("smsNotif")}
                >
                  <span
                    style={{
                      ...styles.toggleDot,
                      ...(preferences.smsNotif ? styles.toggleDotOn : {}),
                    }}
                  ></span>
                </button>
              </div>

              <div style={styles.prefItem}>
                <div>
                  <h4 style={styles.prefTitle}>Promo & Penawaran</h4>
                  <p style={styles.prefDesc}>
                    Dapatkan info promo eksklusif member
                  </p>
                </div>
                <button
                  style={{
                    ...styles.toggle,
                    ...(preferences.promoNotif ? styles.toggleOn : {}),
                  }}
                  onClick={() => handleTogglePreference("promoNotif")}
                >
                  <span
                    style={{
                      ...styles.toggleDot,
                      ...(preferences.promoNotif ? styles.toggleDotOn : {}),
                    }}
                  ></span>
                </button>
              </div>

              <div style={styles.prefItem}>
                <div>
                  <h4 style={styles.prefTitle}>Update Pesanan</h4>
                  <p style={styles.prefDesc}>
                    Notifikasi status pengiriman pesanan
                  </p>
                </div>
                <button
                  style={{
                    ...styles.toggle,
                    ...(preferences.orderNotif ? styles.toggleOn : {}),
                  }}
                  onClick={() => handleTogglePreference("orderNotif")}
                >
                  <span
                    style={{
                      ...styles.toggleDot,
                      ...(preferences.orderNotif ? styles.toggleDotOn : {}),
                    }}
                  ></span>
                </button>
              </div>
            </div>
          </div>

          <div style={styles.prefSection}>
            <h3 style={styles.prefSectionTitle}>🌐 Regional</h3>
            <p style={styles.prefSectionDesc}>
              Pengaturan bahasa dan mata uang
            </p>

            <div style={styles.prefGrid}>
              <div style={styles.prefSelect}>
                <label style={styles.prefLabel}>Bahasa</label>
                <select style={styles.prefInput}>
                  <option>Indonesia</option>
                  <option>English</option>
                </select>
              </div>

              <div style={styles.prefSelect}>
                <label style={styles.prefLabel}>Mata Uang</label>
                <select style={styles.prefInput}>
                  <option>IDR - Rupiah</option>
                  <option>USD - Dollar</option>
                </select>
              </div>

              <div style={styles.prefSelect}>
                <label style={styles.prefLabel}>Tema Tampilan</label>
                <select style={styles.prefInput}>
                  <option>Light</option>
                  <option>Dark</option>
                  <option>System</option>
                </select>
              </div>
            </div>
          </div>

          <div style={styles.prefFooter}>
            <button style={styles.saveBtn} onClick={() => alert("Preferensi disimpan!")}>
              💾 Simpan Preferensi
            </button>
          </div>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {modalType === "addAddress" ? "Tambah Alamat Baru" : "Edit Alamat"}
              </h2>
              <button style={styles.modalClose} onClick={handleCloseModal}>
                ✕
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Label Alamat</label>
                <input
                  type="text"
                  style={styles.formInput}
                  placeholder="Contoh: Rumah, Kantor"
                  defaultValue={selectedAddress?.label || ""}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Nama Penerima</label>
                <input
                  type="text"
                  style={styles.formInput}
                  defaultValue={selectedAddress?.name || ""}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>No. Telepon</label>
                <input
                  type="tel"
                  style={styles.formInput}
                  defaultValue={selectedAddress?.phone || ""}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Alamat Lengkap</label>
                <textarea
                  style={{ ...styles.formInput, minHeight: "70px", resize: "vertical" }}
                  defaultValue={selectedAddress?.address || ""}
                />
              </div>

              <div style={styles.modalRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Kota</label>
                  <input
                    type="text"
                    style={styles.formInput}
                    defaultValue={selectedAddress?.city || ""}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Kode Pos</label>
                  <input
                    type="text"
                    style={styles.formInput}
                    defaultValue={selectedAddress?.postal || ""}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Provinsi</label>
                <input
                  type="text"
                  style={styles.formInput}
                  defaultValue={selectedAddress?.province || ""}
                />
              </div>

              <label style={styles.checkboxLabel}>
                <input type="checkbox" defaultChecked={selectedAddress?.isDefault} />
                <span>Jadikan alamat utama</span>
              </label>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.modalBtnSecondary} onClick={handleCloseModal}>
                Batal
              </button>
              <button
                style={styles.modalBtnPrimary}
                onClick={() => {
                  alert("Alamat berhasil disimpan!");
                  handleCloseModal();
                }}
              >
                💾 Simpan Alamat
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
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: "24px 32px",
    maxWidth: "1400px",
    margin: "0 auto",
  },

  header: {
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

  /* HERO */
  heroCard: {
    background: "linear-gradient(135deg, #B76E79 0%, #D49AA5 40%, #E8C5CE 70%, #D4A574 100%)",
    borderRadius: "16px",
    padding: "32px",
    marginBottom: "24px",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(183, 110, 121, 0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
    color: "#fff",
  },

  heroPattern: {
    position: "absolute",
    top: "-50%",
    right: "-10%",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
    borderRadius: "50%",
  },

  heroPattern2: {
    position: "absolute",
    bottom: "-40%",
    left: "-10%",
    width: "350px",
    height: "350px",
    background: "radial-gradient(circle, rgba(212,165,116,0.4) 0%, transparent 70%)",
    borderRadius: "50%",
  },

  heroContent: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    position: "relative",
    zIndex: 1,
  },

  heroAvatar: {
    width: "100px",
    height: "100px",
    background: "rgba(255,255,255,0.25)",
    border: "3px solid rgba(255,255,255,0.5)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
    fontWeight: "700",
    flexShrink: 0,
    position: "relative",
    backdropFilter: "blur(10px)",
  },

  heroAvatarBadge: {
    position: "absolute",
    bottom: "-4px",
    right: "-4px",
    padding: "4px 10px",
    background: "#fff",
    color: "#B76E79",
    borderRadius: "12px",
    fontSize: "10px",
    fontWeight: "700",
    border: "2px solid #fff",
  },

  heroInfo: {
    flex: 1,
  },

  heroName: {
    margin: "0 0 4px",
    fontSize: "26px",
    fontWeight: "700",
  },

  heroEmail: {
    margin: "0 0 10px",
    fontSize: "14px",
    opacity: 0.9,
  },

  heroMeta: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
    fontSize: "13px",
    flexWrap: "wrap",
  },

  heroMetaItem: {
    opacity: 0.95,
  },

  heroMetaDivider: {
    opacity: 0.5,
  },

  heroBio: {
    margin: 0,
    fontSize: "13px",
    opacity: 0.85,
    fontStyle: "italic",
  },

  heroActions: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flexShrink: 0,
  },

  heroBtnPrimary: {
    padding: "10px 20px",
    background: "#fff",
    color: "#B76E79",
    border: "none",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },

  heroBtnSecondary: {
    padding: "10px 20px",
    background: "rgba(255,255,255,0.2)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.4)",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    backdropFilter: "blur(10px)",
  },

  /* TABS */
  tabBar: {
    display: "flex",
    gap: "6px",
    background: "#fff",
    padding: "8px",
    borderRadius: "12px",
    border: "1px solid #E5E7EB",
    marginBottom: "16px",
    overflowX: "auto",
  },

  tab: {
    padding: "10px 16px",
    background: "transparent",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#6B7280",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    whiteSpace: "nowrap",
    transition: "all 0.15s",
  },

  tabActive: {
    background: "#FDF2F4",
    color: "#B76E79",
  },

  tabIcon: {
    fontSize: "14px",
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
    marginBottom: "24px",
    gap: "16px",
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

  editBtn: {
    padding: "8px 16px",
    background: "#FDF2F4",
    color: "#B76E79",
    border: "1px solid #FBCFE0",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },

  addBtn: {
    padding: "8px 16px",
    background: "#B76E79",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },

  /* FORM */
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "20px",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  formLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  formInput: {
    padding: "10px 12px",
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#111827",
    outline: "none",
    fontFamily: "inherit",
  },

  formValue: {
    margin: 0,
    padding: "10px 12px",
    background: "#F9FAFB",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#111827",
    fontWeight: "500",
  },

  formActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "24px",
    paddingTop: "20px",
    borderTop: "1px solid #F3F4F6",
  },

  cancelBtn: {
    padding: "10px 20px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#4B5563",
    cursor: "pointer",
  },

  saveBtn: {
    padding: "10px 20px",
    background: "#B76E79",
    border: "none",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#fff",
    cursor: "pointer",
  },

  /* ADDRESS */
  addressGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: "16px",
  },

  addressCard: {
    background: "#FAFAFA",
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
    padding: "18px",
    position: "relative",
  },

  addressCardDefault: {
    background: "#FDF2F4",
    borderColor: "#FBCFE0",
  },

  defaultBadge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    padding: "3px 10px",
    background: "#B76E79",
    color: "#fff",
    borderRadius: "10px",
    fontSize: "10px",
    fontWeight: "700",
  },

  addressHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
  },

  addressIcon: {
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

  addressLabel: {
    margin: "0 0 2px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#111827",
  },

  addressName: {
    margin: 0,
    fontSize: "12px",
    color: "#6B7280",
  },

  addressBody: {
    marginBottom: "14px",
  },

  addressLine: {
    margin: "0 0 4px",
    fontSize: "13px",
    color: "#4B5563",
    lineHeight: "1.5",
  },

  addressActions: {
    display: "flex",
    gap: "8px",
    paddingTop: "12px",
    borderTop: "1px solid #E5E7EB",
    flexWrap: "wrap",
  },

  addressBtnSecondary: {
    padding: "6px 12px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#4B5563",
    cursor: "pointer",
  },

  addressBtnDanger: {
    padding: "6px 12px",
    background: "#fff",
    border: "1px solid #FECACA",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#DC2626",
    cursor: "pointer",
  },

  /* SECURITY */
  securityList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "24px",
  },

  securityItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px",
    background: "#FAFAFA",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
  },

  securityIcon: {
    width: "44px",
    height: "44px",
    background: "#FDF2F4",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    flexShrink: 0,
  },

  securityInfo: {
    flex: 1,
  },

  securityTitle: {
    margin: "0 0 2px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#111827",
  },

  securityDesc: {
    margin: 0,
    fontSize: "12px",
    color: "#6B7280",
  },

  securityStatus: {
    fontSize: "12px",
    fontWeight: "600",
    flexShrink: 0,
  },

  securityAction: {
    padding: "6px 12px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#B76E79",
    cursor: "pointer",
    flexShrink: 0,
  },

  /* DANGER ZONE */
  dangerZone: {
    padding: "20px",
    background: "#FEF2F2",
    border: "1px solid #FECACA",
    borderRadius: "12px",
  },

  dangerTitle: {
    margin: "0 0 6px",
    fontSize: "15px",
    fontWeight: "700",
    color: "#991B1B",
  },

  dangerDesc: {
    margin: "0 0 16px",
    fontSize: "13px",
    color: "#7F1D1D",
  },

  dangerActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  dangerBtn: {
    padding: "10px 16px",
    background: "#fff",
    border: "1px solid #FECACA",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#991B1B",
    cursor: "pointer",
  },

  dangerBtnCritical: {
    padding: "10px 16px",
    background: "#DC2626",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#fff",
    cursor: "pointer",
  },

  /* PREFERENCES */
  prefSection: {
    marginBottom: "24px",
    paddingBottom: "24px",
    borderBottom: "1px solid #F3F4F6",
  },

  prefSectionTitle: {
    margin: "0 0 4px",
    fontSize: "15px",
    fontWeight: "700",
    color: "#111827",
  },

  prefSectionDesc: {
    margin: "0 0 16px",
    fontSize: "13px",
    color: "#6B7280",
  },

  prefList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  prefItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    padding: "14px",
    background: "#FAFAFA",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
  },

  prefTitle: {
    margin: "0 0 2px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
  },

  prefDesc: {
    margin: 0,
    fontSize: "12px",
    color: "#6B7280",
  },

  toggle: {
    width: "44px",
    height: "24px",
    background: "#E5E7EB",
    border: "none",
    borderRadius: "12px",
    padding: "2px",
    cursor: "pointer",
    position: "relative",
    flexShrink: 0,
    transition: "all 0.2s",
  },

  toggleOn: {
    background: "#B76E79",
  },

  toggleDot: {
    width: "20px",
    height: "20px",
    background: "#fff",
    borderRadius: "50%",
    display: "block",
    transition: "all 0.2s",
    transform: "translateX(0)",
  },

  toggleDotOn: {
    transform: "translateX(20px)",
  },

  prefGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: "16px",
  },

  prefSelect: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  prefLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  prefInput: {
    padding: "10px 12px",
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#111827",
    outline: "none",
    fontFamily: "inherit",
  },

  prefFooter: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "8px",
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
    maxWidth: "560px",
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
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  modalRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#4B5563",
    cursor: "pointer",
    padding: "8px 0",
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

export default MemberProfile;