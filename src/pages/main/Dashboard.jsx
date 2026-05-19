import { FiMoreVertical, FiTrendingUp, FiShoppingBag, FiUsers, FiDollarSign } from 'react-icons/fi';
import Card from '../../Reusable/Card';
import Table from '../../Reusable/Table';

const dashboardStyles = `
  /* Stats Cards Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 28px;
  }

  .stat-card {
    background: #fff;
    padding: 22px 20px 18px;
    border-radius: 14px;
    border: 1px solid #EDEDF0;
    box-shadow: 0 2px 8px rgba(110, 57, 203, 0.05);
    display: flex;
    flex-direction: column;
    gap: 10px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .stat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(110, 57, 203, 0.12);
  }

  .stat-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .stat-label {
    font-size: 13px;
    color: #89868D;
    font-weight: 500;
    margin: 0;
  }

  .stat-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 18px;
    transition: transform 0.2s;
  }

  .stat-card:hover .stat-icon { transform: scale(1.08); }

  .stat-icon.revenue   { background: #EDE4F9; color: #6E39CB; }
  .stat-icon.orders    { background: #FFF3E0; color: #E67E22; }
  .stat-icon.customers { background: #E8F5E9; color: #2E7D32; }
  .stat-icon.conversion{ background: #E3F2FD; color: #1565C0; }

  .stat-value {
    font-size: 28px;
    font-weight: 800;
    color: #3A3541;
    margin: 0;
    line-height: 1;
  }

  /* Progress bar under value */
  .stat-bar {
    height: 4px;
    border-radius: 4px;
    background: #EDEDF0;
    overflow: hidden;
  }

  .stat-bar-fill {
    height: 100%;
    border-radius: 4px;
    background: linear-gradient(90deg, #9B6EE0 0%, #6E39CB 100%);
  }

  .stat-change {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    gap: 4px;
  }

  .stat-change.positive { color: #22c55e; }
  .stat-change.negative { color: #ef4444; }
  .stat-change span.muted { color: #B4B2B7; font-weight: 400; }

  /* Bottom Grid */
  .bottom-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
  }

  /* Card */
  .card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #EDEDF0;
    box-shadow: 0 2px 8px rgba(110, 57, 203, 0.05);
    padding: 22px;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .card-title {
    font-size: 16px;
    font-weight: 700;
    color: #3A3541;
    margin: 0;
  }

  .view-all-btn {
    font-size: 13px;
    color: #6E39CB;
    font-weight: 600;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'Lato', sans-serif;
    transition: opacity 0.2s;
    padding: 4px 10px;
    border-radius: 6px;
  }

  .view-all-btn:hover {
    background: #EDE4F9;
    opacity: 1;
  }

  .more-btn {
    padding: 6px;
    background: none;
    border: none;
    color: #89868D;
    cursor: pointer;
    border-radius: 8px;
    transition: background 0.15s;
    display: flex;
    align-items: center;
  }

  .more-btn:hover { background: #F0EAFA; color: #6E39CB; }

  /* Table */
  .orders-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  .orders-table thead th {
    font-size: 11px;
    font-weight: 700;
    color: #B4B2B7;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding-bottom: 12px;
    border-bottom: 1px solid #EDEDF0;
  }

  .orders-table tbody tr {
    border-bottom: 1px solid #F7F6FB;
    transition: background 0.15s;
    cursor: pointer;
  }

  .orders-table tbody tr:hover { background: #F7F6FB; }
  .orders-table tbody td { padding: 13px 0; font-size: 14px; }
  .orders-table .order-id { font-weight: 700; color: #3A3541; }
  .orders-table tbody tr:hover .order-id { color: #6E39CB; }
  .orders-table .customer-name { color: #3A3541; }
  .orders-table .order-date { color: #89868D; }
  .orders-table .order-amount { font-weight: 700; color: #3A3541; }

  .status-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
  }

  .status-badge.completed  { background: #E8F5E9; color: #2E7D32; }
  .status-badge.processing { background: #EDE4F9; color: #6E39CB; }
  .status-badge.cancelled  { background: #FDECEA; color: #C62828; }

  /* Product Row */
  .product-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px;
    margin: 0 -10px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.15s;
  }

  .product-row:hover { background: #F7F6FB; }
  .product-row + .product-row { margin-top: 4px; }

  .product-img {
    width: 46px;
    height: 46px;
    border-radius: 10px;
    object-fit: cover;
    flex-shrink: 0;
    background: #F0EAFA;
    transition: transform 0.2s;
  }

  .product-row:hover .product-img { transform: scale(1.06); }
  .product-info { flex: 1; min-width: 0; }

  .product-name {
    font-size: 14px;
    font-weight: 700;
    color: #3A3541;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.15s;
  }

  .product-row:hover .product-name { color: #6E39CB; }

  .product-category {
    font-size: 12px;
    color: #89868D;
    margin: 2px 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .product-price { text-align: right; flex-shrink: 0; }
  .product-price p:first-child { font-size: 14px; font-weight: 700; color: #6E39CB; margin: 0; }
  .product-price p:last-child  { font-size: 11px; color: #B4B2B7; margin: 2px 0 0; }

  @media (max-width: 1200px) {
    .stats-grid  { grid-template-columns: repeat(2, 1fr); }
    .bottom-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 768px) {
    .stats-grid { grid-template-columns: 1fr; }
  }
`;

const Dashboard = () => {
  return (
    <>
      <style>{dashboardStyles}</style>

      <h1 className="admin-page-title" style={{ color: '#3A3541' }}>Dashboard Admin </h1>
      <p className="admin-page-subtitle" style={{ color: '#89868D' }}>Selamat Datang, Alya!</p>

      {/* Stats Cards */}
      <div className="stats-grid">
        <Card className="stat-card">
          <div className="stat-card-top">
            <p className="stat-label">Total Revenue</p>
            <div className="stat-icon revenue"><FiDollarSign /></div>
          </div>
          <p className="stat-value">$378,560</p>
          <div className="stat-bar"><div className="stat-bar-fill" style={{ width: '72%' }}></div></div>
          <div className="stat-change positive">
            <span>+12.5%</span><span className="muted">vs last month</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-card-top">
            <p className="stat-label">Total Orders</p>
            <div className="stat-icon orders"><FiShoppingBag /></div>
          </div>
          <p className="stat-value">19,222</p>
          <div className="stat-bar"><div className="stat-bar-fill" style={{ width: '58%' }}></div></div>
          <div className="stat-change positive">
            <span>+8.2%</span><span className="muted">vs last month</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-card-top">
            <p className="stat-label">Total Customers</p>
            <div className="stat-icon customers"><FiUsers /></div>
          </div>
          <p className="stat-value">1,615</p>
          <div className="stat-bar"><div className="stat-bar-fill" style={{ width: '45%' }}></div></div>
          <div className="stat-change negative">
            <span>-3.4%</span><span className="muted">vs last month</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-card-top">
            <p className="stat-label">Conversion Rate</p>
            <div className="stat-icon conversion"><FiTrendingUp /></div>
          </div>
          <p className="stat-value">4.8%</p>
          <div className="stat-bar"><div className="stat-bar-fill" style={{ width: '35%' }}></div></div>
          <div className="stat-change positive">
            <span>+1.1%</span><span className="muted">vs last month</span>
          </div>
        </Card>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="bottom-grid">
        {/* Recent Orders */}
        <Card className="card">
          <div className="card-header">
            <h2 className="card-title">Recent Orders</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <Table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="order-id">#ORD-001</td>
                  <td className="customer-name">Muhammad Raeihan</td>
                  <td className="order-date">Oct 22, 2025</td>
                  <td className="order-amount">$150.00</td>
                  <td><span className="status-badge completed">Completed</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-002</td>
                  <td className="customer-name">Alya Deka</td>
                  <td className="order-date">Oct 26, 2025</td>
                  <td className="order-amount">$360.00</td>
                  <td><span className="status-badge processing">Processing</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-003</td>
                  <td className="customer-name">Muhammad Andi</td>
                  <td className="order-date">Oct 23, 2025</td>
                  <td className="order-amount">$89.50</td>
                  <td><span className="status-badge completed">Completed</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-004</td>
                  <td className="customer-name">Dinda Safitri</td>
                  <td className="order-date">Oct 22, 2025</td>
                  <td className="order-amount">$210.00</td>
                  <td><span className="status-badge cancelled">Cancelled</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-005</td>
                  <td className="customer-name">Andi Saputra</td>
                  <td className="order-date">Oct 21, 2025</td>
                  <td className="order-amount">$55.00</td>
                  <td><span className="status-badge completed">Completed</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-006</td>
                  <td className="customer-name">Ayu Lestari</td>
                  <td className="order-date">Oct 20, 2025</td>
                  <td className="order-amount">$310.00</td>
                  <td><span className="status-badge processing">Processing</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-007</td>
                  <td className="customer-name">Budi Hartono</td>
                  <td className="order-date">Oct 20, 2025</td>
                  <td className="order-amount">$78.00</td>
                  <td><span className="status-badge completed">Completed</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-008</td>
                  <td className="customer-name">Citra Maharani</td>
                  <td className="order-date">Oct 19, 2025</td>
                  <td className="order-amount">$640.00</td>
                  <td><span className="status-badge processing">Processing</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-009</td>
                  <td className="customer-name">Doni Kurniawan</td>
                  <td className="order-date">Oct 19, 2025</td>
                  <td className="order-amount">$150.00</td>
                  <td><span className="status-badge completed">Completed</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-010</td>
                  <td className="customer-name">Eka Putri</td>
                  <td className="order-date">Oct 18, 2025</td>
                  <td className="order-amount">$95.00</td>
                  <td><span className="status-badge cancelled">Cancelled</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-011</td>
                  <td className="customer-name">Fajar Ramadhan</td>
                  <td className="order-date">Oct 18, 2025</td>
                  <td className="order-amount">$500.00</td>
                  <td><span className="status-badge processing">Processing</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-012</td>
                  <td className="customer-name">Gina Permata</td>
                  <td className="order-date">Oct 17, 2025</td>
                  <td className="order-amount">$135.00</td>
                  <td><span className="status-badge completed">Completed</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-013</td>
                  <td className="customer-name">Hendra Wijaya</td>
                  <td className="order-date">Oct 17, 2025</td>
                  <td className="order-amount">$260.00</td>
                  <td><span className="status-badge processing">Processing</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-014</td>
                  <td className="customer-name">Intan Sari</td>
                  <td className="order-date">Oct 16, 2025</td>
                  <td className="order-amount">$180.00</td>
                  <td><span className="status-badge completed">Completed</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-015</td>
                  <td className="customer-name">Joko Susanto</td>
                  <td className="order-date">Oct 16, 2025</td>
                  <td className="order-amount">$420.00</td>
                  <td><span className="status-badge cancelled">Cancelled</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-016</td>
                  <td className="customer-name">Kartika Dewi</td>
                  <td className="order-date">Oct 15, 2025</td>
                  <td className="order-amount">$230.00</td>
                  <td><span className="status-badge completed">Completed</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-017</td>
                  <td className="customer-name">Lukman Hakim</td>
                  <td className="order-date">Oct 15, 2023</td>
                  <td className="order-amount">$75.00</td>
                  <td><span className="status-badge processing">Processing</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-018</td>
                  <td className="customer-name">Maya Anggraini</td>
                  <td className="order-date">Oct 14, 2023</td>
                  <td className="order-amount">$610.00</td>
                  <td><span className="status-badge completed">Completed</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-019</td>
                  <td className="customer-name">Nanda Prakoso</td>
                  <td className="order-date">Oct 14, 2023</td>
                  <td className="order-amount">$145.00</td>
                  <td><span className="status-badge processing">Processing</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-020</td>
                  <td className="customer-name">Olivia Putri</td>
                  <td className="order-date">Oct 13, 2023</td>
                  <td className="order-amount">$390.00</td>
                  <td><span className="status-badge completed">Completed</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-021</td>
                  <td className="customer-name">Putra Mahendra</td>
                  <td className="order-date">Oct 13, 2023</td>
                  <td className="order-amount">$88.00</td>
                  <td><span className="status-badge cancelled">Cancelled</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-022</td>
                  <td className="customer-name">Qori Anisa</td>
                  <td className="order-date">Oct 12, 2023</td>
                  <td className="order-amount">$172.00</td>
                  <td><span className="status-badge completed">Completed</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-023</td>
                  <td className="customer-name">Rafi Saputra</td>
                  <td className="order-date">Oct 12, 2023</td>
                  <td className="order-amount">$530.00</td>
                  <td><span className="status-badge processing">Processing</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-024</td>
                  <td className="customer-name">Salsa Nabila</td>
                  <td className="order-date">Oct 11, 2023</td>
                  <td className="order-amount">$112.00</td>
                  <td><span className="status-badge completed">Completed</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-025</td>
                  <td className="customer-name">Teguh Prasetyo</td>
                  <td className="order-date">Oct 11, 2023</td>
                  <td className="order-amount">$205.00</td>
                  <td><span className="status-badge processing">Processing</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-026</td>
                  <td className="customer-name">Ulfa Rahma</td>
                  <td className="order-date">Oct 10, 2023</td>
                  <td className="order-amount">$67.00</td>
                  <td><span className="status-badge completed">Completed</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-027</td>
                  <td className="customer-name">Vina Melati</td>
                  <td className="order-date">Oct 10, 2023</td>
                  <td className="order-amount">$480.00</td>
                  <td><span className="status-badge cancelled">Cancelled</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-028</td>
                  <td className="customer-name">Wahyu Hidayat</td>
                  <td className="order-date">Oct 09, 2023</td>
                  <td className="order-amount">$158.00</td>
                  <td><span className="status-badge completed">Completed</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-029</td>
                  <td className="customer-name">Yuni Kartika</td>
                  <td className="order-date">Oct 09, 2023</td>
                  <td className="order-amount">$320.00</td>
                  <td><span className="status-badge processing">Processing</span></td>
                </tr>
                <tr>
                  <td className="order-id">#ORD-030</td>
                  <td className="customer-name">Zaki Firmansyah</td>
                  <td className="order-date">Oct 08, 2023</td>
                  <td className="order-amount">$99.00</td>
                  <td><span className="status-badge completed">Completed</span></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Card>

        {/* Top Products */}
        <Card className="card">
          <div className="card-header">
            <h2 className="card-title">Top Products</h2>
            <button className="more-btn"><FiMoreVertical /></button>
          </div>
          <div>
            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=150&q=80" alt="Meja Kayu Minimalis" className="product-img" />
              <div className="product-info">
                <p className="product-name">Meja Kayu Minimalis</p>
                <p className="product-category">Modern wooden dining table</p>
              </div>
              <div className="product-price">
                <p>$3.200.000</p>
                <p>124 sales</p>
              </div>
            </div>

            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1517705008128-361805f42e86?w=150&q=80" alt="Sofa Scandinavian" className="product-img" />
              <div className="product-info">
                <p className="product-name">Sofa Scandinavian</p>
                <p className="product-category">Comfortable modern sofa</p>
              </div>
              <div className="product-price">
                <p>$6.500.000</p>
                <p>98 sales</p>
              </div>
            </div>

            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=150&q=80" alt="Lemari Pakaian Jati" className="product-img" />
              <div className="product-info">
                <p className="product-name">Lemari Pakaian Jati</p>
                <p className="product-category">Premium teak wardrobe</p>
              </div>
              <div className="product-price">
                <p>$8.000.000</p>
                <p>74 sales</p>
              </div>
            </div>

            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=150&q=80" alt="Rak TV Modern" className="product-img" />
              <div className="product-info">
                <p className="product-name">Rak TV Modern</p>
                <p className="product-category">Minimalist entertainment cabinet</p>
              </div>
              <div className="product-price">
                <p>$4.500.000</p>
                <p>52 sales</p>
              </div>
            </div>

            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=150&q=80" alt="Kursi Cafe Vintage" className="product-img" />
              <div className="product-info">
                <p className="product-name">Kursi Cafe Vintage</p>
                <p className="product-category">Classic wooden cafe chair</p>
              </div>
              <div className="product-price">
                <p>$1.800.000</p>
                <p>89 sales</p>
              </div>
            </div>

            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=150&q=80" alt="Sofa L Minimalis" className="product-img" />
              <div className="product-info">
                <p className="product-name">Sofa L Minimalis</p>
                <p className="product-category">Luxury corner sofa</p>
              </div>
              <div className="product-price">
                <p>$9.500.000</p>
                <p>67 sales</p>
              </div>
            </div>

            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=150&q=80" alt="Meja Belajar Anak" className="product-img" />
              <div className="product-info">
                <p className="product-name">Meja Belajar Anak</p>
                <p className="product-category">Kids study desk</p>
              </div>
              <div className="product-price">
                <p>$2.200.000</p>
                <p>105 sales</p>
              </div>
            </div>

            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=150&q=80" alt="Set Meja Makan" className="product-img" />
              <div className="product-info">
                <p className="product-name">Set Meja Makan</p>
                <p className="product-category">6-seat dining table set</p>
              </div>
              <div className="product-price">
                <p>$7.800.000</p>
                <p>58 sales</p>
              </div>
            </div>

            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=150&q=80" alt="Rak Buku Minimalis" className="product-img" />
              <div className="product-info">
                <p className="product-name">Rak Buku Minimalis</p>
                <p className="product-category">Modern bookshelf</p>
              </div>
              <div className="product-price">
                <p>$3.100.000</p>
                <p>81 sales</p>
              </div>
            </div>

            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=150&q=80" alt="Tempat Tidur Jati" className="product-img" />
              <div className="product-info">
                <p className="product-name">Tempat Tidur Jati</p>
                <p className="product-category">King size teak bed</p>
              </div>
              <div className="product-price">
                <p>$10.000.000</p>
                <p>46 sales</p>
              </div>
            </div>

            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=150&q=80" alt="Kitchen Cabinet" className="product-img" />
              <div className="product-info">
                <p className="product-name">Kitchen Cabinet</p>
                <p className="product-category">Modern kitchen storage</p>
              </div>
              <div className="product-price">
                <p>$12.500.000</p>
                <p>39 sales</p>
              </div>
            </div>

            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1494526585095-c41746248156?w=150&q=80" alt="Kursi Kantor Ergonomis" className="product-img" />
              <div className="product-info">
                <p className="product-name">Kursi Kantor Ergonomis</p>
                <p className="product-category">Comfort office chair</p>
              </div>
              <div className="product-price">
                <p>$2.900.000</p>
                <p>133 sales</p>
              </div>
            </div>

            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=150&q=80" alt="Meja Kerja Modern" className="product-img" />
              <div className="product-info">
                <p className="product-name">Meja Kerja Modern</p>
                <p className="product-category">Minimalist office desk</p>
              </div>
              <div className="product-price">
                <p>$4.000.000</p>
                <p>77 sales</p>
              </div>
            </div>

            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=150&q=80" alt="Lemari Sepatu" className="product-img" />
              <div className="product-info">
                <p className="product-name">Lemari Sepatu</p>
                <p className="product-category">Wooden shoe cabinet</p>
              </div>
              <div className="product-price">
                <p>$1.700.000</p>
                <p>91 sales</p>
              </div>
            </div>

            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=150&q=80" alt="Kabinet Pajangan" className="product-img" />
              <div className="product-info">
                <p className="product-name">Kabinet Pajangan</p>
                <p className="product-category">Glass display cabinet</p>
              </div>
              <div className="product-price">
                <p>$5.600.000</p>
                <p>44 sales</p>
              </div>
            </div>

            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1464890100898-a385f744067f?w=150&q=80" alt="Bangku Taman" className="product-img" />
              <div className="product-info">
                <p className="product-name">Bangku Taman</p>
                <p className="product-category">Outdoor wooden bench</p>
              </div>
              <div className="product-price">
                <p>$2.400.000</p>
                <p>64 sales</p>
              </div>
            </div>

            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=150&q=80" alt="Meja Rias Elegan" className="product-img" />
              <div className="product-info">
                <p className="product-name">Meja Rias Elegan</p>
                <p className="product-category">Luxury dressing table</p>
              </div>
              <div className="product-price">
                <p>$3.900.000</p>
                <p>57 sales</p>
              </div>
            </div>

            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=150&q=80" alt="Bean Bag Santai" className="product-img" />
              <div className="product-info">
                <p className="product-name">Bean Bag Santai</p>
                <p className="product-category">Comfortable lounge bean bag</p>
              </div>
              <div className="product-price">
                <p>$1.200.000</p>
                <p>142 sales</p>
              </div>
            </div>

            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=150&q=80" alt="Meja Kopi Industrial" className="product-img" />
              <div className="product-info">
                <p className="product-name">Meja Kopi Industrial</p>
                <p className="product-category">Industrial style coffee table</p>
              </div>
              <div className="product-price">
                <p>$2.700.000</p>
                <p>73 sales</p>
              </div>
            </div>

            <div className="product-row">
              <img src="https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=150&q=80" alt="Rak Dinding Kayu" className="product-img" />
              <div className="product-info">
                <p className="product-name">Rak Dinding Kayu</p>
                <p className="product-category">Floating wooden shelf</p>
              </div>
              <div className="product-price">
                <p>$950.000</p>
                <p>118 sales</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
