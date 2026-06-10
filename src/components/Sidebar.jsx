import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiGrid,
  FiBox,
  FiUsers,
  FiTrendingUp,
  FiMoreVertical
} from 'react-icons/fi';

import SidebarReusable from '../Reusable/Sidebar';
import NavItem from '../Reusable/NavItem';

const sidebarStyles = `
  .sidebar {
    width: 260px;
    min-width: 260px;
    background: linear-gradient(180deg, #fff7f8 0%, #ffffff 100%);
    border-right: 1px solid #f1d6d9;
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .sidebar-logo {
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .sidebar-logo img {
    height: 52px;
    object-fit: contain;
    filter: drop-shadow(0 4px 10px rgba(183, 110, 121, 0.25));
  }

  .sidebar-nav {
    flex: 1;
    overflow-y: auto;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 24px;
  }

  .sidebar-nav::-webkit-scrollbar {
    display: none;
  }

  .sidebar-nav {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .nav-item {
    display: flex;
    align-items: center;
    padding: 11px 14px;
    border-radius: 12px;
    cursor: pointer;
    color: #6b5b5f;
    transition: all 0.25s ease;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    gap: 12px;
    position: relative;
  }

  .nav-item:hover {
    background: rgba(183, 110, 121, 0.08);
    color: #b76e79;
    transform: translateX(3px);
  }

  .nav-icon {
    font-size: 18px;
    transition: all 0.25s ease;
  }

  .nav-item.active {
    background: linear-gradient(135deg, #b76e79, #d9a5a5);
    color: #fff;
    font-weight: 600;
    box-shadow: 0 6px 18px rgba(183, 110, 121, 0.25);
  }

  .nav-item.active .nav-icon {
    color: #fff;
  }

  .nav-item.active::before {
    content: '';
    position: absolute;
    left: -16px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 32px;
    background: #b76e79;
    border-radius: 0 4px 4px 0;
    box-shadow: 0 0 10px rgba(183, 110, 121, 0.4);
  }

  .sidebar-footer {
    padding: 16px;
  }

  .profile-widget {
    background: linear-gradient(135deg, #b76e79, #d9a5a5);
    border-radius: 14px;
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: #fff;
    position: relative;
    box-shadow: 0 8px 22px rgba(183, 110, 121, 0.25);
  }

  .profile-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.9);
  }

  .profile-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  .profile-name {
    font-size: 13px;
    font-weight: 700;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .profile-email {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.85);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .profile-menu-btn {
    background: rgba(255,255,255,0.15);
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: all 0.2s ease;
  }

  .profile-menu-btn:hover {
    background: rgba(255,255,255,0.25);
    transform: rotate(10deg);
  }
`;

// =========================
// 🔥 FIX LOGIC ONLY
// =========================
const Sidebar = ({ search = "" }) => {
  const navigate = useNavigate();

  const keyword = search.toLowerCase().trim();

  return (
    <>
      <style>{sidebarStyles}</style>

      <SidebarReusable className="sidebar">
        <div className="sidebar-logo">
          <img src="/assets/images/logofix.jpeg" alt="Logo" />
        </div>

        <nav className="sidebar-nav">

          {/* DASHBOARD (ONLY ROUTE ACTIVE) */}
          <NavLink
            to="/admin/dashboard"
            end
            className={({ isActive }) =>
              `nav-item${isActive ? ' active' : ''}`
            }
          >
            <FiGrid className="nav-icon" />
            <span>Dashboard</span>
          </NavLink>

          {/* PRODUCTS */}
          <NavLink
            to="/admin/product-crm"
            className={({ isActive }) =>
              `nav-item${(isActive || keyword.includes("product") || keyword.includes("produk")) ? ' active' : ''}`
            }
          >
            <FiBox className="nav-icon" />
            <span>Products</span>
          </NavLink>

          {/* CUSTOMERS */}
          <NavLink
            to="/admin/customers"
            className={({ isActive }) =>
              `nav-item${(isActive || keyword.includes("customer") || keyword.includes("pelanggan")) ? ' active' : ''}`
            }
          >
            <FiUsers className="nav-icon" />
            <span>Customers</span>
          </NavLink>

          {/* MEMBERSHIP */}
          <NavLink
            to="/admin/membership-crm"
            className={({ isActive }) =>
              `nav-item${(isActive || keyword.includes("member") || keyword.includes("membership")) ? ' active' : ''}`
            }
          >
            <FiUsers className="nav-icon" />
            <span>Membership</span>
          </NavLink>

          {/* FEEDBACK */}
          <NavLink
            to="/admin/feedback"
            className={({ isActive }) =>
              `nav-item${(isActive || keyword.includes("feedback")) ? ' active' : ''}`
            }
          >
            <FiUsers className="nav-icon" />
            <span>Feedback</span>
          </NavLink>

          {/* ANALYTICS */}
          <NavLink
            to="/admin/analytics"
            className={({ isActive }) =>
              `nav-item${(isActive || keyword.includes("analytics")) ? ' active' : ''}`
            }
          >
            <FiTrendingUp className="nav-icon" />
            <span>Analytics</span>
          </NavLink>

          {/* CAMPAIGN */}
          <NavLink
            to="/admin/campaign"
            className={({ isActive }) =>
              `nav-item${(isActive || keyword.includes("campaign")) ? ' active' : ''}`
            }
          >
            <FiTrendingUp className="nav-icon" />
            <span>Campaign</span>
          </NavLink>

          {/* SALES REPORT */}
          <NavItem
            onClick={() => navigate('/sales-report')}
            className="nav-item"
          >
            <FiTrendingUp className="nav-icon" />
            Sales Report
          </NavItem>

        </nav>

        <div className="sidebar-footer">
          <div className="profile-widget">
            <img
              src="https://ui-avatars.com/api/?name=Alya+Deka&background=f9fafb&color=101828"
              alt="Admin"
              className="profile-avatar"
            />

            <div className="profile-info">
              <h4 className="profile-name">Alya Deka</h4>
              <p className="profile-email">alya@furniture.com</p>
            </div>

            <button
              className="profile-menu-btn"
              onClick={() => navigate('/login')}
              title="Signout"
            >
              <FiMoreVertical size={18} />
            </button>
          </div>
        </div>
      </SidebarReusable>
    </>
  );
};

export default Sidebar;