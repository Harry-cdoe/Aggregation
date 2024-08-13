const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://asatiharry964:nBDdpl1axkzT2qki@blog.fwd7fpt.mongodb.net/aggree?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const dbConnect = async () => {
    try {
        await client.connect();
        console.log("Database Connected");
    } catch (error) {
        console.error("Connection Failed", error);
        throw new Error('Database connection failed');
    }
};

module.exports = { dbConnect, client };
