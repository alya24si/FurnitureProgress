import { useNavigate } from "react-router-dom";

function RegisterPilih() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h1>Pilih Jenis Register</h1>
            <p>Silakan pilih akun yang ingin dibuat</p>

            <div style={styles.box}>
                <button
                    style={styles.btn}
                    onClick={() => navigate("/register")}
                >
                    Register Customer
                </button>

                <button
                    style={styles.btn}
                    onClick={() => navigate("/register-admin")}
                >
                    Register Admin
                </button>

                {/* 🔥 TAMBAHAN PENTING */}
                <button
                    style={styles.btn}
                    onClick={() => navigate("/login")}
                >
                    Sudah punya akun? Login
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        textAlign: "center",
        marginTop: "100px",
    },
    box: {
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        marginTop: "30px",
    },
    btn: {
        padding: "15px 25px",
        background: "#B76E79",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
    },
};

export default RegisterPilih;