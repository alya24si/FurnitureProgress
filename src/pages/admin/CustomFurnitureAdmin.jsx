import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import {
  FiUser,
  FiPackage,
  FiDollarSign,
  FiCheckCircle,
} from "react-icons/fi";

const CustomFurnitureAdmin = () => {
  const [data, setData] = useState([]);
  const [priceInput, setPriceInput] = useState({});

  const fetchData = async () => {
    const { data } = await supabase
      .from("custom_furniture")
      .select("*")
      .order("created_at", { ascending: false });

    setData(data || []);
  };

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel("custom")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "custom_furniture",
        },
        fetchData
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const setPrice = async (id) => {
    const price = priceInput[id];

    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 3);

    await supabase
      .from("custom_furniture")
      .update({
        price,
        status: "waiting_payment",
        payment_deadline: deadline,
      })
      .eq("id", id);

    fetchData();
  };

  const approve = async (id) => {
    await supabase
      .from("custom_furniture")
      .update({ status: "approved" })
      .eq("id", id);

    fetchData();
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          ✨ Custom Furniture Requests
        </h1>

        <p style={styles.subtitle}>
          Manage customer custom furniture requests
        </p>
      </div>

      <div style={styles.grid}>
        {data.map((item) => (
          <div
            key={item.id}
            style={styles.card}
            className="custom-card"
          >
            <div style={styles.glow}></div>

            <div style={styles.cardHeader}>
              <div style={styles.avatar}>
                <FiUser />
              </div>

              <div>
                <h3 style={styles.customerName}>
                  {item.customer_name}
                </h3>

                <span
                  style={{
                    ...styles.status,
                    background:
                      item.status === "approved"
                        ? "#DCFCE7"
                        : item.status === "waiting_payment"
                        ? "#FEF3C7"
                        : "#F3F4F6",
                    color:
                      item.status === "approved"
                        ? "#16A34A"
                        : item.status === "waiting_payment"
                        ? "#D97706"
                        : "#6B7280",
                  }}
                >
                  {item.status}
                </span>
              </div>
            </div>

            <div style={styles.infoBox}>
              <p style={styles.info}>
                <FiPackage />
                {item.furniture_type}
              </p>

              <p style={styles.info}>
                <strong>Material :</strong> {item.material}
              </p>

              <p style={styles.info}>
                <strong>Color :</strong> {item.color}
              </p>
            </div>

            <div style={styles.inputWrapper}>
              <FiDollarSign style={styles.inputIcon} />

              <input
                placeholder="Set Harga"
                onChange={(e) =>
                  setPriceInput({
                    ...priceInput,
                    [item.id]: e.target.value,
                  })
                }
                style={styles.input}
              />
            </div>

            <div style={styles.buttonGroup}>
              <button
                onClick={() => setPrice(item.id)}
                style={styles.btn}
              >
                Set Price
              </button>

              <button
                onClick={() => approve(item.id)}
                style={styles.btn2}
              >
                <FiCheckCircle />
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          .custom-card{
            position:relative;
            overflow:hidden;
            transition:all .4s ease;
          }

          .custom-card:hover{
            transform:translateY(-10px) scale(1.02);
            box-shadow:0 25px 50px rgba(183,110,121,.25);
          }

          .custom-card::before{
            content:'';
            position:absolute;
            top:0;
            left:-100%;
            width:100%;
            height:100%;
            background:linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.5),
              transparent
            );
            transition:.9s;
          }

          .custom-card:hover::before{
            left:100%;
          }

          button:hover{
            opacity:.9;
            transform:translateY(-2px);
          }

          button{
            transition:.3s ease;
          }

          input:focus{
            border:1px solid #B76E79;
            box-shadow:0 0 0 4px rgba(183,110,121,.15);
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  page: {
    padding: "30px",
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#F8F5F2 0%,#FFFDFD 100%)",
  },

  header: {
    marginBottom: "30px",
  },

  title: {
    fontSize: "34px",
    fontWeight: "700",
    color: "#2D3748",
    marginBottom: "8px",
  },

  subtitle: {
    color: "#718096",
    fontSize: "15px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(340px,1fr))",
    gap: "24px",
  },

  card: {
    background: "rgba(255,255,255,.85)",
    backdropFilter: "blur(12px)",
    borderRadius: "24px",
    padding: "24px",
    border: "1px solid rgba(255,255,255,.4)",
    boxShadow:
      "0 15px 35px rgba(0,0,0,.08)",
  },

  glow: {
    position: "absolute",
    top: "-40px",
    right: "-40px",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background:
      "rgba(183,110,121,.15)",
    filter: "blur(40px)",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },

  avatar: {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg,#B76E79,#D9A5A5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "22px",
    boxShadow:
      "0 8px 20px rgba(183,110,121,.25)",
  },

  customerName: {
    margin: 0,
    fontSize: "20px",
    color: "#2D3748",
  },

  status: {
    display: "inline-block",
    marginTop: "6px",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
  },

  infoBox: {
    marginBottom: "18px",
  },

  info: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#4A5568",
    marginBottom: "10px",
  },

  inputWrapper: {
    position: "relative",
    marginTop: "10px",
  },

  inputIcon: {
    position: "absolute",
    top: "13px",
    left: "12px",
    color: "#B76E79",
  },

  input: {
    width: "100%",
    padding: "12px 12px 12px 38px",
    borderRadius: "14px",
    border: "1px solid #E2E8F0",
    outline: "none",
    fontSize: "14px",
    transition: ".3s",
    boxSizing: "border-box",
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "18px",
  },

  btn: {
    flex: 1,
    border: "none",
    padding: "12px",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg,#B76E79,#D9A5A5)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },

  btn2: {
    flex: 1,
    border: "none",
    padding: "12px",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg,#22C55E,#16A34A)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
};

export default CustomFurnitureAdmin;