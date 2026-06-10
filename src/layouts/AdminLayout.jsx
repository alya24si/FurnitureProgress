import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FiSearch, FiBell } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

const adminLayoutStyles = `
  .admin-root {
    display: flex;
    height: 100vh;
    background: linear-gradient(135deg, #fff7f8 0%, #fdfdfd 100%);
    font-family: 'Inter', sans-serif;
  }

  .admin-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-width: 0;
  }

  .admin-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 32px;
    background: #fff;
    border-bottom: 1px solid #f1d6d9;
    flex-shrink: 0;
    box-shadow: 0 4px 20px rgba(183, 110, 121, 0.08);
  }

  .admin-search-box {
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 12px;
    padding: 10px 16px;
    width: 380px;
    border: 1px solid #f1d6d9;
    transition: all 0.25s ease;
    position: relative;
  }

  .admin-search-box:focus-within {
    border-color: #b76e79;
    box-shadow: 0 0 0 3px rgba(183, 110, 121, 0.15);
  }

  .admin-search-box input {
    background: transparent;
    border: none;
    outline: none;
    margin-left: 12px;
    width: 100%;
    font-size: 14px;
    color: #4b2e33;
  }

  .search-dropdown {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: #fff;
    border: 1px solid #f1d6d9;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
    z-index: 999;
    overflow: hidden;
  }

  .search-item {
    padding: 12px;
    cursor: pointer;
    font-size: 14px;
    color: #4b2e33;
    transition: 0.2s;
  }

  .search-item:hover {
    background: rgba(183, 110, 121, 0.08);
  }

  .admin-header-right {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .admin-notif-btn {
    position: relative;
    padding: 8px;
    background: none;
    border: none;
    color: #b76e79;
    cursor: pointer;
    font-size: 20px;
  }

  .admin-notif-dot {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 9px;
    height: 9px;
    background: #d9a5a5;
    border-radius: 50%;
    border: 2px solid #fff;
  }

  .admin-profile {
    display: flex;
    align-items: center;
    gap: 12px;
    border-left: 1px solid #f1d6d9;
    padding-left: 24px;
  }

  .admin-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #f1d6d9;
  }

  .admin-name {
    font-size: 14px;
    font-weight: 700;
    color: #4b2e33;
    margin: 0;
  }

  .admin-role {
    font-size: 12px;
    color: #8b6b70;
    margin: 0;
  }

  .admin-content {
    flex: 1;
    overflow-y: auto;
    padding: 32px;
  }
`;

const AdminLayout = () => {
  // ===================== SEARCH STATE =====================
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // ===================== MENU DATA =====================
  const menu = [
    { name: "Dashboard" },
    { name: "Products" },
    { name: "Customers" },
    { name: "Membership" },
    { name: "Feedback" },
    { name: "Analytics" },
    { name: "Campaign" }
  ];

  // ===================== HANDLE SEARCH =====================
  const handleSearch = (value) => {
    setSearch(value);

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    const filtered = menu.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);
  };

  return (
    <>
      <style>{adminLayoutStyles}</style>

      <div className="admin-root">
        {/* PASS SEARCH KE SIDEBAR */}
        <Sidebar search={search} />

        <div className="admin-main">
          {/* HEADER */}
          <header className="admin-header">

            <div className="admin-search-box">

              <FiSearch style={{ color: "#b76e79", fontSize: 18 }} />

              <input
                type="text"
                placeholder="Cari Products / Customers / Membership..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />

              {/* 🔥 DROPDOWN SUGGESTION */}
              {suggestions.length > 0 && (
                <div className="search-dropdown">
                  {suggestions.map((item, index) => (
                    <div
                      key={index}
                      className="search-item"
                      onClick={() => {
                        setSearch(item.name);
                        setSuggestions([]);
                      }}
                    >
                      🔍 {item.name}
                    </div>
                  ))}
                </div>
              )}

            </div>

            <div className="admin-header-right">
              <button className="admin-notif-btn">
                <FiBell />
                <span className="admin-notif-dot"></span>
              </button>

              <div className="admin-profile">
                <img
                  src="https://ui-avatars.com/api/?name=Alya+Deka&background=b76e79&color=fff"
                  alt="Admin"
                  className="admin-avatar"
                />
                <div>
                  <p className="admin-name">Alya Deka</p>
                  <p className="admin-role">Administrator</p>
                </div>
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <div className="admin-content">
            <Outlet context={{ search }} />
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminLayout;