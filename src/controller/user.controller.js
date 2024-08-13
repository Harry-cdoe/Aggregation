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

module.exports = { users, activeUser };
