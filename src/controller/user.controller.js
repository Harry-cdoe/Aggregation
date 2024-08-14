const { client } = require('../dbConnect/config');
const database = client.db('aggree');
const usersCollection = database.collection('users');

const users = async (req, res) => {
    try {
        // Fetch all users
        const users = await usersCollection.find().toArray();
        console.log('Fetched users:', users);

        // Prepare response data
        const responseData = {
            users,
            totalUsers: users.length
        };

        if (users.length === 0) {
            console.log('No users found');
        }

        res.status(200).json(responseData);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const activeUser = async (req, res) => {
    try {
        const activeUserResult = await usersCollection.aggregate([
            {
                $match: {
                    isActive: true
                },
            },
            {
                $count: "activeUsers"
            }
        ]).toArray();

        // Return the result as JSON
        res.status(200).json(activeUserResult);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const averageAgeUsers = async (req, res) => {
    try {
        const averageAgeUsersResult = await usersCollection.aggregate([
            {
                $group: {
                    _id: null,
                    averageAge: { $avg: "$age" }
                },
            }
        ]).toArray();

        res.status(200).json(averageAgeUsersResult);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// List the top 5 most common favorite fruits among the users in descending order
const favoriteFruits = async (req, res) => {
    try {
        const favoriteFruitsResult = await usersCollection.aggregate([
            {
                $group: {
                    _id: "$favoriteFruit",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            {
                $limit: 2
            }
        ]).toArray();

        res.status(200).json(favoriteFruitsResult);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Total number of males and females
const totalMaleFemale = async (req, res) => {
    try {
        const totalMaleFemaleResult = await usersCollection.aggregate([
            {
                $group: {
                    _id: "$gender",
                    count: {
                        $sum: 1
                    },
                },
            },
            {
                $sort: {
                    count: -1
                }
            },
        ]).toArray();

        res.status(200).json(totalMaleFemaleResult);
    } catch (err) {
        console.error('Error fetching genders: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { users, activeUser, averageAgeUsers, favoriteFruits, totalMaleFemale };
