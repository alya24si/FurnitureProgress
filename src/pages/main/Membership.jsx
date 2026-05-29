import { useState } from 'react';

const Membership = () => {

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Alya Deka',
      email: 'alya@gmail.com',
      membership: 'Gold'
    }
  ]);

  const [form, setForm] = useState({
    name: '',
    email: '',
    membership: 'Silver'
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCustomer = {
      id: customers.length + 1,
      ...form
    };

    setCustomers([...customers, newCustomer]);

    setForm({
      name: '',
      email: '',
      membership: 'Silver'
    });
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>Membership Customer</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={styles.form}>

        <input
          type="text"
          name="name"
          placeholder="Nama Customer"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <select
          name="membership"
          value={form.membership}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
          <option value="Platinum">Platinum</option>
        </select>

        <button type="submit" style={styles.button}>
          Daftar Membership
        </button>

      </form>

      {/* TABLE */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Membership</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.membership}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9'
  },

  title: {
    marginBottom: '30px'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '400px',
    marginBottom: '40px'
  },

  input: {
    padding: '12px',
    fontSize: '16px'
  },

  button: {
    padding: '14px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    cursor: 'pointer'
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white'
  }
};

export default Membership;