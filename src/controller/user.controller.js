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

// which country has the highest number of registered users
const highestUserByCountry = async (req, res) => {
    try {
        const highestUserByCountryResult = await usersCollection.aggregate([
            {
                $group: {
                    _id: "$company.location.country",
                    userCount: {
                        $sum: 1
                    },
                },
            },
            {
                $sort: {
                    userCount: -1
                },
            },
            {
                $limit: 3
            }
        ]).toArray();

        res.status(200).json(highestUserByCountryResult);
    } catch (err) {
        console.error('Error fetching reistered users: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Unique EyeColor
const uniqueEyeColor = async (req, res) => {
    try {
        const uniqueEyeColorResult = await usersCollection.aggregate([
            {
                $group: {
                    _id: "$eyeColor",
                    eyeColorCount: {
                        $sum: 1
                    },
                },
            },
            {
                $sort: {
                    eyeColorCount: 1
                },
            }
        ]).toArray();

        res.status(200).json(uniqueEyeColorResult);
    } catch (err) {
        console.error('Error fetching eyecolor: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Average number of tags per user
const averageTagsPerUser = async (req, res) => {
    try {
        // 1st way
        // const averageTagsPerUserResult = await usersCollection.aggregate([
        //     {
        //         $unwind: "$tags"
        //     },
        //     {
        //         $group: {
        //             _id: "$_id",
        //             numberOfTags: { $sum: 1 }
        //         }
        //     },
        //     {
        //         $group: {
        //             _id: null,
        //             averageNumberOfTags: { $avg: "$numberOfTags" }
        //         }
        //     }
        // ]).toArray();

        // 2nd Way
        const averageTagsPerUserResult = await usersCollection.aggregate([
            {
                $addFields: {
                    numberOfTags: {
                        $size: { $ifNull: ["$tags", []] }
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    averageNumberOfTags: { $avg: "$numberOfTags" }
                }
            }
        ]).toArray();

        res.status(200).json(averageTagsPerUserResult)

    } catch (err) {
        console.error('Error fetching Data: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// How many users have 'enim' as one of their tags
const evimTags = async (req, res) => {
    try {
        const evimTagsResult = await usersCollection.aggregate([
            { $match: { tags: "enim" }, },
            { $count: "userWithEnimTag" }
        ]).toArray();

        res.status(200).json(evimTagsResult);
    } catch (err) {
        console.error('Data fethcing errors: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// what are the names and age of users who are incative and have 'velit' as a tag?
const incativeUsers = async (req, res) => {
    try {
        const incativeUsersResult = await usersCollection.aggregate([
            { $match: { isActive: false, tags: 'velit' } },
            { $project: { name: 1, age: 1 } }
        ]).toArray();

        res.status(200).json(incativeUsersResult);
    } catch (err) {
        console.error('Data fethcing error: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// How many users have a phone number starting with '+1 (940)'
const specialPhoneNumber = async (req, res) => {
    try {
        const specialPhoneNumberResult = await usersCollection.aggregate([
            { $match: { "company.phone": /^\+1 \(940\)/ } }, // Regex to match phone numbers starting with +1 (940)
            { $count: 'userWithSpecialPhoneNumber' } // Count the number of matching documents
        ]).toArray(); // Convert cursor to array

        res.status(200).json(specialPhoneNumberResult);
    } catch (err) {
        console.error("Data fethcing error: ", err);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = { users, activeUser, averageAgeUsers, favoriteFruits, totalMaleFemale, highestUserByCountry, uniqueEyeColor, averageTagsPerUser, evimTags, incativeUsers, specialPhoneNumber };
