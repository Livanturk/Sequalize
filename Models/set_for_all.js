const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize('postgres://postgres:Elifnaz1.@localhost:5432/sequelize', {
    //This sets freezeTableName method to all tables in the database
    define: {
        freezeTableName: true
    }
}
);

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
        await User.sync();
        console.log("User table has been synced");
    } catch (error) {
        console.error("Error syncing User table:", error);
    }
})();
