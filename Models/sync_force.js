const { Sequelize, DataTypes } = require("sequelize");
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
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 23
    }
});

(async () => {
    try {
        //Test the connection to the database
        await sequelize.authenticate();
        //Sync Creates 
        //Drop it first if it already exists
        await User.sync({ force: true });
        console.log("User table has been synced");
    } catch (error) {
        console.error("Error syncing User table:", error);
    }
})();