import { useState } from "react";

function MemberVoucher() {
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      title: "Diskon 20%",
      code: "MEMBER20",
      expired: "31 Des 2026",
      status: "Aktif",
    },
    {
      id: 2,
      title: "Gratis Ongkir",
      code: "ONGKIRFREE",
      expired: "15 Nov 2026",
      status: "Aktif",
    },
    {
      id: 3,
      title: "Cashback Rp100.000",
      code: "CASHBACK100",
      expired: "01 Okt 2026",
      status: "Terpakai",
    },
  ]);

  const claimVoucher = (voucher) => {
    alert(`Voucher ${voucher.code} berhasil diklaim`);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>Voucher Member</h1>
        <p>Voucher eksklusif khusus member</p>
      </div>

      <div style={styles.grid}>
        {vouchers.map((item) => (
          <div key={item.id} style={styles.card}>
            <h2>{item.title}</h2>

            <p>
              Kode Voucher :
              <strong> {item.code}</strong>
            </p>

            <p>
              Berlaku sampai :
              {item.expired}
            </p>

            <span
              style={{
                ...styles.status,
                background:
                  item.status === "Aktif"
                    ? "#E8F5E9"
                    : "#F5F5F5",
                color:
                  item.status === "Aktif"
                    ? "#2E7D32"
                    : "#777",
              }}
            >
              {item.status}
            </span>

            <button
              disabled={item.status !== "Aktif"}
              style={styles.button}
              onClick={() => claimVoucher(item)}
            >
              Klaim Voucher
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    background: "#F8F9FB",
    minHeight: "100vh",
  },

  header: {
    marginBottom: "25px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(300px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "15px",
    padding: "25px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,.05)",
  },

  status: {
    padding: "8px 15px",
    borderRadius: "20px",
    display: "inline-block",
    marginTop: "10px",
    fontWeight: "600",
  },

  button: {
    width: "100%",
    marginTop: "20px",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    background: "#B76E79",
    color: "#fff",
    cursor: "pointer",
  },
};

export default MemberVoucher;