const MembershipCRM = () => {
  const members = [
    {
      id: "MBR001",
      name: "Alya Deka",
      type: "Gold",
      email: "alya@gmail.com",
      status: "Aktif",
    },
    {
      id: "MBR002",
      name: "Rehan",
      type: "Silver",
      email: "rehan@gmail.com",
      status: "Menunggu",
    },
  ];

  return (
    <div>
      <h1>Kelola Membership</h1>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Tipe</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.type}</td>
              <td>{member.status}</td>

              <td>
                <button>
                  Setujui
                </button>

                <button>
                  Tolak
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};

export default MembershipCRM;