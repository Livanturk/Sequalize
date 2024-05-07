const { Sequelize, DataTypes, Op } = require("sequelize");
const bcrypt = require("bcrypt")
const sequelize = new Sequelize('postgres://postgres:Elifnaz1.@localhost:5432/sequelize');

// Define the User model using sequelize.define()
const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 6]
        },
        get() {
            const rawValue = this.getDataValue('username')
            return rawValue.toUpperCase()
        }
    },
    password: {
        type: DataTypes.STRING,
        set(value) {
            const salt = bcrypt.genSaltSync(12)
            const hash = bcrypt.hashSync(value, salt)
            this.setDataValue('password', hash)
        }
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 23
    },
    livan: {
        type: DataTypes.BOOLEAN,
        defautValue: true
    }
},
{   
    // Helps us to create table 
    //without pluralizing the table name
    freezeTableName: true
});

(async () => {
    try {
        // Test the connection to the database
        await sequelize.authenticate();
        // Sync Creates a table if it does not exist
        // Does nothing if it already exists
        await User.sync({ alter: true });
        console.log("User table has been synced");
        const user= await User.create({
            username: "Tarik",
            password: 'mafia123',
        });
        console.log(user.username, user.password)    
    } catch (error) {
        console.error("Error syncing User table:", error);
    }
})();