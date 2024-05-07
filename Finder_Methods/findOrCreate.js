const { Sequelize, DataTypes, Op } = require("sequelize");
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
        }
    },
    password: {
        type: DataTypes.STRING
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
        const user= await User.findOrCreate({ 
            where: { username: "Berke" },
            defaults: { age:28 }
        });
        console.log(user)    
    } catch (error) {
        console.error("Error syncing User table:", error);
    }
})();