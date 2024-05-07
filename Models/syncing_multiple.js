const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize('postgres://postgres:Elifnaz1.@localhost:5432/sequelize');

//Synchronize Multiple tables at once
sequelize.sync({ alter: true })

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
    },
    livan: {
        type: DataTypes.BOOLEAN,
        defautValue: true
    }
});

(async () => {
    try {
        //Test the connection to the database
        await sequelize.authenticate();
        //Checls the current state of the database,
        //Performs necessary changes in the table,
        //To make it match the model.
        await User.sync({ alter: true });
        console.log("User table has been synced");
    } catch (error) {
        console.error("Error syncing User table:", error);
    }
})();