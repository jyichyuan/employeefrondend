import axios from "axios";

const API_BASE_URL = "https://employeeapi-avav.onrender.com"; // Replace with your actual API base URL

const API_URL = API_BASE_URL + "/api/v1";

// Fetch all employees
export async function getAllEmployees() {
    try {
        const response = await axios.get(`${API_URL}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching employees:", error);
    }
}

// Fetch an employee by ID
export async function getEmployeeById(id) {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching employee with ID ${id}:`, error);
    }
}

// Create a new employee
export async function createEmployee(employee) {
    try {
        const response = await axios.post(`${API_URL}`, employee);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating employee:", error);
    }
}

// Update an employee by ID
export async function updateEmployee(id, employee) {
    try {
        const response = await axios.put(`${API_URL}/${id}`, employee);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error updating employee with ID ${id}:`, error);
    }
}

// Delete an employee by ID
export async function deleteEmployee(id) {
    try {
        await axios.delete(`${API_URL}/${id}`);
        console.log(`Employee with ID ${id} deleted successfully`);
    } catch (error) {
        console.error(`Error deleting employee with ID ${id}:`, error);
    }
}
