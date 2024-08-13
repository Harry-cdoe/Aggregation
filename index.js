const express = require("express");
const { dbConnect } = require("./src/dbConnect/config");
const userRoutes = require("./src/routes/user.route");

const app = express();
app.use(express.json());

dbConnect();

app.use('/api', userRoutes);

app.listen(4000, () => {
    console.log("Server is running at port 4000");
});
