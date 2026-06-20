import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
    FiHome,
    FiShoppingBag,
    FiGift,
    FiClock,
    FiUser,
    FiLogOut,
    FiAward
} from "react-icons/fi";

import { supabase } from "../services/supabase";

function MemberLayout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };

    return (
        <div style={styles.wrapper}>

            {/* SIDEBAR */}
            <aside style={styles.sidebar}>

                <div>

                    <div className="sidebar-logo">
                        <img
                            src="/assets/images/logofix.jpeg"
                            alt="Logo"
                            style={{ width: "100px", height: "auto" }}
                        />
                    </div>

                    {/* MEMBER CARD */}
                    <div style={styles.memberCard}>
                        <div style={styles.memberAvatar}>
                            👤
                        </div>

                        <div>
                            <h4 style={styles.memberName}>
                                Premium Member
                            </h4>

                            <p style={styles.memberType}>
                                Gold Membership
                            </p>
                        </div>
                    </div>

                    {/* MENU */}
                    <nav style={styles.menu}>

                        <NavLink
                            to="/member/dashboard"
                            style={({ isActive }) => ({
                                ...styles.link,
                                ...(isActive ? styles.activeLink : {})
                            })}
                        >
                            <FiHome />
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/member/orders"
                            style={({ isActive }) => ({
                                ...styles.link,
                                ...(isActive ? styles.activeLink : {})
                            })}
                        >
                            <FiShoppingBag />
                            My Orders
                        </NavLink>

                        <NavLink
                            to="/member/rewards"
                            style={({ isActive }) => ({
                                ...styles.link,
                                ...(isActive ? styles.activeLink : {})
                            })}
                        >
                            <FiGift />
                            Rewards
                        </NavLink>

                        <NavLink
                            to="/member/history"
                            style={({ isActive }) => ({
                                ...styles.link,
                                ...(isActive ? styles.activeLink : {})
                            })}
                        >
                            <FiClock />
                            Activity
                        </NavLink>

                        <NavLink
                            to="/member/profile"
                            style={({ isActive }) => ({
                                ...styles.link,
                                ...(isActive ? styles.activeLink : {})
                            })}
                        >
                            <FiUser />
                            Profile
                        </NavLink>

                    </nav>
                </div>

                {/* FOOTER */}
                <div>

                    <div style={styles.premiumBox}>
                        <h4>
                            ⭐ Premium Benefits
                        </h4>

                        <p>
                            Nikmati voucher eksklusif,
                            cashback dan prioritas layanan.
                        </p>
                    </div>

                    <button
                        style={styles.logoutButton}
                        onClick={handleLogout}
                    >
                        <FiLogOut />
                        Logout
                    </button>

                </div>

            </aside>

            {/* CONTENT */}
            <main style={styles.content}>
                <Outlet />
            </main>

        </div>
    );
}

const styles = {

    wrapper: {
        display: "flex",
        minHeight: "100vh",
        background: "#F5F6FA",
    },

    sidebar: {
        width: "300px",
        background: "#FFFFFF",
        borderRight: "1px solid #EAEAEA",

        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        padding: "25px",
        overflowY: "auto",

        boxShadow:
            "5px 0 20px rgba(0,0,0,.05)",
    },

    logoSection: {
        textAlign: "center",
        marginBottom: "30px",
    },

    logoCircle: {
        width: "70px",
        height: "70px",
        borderRadius: "50%",
        background:
            "linear-gradient(135deg,#B76E79,#D9A5AF)",

        margin: "0 auto 15px",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        fontSize: "30px",
    },

    logo: {
        margin: 0,
        color: "#B76E79",
        fontSize: "24px",
        fontWeight: "700",
    },

    logoSub: {
        color: "#888",
        marginTop: "5px",
    },

    memberCard: {
        background:
            "linear-gradient(135deg,#B76E79,#D9A5AF)",

        color: "#fff",

        borderRadius: "20px",

        padding: "18px",

        display: "flex",
        alignItems: "center",
        gap: "15px",

        marginBottom: "30px",
    },

    memberAvatar: {
        width: "55px",
        height: "55px",
        borderRadius: "50%",

        background: "#fff",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        fontSize: "24px",
    },

    memberName: {
        margin: 0,
        fontSize: "16px",
    },

    memberType: {
        marginTop: "4px",
        fontSize: "13px",
        opacity: ".9",
    },

    menu: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },

    link: {
        display: "flex",
        alignItems: "center",
        gap: "14px",

        padding: "15px 18px",

        textDecoration: "none",

        color: "#555",

        borderRadius: "14px",

        fontWeight: "600",

        transition: ".3s",
    },

    activeLink: {
        background:
            "linear-gradient(135deg,#B76E79,#D9A5AF)",
        color: "#fff",
    },

    premiumBox: {
        background: "#FFF5F6",
        padding: "18px",
        borderRadius: "16px",
        marginBottom: "20px",
    },

    logoutButton: {
        width: "100%",

        border: "none",

        background:
            "linear-gradient(135deg,#FF6B6B,#FF8787)",

        color: "#fff",

        padding: "15px",

        borderRadius: "14px",

        cursor: "pointer",

        fontWeight: "600",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
    },

    content: {
        flex: 1,

        marginLeft: "300px",

        padding: "35px",

        minHeight: "100vh",
    },
};

export default MemberLayout;