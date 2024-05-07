import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Student {
  id: number;
  Fname: string;
  Lname: string;
  Age: number;
  CGPA: number;
}

const StudentsList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/students/get');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Students List</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">CGPA</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border px-4 py-2">{student.id}</td>
              <td className="border px-4 py-2">{student.Fname}</td>
              <td className="border px-4 py-2">{student.Lname}</td>
              <td className="border px-4 py-2">{student.Age}</td>
              <td className="border px-4 py-2">{student.CGPA}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsList;
