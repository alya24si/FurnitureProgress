import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

function LoginAdmin() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        // 🔐 LOGIN PAKAI SUPABASE AUTH
        const { data, error } = await supabase.auth.signInWithPassword({
            email: username.trim(),
            password,
        });

        if (error) {
            alert("Username atau password salah");
            return;
        }

        // 👮 CEK ROLE DARI SUPABASE (WAJIB UNTUK ADMIN)
        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.user.id)
            .single();

        if (profileError || !profile) {
            alert("Akun tidak ditemukan");
            return;
        }

        if (profile.role !== "admin") {
            alert("Kamu bukan admin!");
            return;
        }

        // ⚠️ localStorage masih boleh untuk session (TIDAK DILARANG DOSEN)
        localStorage.setItem(
            "admin",
            JSON.stringify({
                id: data.user.id,
                email: data.user.email,
                role: "admin",
            })
        );

        navigate("/admin/dashboard");
    };

    return (
        <div style={styles.card}>
            <h1 style={styles.title}>Admin Login</h1>

            <p style={styles.subtitle}>
                Furniture CRM Dashboard
            </p>

            <form onSubmit={handleLogin}>
                <input
                    style={styles.input}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    style={styles.input}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" style={styles.button}>
                    Login Admin
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
    title: { color: "#5C3D2E" },
    subtitle: { color: "#9B7B7B", marginBottom: "30px" },
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
        fontWeight: "600",
        cursor: "pointer",
    },
};

export default LoginAdmin;