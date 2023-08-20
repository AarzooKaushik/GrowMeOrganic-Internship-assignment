import React, { useState } from "react";
import "./style.css";

interface DepartmentItem {
  department: string;
  sub_departments: string[];
}

const Department: React.FC = () => {
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<string[]>([]);

  const toggleDepartmentExpansion = (department: string) => {
    setExpandedDepartments(prevExpanded => prevExpanded.includes(department)
      ? prevExpanded.filter(dep => dep !== department)
      : [...prevExpanded, department]
    );
  };

  const toggleDepartmentSelection = (department: string) => {
    setSelectedSubDepartments(prevSelectedSubs => {
      const subDepsToAdd = departmentData.find(d => d.department === department)?.sub_departments || [];
      return prevSelectedSubs.includes(department)
        ? prevSelectedSubs.filter(subDep => !subDepsToAdd.includes(subDep))
        : [...prevSelectedSubs, ...subDepsToAdd];
    });
  
    setSelectedDepartments(prevSelected => {
      const departmentDataItem = departmentData.find(d => d.department === department);
      if (departmentDataItem) {
        const allSubDepartmentsSelected = departmentDataItem.sub_departments.every(subDep =>
          selectedSubDepartments.includes(subDep)
        );
  
        return allSubDepartmentsSelected || selectedSubDepartments.includes(department) ||
          prevSelected.includes(department)
          ? prevSelected.filter(dep => dep !== department)
          : [...prevSelected, department];
      } else {
        return prevSelected;
      }
    });
  };
  
  

  const toggleSubDepartment = (subDepartment: string, department: string) => {
    setSelectedSubDepartments(prevSelectedSubs => {
      const updatedSubs = prevSelectedSubs.includes(subDepartment)
        ? prevSelectedSubs.filter(subDep => subDep !== subDepartment)
        : [...prevSelectedSubs, subDepartment];
  
      const departmentDataItem = departmentData.find(d => d.department === department);
      if (departmentDataItem) {
        const allSubDepartmentsSelected = departmentDataItem.sub_departments.every(subDep =>
          updatedSubs.includes(subDep)
        );
  
        setSelectedDepartments(prevSelected => {
          if (allSubDepartmentsSelected) {
            return prevSelected.includes(department)
              ? prevSelected
              : [...prevSelected, department];
          } else {
            return prevSelected.filter(dep => dep !== department);
          }
        });
      }
  
      return updatedSubs;
    });
  };
  

  const departmentData: DepartmentItem[] = [
    {
      department: "customer_service",
      sub_departments: ["support", "customer_success"],
    },
    {
      department: "design",
      sub_departments: ["graphic_design", "product_design", "web_design"],
    },
  ];

  return (
    <div className="departments">
      <h1>Departments</h1>
      {departmentData.map(departmentItem => (
        <div key={departmentItem.department}>
          <span
            className="department-toggle"
            onClick={() => toggleDepartmentExpansion(departmentItem.department)}
          >
            {expandedDepartments.includes(departmentItem.department) ? "-" : "+"}
          </span>
          <label>
            <input
              type="checkbox"
              checked={selectedDepartments.includes(departmentItem.department)}
              onChange={() => toggleDepartmentSelection(departmentItem.department)}
            />
            {departmentItem.department}
          </label>
          {expandedDepartments.includes(departmentItem.department) && (
            <ul>
              {departmentItem.sub_departments.map(subDepartment => (
                <li className="subDepartment" key={subDepartment}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedSubDepartments.includes(subDepartment)}
                      onChange={() => toggleSubDepartment(subDepartment, departmentItem.department)}
                    />
                    {subDepartment}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Department;
