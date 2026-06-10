import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

function LoginCustomer() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        // 🔐 LOGIN PAKAI SUPABASE AUTH
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.log("LOGIN ERROR:", error);
            alert(error.message);
        }

        // (opsional) cek role dari tabel profiles
        const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.user.id)
            .single();

        if (profile && profile.role !== "user") {
            alert("Akun bukan customer");
            return;
        }

        alert("Login berhasil");

        navigate("/");
    };

    return (
        <div style={styles.card}>
            <h1 style={styles.title}>
                Customer Login
            </h1>

            <p style={styles.subtitle}>
                Login untuk mulai berbelanja
            </p>

            <form onSubmit={handleLogin}>
                <input
                    style={styles.input}
                    placeholder="Email"
                    type="email"
                    required
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    style={styles.input}
                    placeholder="Password"
                    type="password"
                    required
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button
                    type="submit"
                    style={styles.button}
                >
                    Login Customer
                </button>
            </form>
        </div>
    );
}

const styles = {
    card: {
        background: "#fff",
        padding: "35px",
        borderRadius: "25px",
        boxShadow: "0 10px 30px rgba(183,110,121,.15)",
    },

    title: {
        color: "#5C3D2E",
        marginBottom: "5px",
    },

    subtitle: {
        color: "#9B7B7B",
        marginBottom: "30px",
    },

    input: {
        width: "100%",
        padding: "14px",
        marginBottom: "15px",
        border: "1px solid #E5D0D3",
        borderRadius: "12px",
    },

    button: {
        width: "100%",
        padding: "14px",
        background: "#B76E79",
        color: "#fff",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer",
        fontWeight: "600",
    },
};

export default LoginCustomer;