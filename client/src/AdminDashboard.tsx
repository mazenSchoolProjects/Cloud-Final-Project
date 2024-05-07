import React, { useState} from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const AdminDashboard: React.FC = () => {
  const [newStudent, setNewStudent] = useState({ id: '', Fname: '', Lname: '', Age: '', CGPA: '' });
  const [deleteStudentId, setDeleteStudentId] = useState('');
  const [modifyStudentId, setModifyStudentId] = useState('');
  const [modifyStudentData, setModifyStudentData] = useState({ Fname: '', Lname: '', Age: '', CGPA: '' });
  const [cookies] = useCookies(['token']);

  const handleAddStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent(prevStudent => ({ ...prevStudent, [name]: value }));
  };

  const handleModifyStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModifyStudentData(prevStudentData => ({ ...prevStudentData, [name]: value }));
  };

  const handleDeleteStudent = async () => {
    try {
      await axios.delete(`http://localhost:3000/admin/deleteStudent/${deleteStudentId}`, { headers: { Authorization: `Bearer ${cookies.token}` } });
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleAddStudent = async () => {
    try {
      await axios.post('http://localhost:3000/admin/addStudent', newStudent, { headers: { Authorization: `Bearer ${cookies.token}` } });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleModifyStudent = async () => {
    try {
      await axios.put(`http://localhost:3000/admin/modifyStudent/${modifyStudentId}`, modifyStudentData, { headers: { Authorization: `Bearer ${cookies.token}` } });
    } catch (error) {
      console.error('Error modifying student:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <div className="mb-4">
        <h3>Add Student</h3>
        <input type="text" name="id" placeholder="Student ID" value={newStudent.id} onChange={handleAddStudentChange} className="mr-2" />
        <input type="text" name="Fname" placeholder="First Name" value={newStudent.Fname} onChange={handleAddStudentChange} className="mr-2" />
        <input type="text" name="Lname" placeholder="Last Name" value={newStudent.Lname} onChange={handleAddStudentChange} className="mr-2" />
        <input type="text" name="Age" placeholder="Age" value={newStudent.Age} onChange={handleAddStudentChange} className="mr-2" />
        <input type="text" name="CGPA" placeholder="CGPA" value={newStudent.CGPA} onChange={handleAddStudentChange} className="mr-2" />
        <button onClick={handleAddStudent} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition-colors duration-300">Add Student</button>
      </div>
      <div className="mb-4">
        <h3>Delete Student</h3>
        <input type="text" placeholder="Student ID" value={deleteStudentId} onChange={(e) => setDeleteStudentId(e.target.value)} className="mr-2" />
        <button onClick={handleDeleteStudent} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 transition-colors duration-300">Delete Student</button>
      </div>
      <div>
        <h3>Modify Student</h3>
        <input type="text" placeholder="Student ID" value={modifyStudentId} onChange={(e) => setModifyStudentId(e.target.value)} className="mr-2" />
        <input type="text" name="Fname" placeholder="First Name" value={modifyStudentData.Fname} onChange={handleModifyStudentChange} className="mr-2" />
        <input type="text" name="Lname" placeholder="Last Name" value={modifyStudentData.Lname} onChange={handleModifyStudentChange} className="mr-2" />
        <input type="text" name="Age" placeholder="Age" value={modifyStudentData.Age} onChange={handleModifyStudentChange} className="mr-2" />
        <input type="text" name="CGPA" placeholder="CGPA" value={modifyStudentData.CGPA} onChange={handleModifyStudentChange} className="mr-2" />
        <button onClick={handleModifyStudent} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 transition-colors duration-300">Modify Student</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
