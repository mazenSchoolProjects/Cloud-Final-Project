const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('college', 'root', 'root', {
    dialect: 'mysql',
    host: 'db',
});

/* 

* Student model
* 
*  id: integer
*  Fname: string
*  Lname: string
*  Age: integer
*  CGPA: decimal
 

*/

const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Fname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Lname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: {
                args: [0],
                msg: 'Age must be a positive number'
            }
        }
    },
    CGPA: {
        type: DataTypes.DECIMAL(3, 1),
        allowNull: false,
        validate: {
            min: {
                args: [0],
                msg: 'CGPA must be between 0 and 4.0'
            },
            max: {
                args: [4.0],
                msg: 'CGPA must be between 0 and 4.0'
            }
        }
    }
}, {
    tableName: 'Student',
    timestamps: false,
    validate: {
        checkCGPAAndAge() {
            if (this.Age !== null && (this.Age < 0 || this.Age > 150)) {
                throw new Error('Age must be between 0 and 150');
            }
        }
    }
});

module.exports = Student;
