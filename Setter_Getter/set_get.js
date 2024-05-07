const { Sequelize, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize('postgres://postgres:Elifnaz1.@localhost:5432/sequelize');
const bcrypt = require("bcrypt")
const zlib = require('zlib')

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
            len: [4, 10]
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
    },
    description: {
        type: DataTypes.STRING,
        set(value) {
            const compressed = zlib.deflateSync(value).toString('base64')
            this.setDataValue('description', compressed)
        },
        get() {
            const value = this.getDataValue('description')
            const uncompress = zlib.inflateSync(Buffer.from(value, 'base64'))
            return uncompress.toString()
        }
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
            username: "Tuğra",
            password: "gkuvyybi",
            description: "this is abq 99314 and it could be really long"
        });
        console.log(user.username, user.password, user.description)    
    } catch (error) {
        console.error("Error syncing User table:", error);
    }
})();