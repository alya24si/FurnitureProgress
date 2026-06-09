import { useParams } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import Card from '../../Reusable/Card';

function CustomerDetail() {
  const { id } = useParams();

  const [search, setSearch] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newStatus, setNewStatus] = useState('Active');

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Alya Deka',
      email: 'alya@gmail.com',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Andi Saputra',
      email: 'andi@gmail.com',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Dinda Safitri',
      email: 'dinda@gmail.com',
      status: 'Inactive',
    },
  ]);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addCustomer = () => {
    if (!newName.trim() || !newEmail.trim()) {
      alert('Nama dan Email harus diisi!');
      return;
    }

    const newCustomer = {
      id: customers.length + 1,
      name: newName,
      email: newEmail,
      status: newStatus,
    };

    setCustomers([...customers, newCustomer]);

    setNewName('');
    setNewEmail('');
    setNewStatus('Active');
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1 className="admin-page-title">Customer Detail</h1>
      <p className="admin-page-subtitle">Informasi detail customer</p>

      <h3>Tambah Customer</h3>

      <input
        type="text"
        placeholder="Nama Customer"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          marginBottom: '10px',
        }}
      />

      <input
        type="email"
        placeholder="Email Customer"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          marginBottom: '10px',
        }}
      />

      <select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          marginBottom: '10px',
        }}
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <button
        onClick={addCustomer}
        style={{
          backgroundColor: '#054C73',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Tambah Customer
      </button>

      <input
        ref={inputRef}
        type="text"
        placeholder="Cari customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          marginBottom: '20px',
        }}
      />

      <Card
        style={{
          borderRadius: '16px',
          border: '1px solid #f3f4f6',
          padding: '28px',
        }}
      >
        <p style={styles.idRow}>
          Daftar Customer ({search ? filteredCustomers.length : customers.length})
        </p>

        {(search ? filteredCustomers : customers).length > 0 ? (
          (search ? filteredCustomers : customers).map((customer) => (
            <div
              key={customer.id}
              style={{
                borderBottom: '1px solid #eee',
                padding: '12px 0',
              }}
            >
              <p style={styles.item}>
                <strong>ID:</strong> {customer.id}
              </p>

              <p style={styles.item}>
                <strong>Nama:</strong> {customer.name}
              </p>

              <p style={styles.item}>
                <strong>Email:</strong> {customer.email}
              </p>

              <p style={styles.item}>
                <strong>Status:</strong>{' '}
                <span
                  style={{
                    color:
                      customer.status === 'Active'
                        ? 'green'
                        : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {customer.status}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p>Tidak ada customer yang ditemukan.</p>
        )}
      </Card>
    </>
  );
}

const styles = {
  idRow: {
    fontSize: '16px',
    color: '#6b7280',
    margin: '0 0 20px',
    paddingBottom: '16px',
    borderBottom: '1px solid #f3f4f6',
  },
  item: {
    fontSize: '14px',
    color: '#374151',
    margin: '5px 0',
  },
};

export default CustomerDetail;