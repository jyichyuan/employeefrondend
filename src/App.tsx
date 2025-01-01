import React, { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { EmployeeCard } from "./components/EmployeeCard";
import { EmployeeForm } from "./components/EmployeeForm";
import { Employee, EmployeeFormData } from "./types/employee";
import { PlusCircleIcon } from "./components/icons/PlusCircleIcon";
import { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee} from "./api/apiClient";
//import { helloWorld } from "./api/index";

// Temporary mock data
const mockEmployees: Employee[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    position: "Senior Developer",
    department: "Engineering",
    joinDate: "2022-01-15",
    phoneNumber: "(555) 123-4567",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@company.com",
    position: "Product Manager",
    department: "Product",
    joinDate: "2021-08-20",
    phoneNumber: "(555) 987-6543",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skills: ["Product Strategy", "Agile", "User Research"],
  },
];

function App() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees();
        if (data) {
          setEmployees(data);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async (data: EmployeeFormData) => {
    try {
      if (editingEmployee) {
        //Handle update (editing existing employee)
        const updatedEmployee = await updateEmployee(editingEmployee.id, data);
        setEmployees((prev) =>
          prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
        );
      } else {
        // Handle creation of new employee
        const newEmployee = await createEmployee(data);
        setEmployees((prev) => [...prev, newEmployee]);
      }
      setIsFormOpen(false);
      setEditingEmployee(undefined);
    } catch (error) {
      console.error("Error submitting employee data", error);
    }
  };

  const handleEdit = async (employee: Employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleDelete = async (employee: Employee) => {
    try{
      await deleteEmployee(employee.id);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting employee data", error);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Employee Portfolio
          </h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <PlusCircleIcon />
            Add Employee
          </button>
        </div>

        {isFormOpen ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingEmployee ? "Edit Employee" : "Add New Employee"}
            </h2>
            <EmployeeForm
              initialData={editingEmployee}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingEmployee(undefined);
              }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {employees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
