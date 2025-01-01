//import React from "react";
import { UserIcon } from "./icons/UserIcon";
import { Employee } from "../types/employee";

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export function EmployeeCard({ employee, onEdit, onDelete }: EmployeeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        {employee.imageUrl ? (
          <img
            src={employee.imageUrl}
            alt={`${employee.firstName} ${employee.lastName}`}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <UserIcon />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {employee.firstName} {employee.lastName}
          </h3>
          <p className="text-sm text-gray-600">{employee.position}</p>
          <p className="text-sm text-gray-500">{employee.department}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>{employee.email}</span>
          <span>•</span>
          <span>{employee.phoneNumber}</span>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {employee.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
      <button
        onClick={() => onEdit(employee)}
        className="mt-4 w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
      >
        Edit Profile
      </button>
      <button
        onClick={() => onDelete(employee)}
        className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
      >
        Delete Profile
      </button>
    </div>
  );
}
