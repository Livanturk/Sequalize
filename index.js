const Sequelize = require("sequelize")
const sequelize = new Sequelize('postgres://postgres:Elifnaz1.@localhost:5432/sequelize')

(async () => {
    try {
        await sequelize.authenticate()
        console.log("connection successful")
    }catch (error){
        console.log("Error at connecting",error)
    }    
})()

console.log("Antoher TASK")
