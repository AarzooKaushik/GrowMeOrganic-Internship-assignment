import React from "react";
import UserTable from "../../components/userTable";
import Department from "../../components/departments";

const HomePage: React.FC = () => {
  return (
    <div>
      <UserTable />
      <Department/>
    </div>
  );
};

export default HomePage;