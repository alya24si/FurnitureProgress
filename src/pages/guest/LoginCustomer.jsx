import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

function LoginCustomer() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ Cek apakah sudah login (jika ya, redirect ke home)
    useEffect(() => {
        const customer = localStorage.getItem("customer");
        if (customer) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 🔐 LOGIN PAKAI SUPABASE AUTH
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.log("LOGIN ERROR:", error);
                alert("Login gagal: " + error.message);
                setLoading(false);
                return;
            }

            // ✅ (opsional) cek role dari tabel profiles
            const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", data.user.id)
                .single();

            if (profile && profile.role !== "user") {
                alert("Akun bukan customer");
                await supabase.auth.signOut();
                setLoading(false);
                return;
            }

            // ✅ SIMPAN DATA CUSTOMER KE LOCALSTORAGE
            const customerData = {
                id: data.user.id,
                email: data.user.email,
                full_name: profile?.full_name || data.user.email.split("@")[0],
                phone: profile?.phone || "",
                role: profile?.role || "user",
            };

            localStorage.setItem("customer", JSON.stringify(customerData));

            alert("Login berhasil! Selamat datang, " + customerData.full_name);

            // ✅ Cek apakah ada redirect URL setelah login
            const redirectUrl = localStorage.getItem("redirectAfterLogin");
            if (redirectUrl) {
                localStorage.removeItem("redirectAfterLogin");
                navigate(redirectUrl);
            } else {
                navigate("/");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Terjadi kesalahan saat login");
        } finally {
            setLoading(false);
        }
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />

                <input
                    style={styles.input}
                    placeholder="Password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />

                <button
                    type="submit"
                    style={styles.button}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Login Customer"}
                </button>
            </form>

            <p style={styles.registerLink}>
                Belum punya akun?{" "}
                <a href="/register" style={styles.link}>
                    Daftar di sini
                </a>
            </p>
        </div>
    );
}

const styles = {
    card: {
        background: "#fff",
        padding: "35px",
        borderRadius: "25px",
        boxShadow: "0 10px 30px rgba(183,110,121,.15)",
        maxWidth: "400px",
        width: "100%",
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
        fontSize: "14px",
        boxSizing: "border-box",
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
        fontSize: "15px",
    },

    registerLink: {
        textAlign: "center",
        marginTop: "20px",
        fontSize: "14px",
        color: "#6B7280",
    },

    link: {
        color: "#B76E79",
        fontWeight: "600",
        textDecoration: "none",
    },
};

export default LoginCustomer;