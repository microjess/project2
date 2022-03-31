const { User } = require('../models');

const userData = [{
        name: 'Admin',
        email: 'admin@techblog.com',
        password: 'Password12345!',
        role_id: 1
    },
    {
        name: 'NewUser',
        email: 'newuser@website.com',
        password: 'Thisisthenewpass2',
        role_id: 2,
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;