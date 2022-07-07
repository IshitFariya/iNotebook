const mongoose=require('mongoose')
const mongoURI='mongodb://localhost:27017/iNotebookdb?directConnection=true&tls=false&readPreference=primary'
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}
module.exports = connectToMongo;