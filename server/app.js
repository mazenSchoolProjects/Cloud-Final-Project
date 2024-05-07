// Import Express , Student model , admin model
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Student = require('./Student');
const cookieParser = require('cookie-parser');
const Admin = require('./Admin');

// Create an Express application
const app = express();
app.use(express.json()); // Add this line to parse JSON bodies
app.use(cors());
app.use(cookieParser()); // Use the cookie-parser middleware

const TOKEN_SECRET = 'admin';

const verifyTokenAndExtractAdminId = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        req.adminId = decoded.id;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

// Define a route to get students data
app.get('/students/get', async (req, res) => {
    try {
        // Fetch all students from the database
        const students = await Student.findAll();
        // Send the students data as a response
        res.json(students);
    } catch (error) {
        // Handle errors
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the admin with the provided username and password
        const admin = await Admin.findOne({ where: { username, password } });

        // If admin not found, return error
        if (!admin) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // If username and password are correct, generate JWT
        const token = jwt.sign({ id: admin.id }, TOKEN_SECRET);

        // Set the token as a cookie
        res.cookie('token', token, { httpOnly: true });

        // Send a success response
        res.status(200).json({ token: token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/admin/dashboard', verifyTokenAndExtractAdminId, async (req, res) => {
    try {
        // Fetch the admin details using the adminId from the decoded token
        const admin = await Admin.findByPk(req.adminId, {
            attributes: ['name', 'username']
        });

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        // Send admin details as response
        res.status(200).json(admin);
    } catch (error) {
        console.error('Error fetching admin details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/admin/addStudent', verifyTokenAndExtractAdminId, async (req, res) => {
    const { id, Fname, Lname, Age, CGPA } = req.body;

    try {
        // Create the student record in the database
        const student = await Student.create({ id, Fname, Lname, Age, CGPA });

        // Send the newly created student as response
        res.status(201).json(student);
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.delete('/admin/deleteStudent/:id', verifyTokenAndExtractAdminId, async (req, res) => {
    const studentId = req.params.id;

    try {
        // Find the student by ID
        const student = await Student.findByPk(studentId);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Delete the student
        await student.destroy();

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.put('/admin/modifyStudent/:id', verifyTokenAndExtractAdminId, async (req, res) => {
    const studentId = req.params.id;
    const { Fname, Lname, Age, CGPA } = req.body;

    try {
        // Find the student by ID
        const student = await Student.findByPk(studentId);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Update the student's information
        await student.update({ Fname, Lname, Age, CGPA });

        res.json({ message: 'Student modified successfully' });
    } catch (error) {
        console.error('Error modifying student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});






// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
