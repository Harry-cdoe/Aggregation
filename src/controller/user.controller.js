const { client } = require('../dbConnect/config');

const getUser = async (req, res) => {
    try {
        const database = client.db('aggree');
        const usersCollection = database.collection('users');
        
        // Fetch all users
        // const users = await usersCollection.find().toArray();
        // console.log('Fetched users:', users);

        // Count active users
        const activeUserCountResult = await usersCollection.aggregate([
            { $match: { isActive: true } },
            { $count: "activeUsers" }
        ]).toArray();

        console.log('Active user count result:', activeUserCountResult);

        // Extract active user count or default to 0
        const activeUserCount = activeUserCountResult.length > 0 ? activeUserCountResult[0].activeUsers : 0;

        // Prepare response data
        const responseData = {
            // users,
            activeUserCount,
            // totalUsers: users.length
        };

        // if (users.length === 0) {
        //     console.log('No users found');
        // }

        res.status(200).json(responseData);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { getUser };
