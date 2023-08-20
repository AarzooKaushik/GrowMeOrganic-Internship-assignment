import React, { useState, useEffect } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { User } from './user.interface';

const UserTable: React.FC = () => {
  const [usersData, setUsersData] = useState<User[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data: User[] = await response.json();
        setUsersData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  const rows: GridRowsProp = usersData.map((user) => ({
    id: user.id,
    col1: user.id,
    col2: user.name,
    col3: user.email,
  }));

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'ID' },
    { field: 'col2', headerName: 'Name', width: 300 },
    { field: 'col3', headerName: 'Email', width: 400 },
  ];

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default UserTable;
