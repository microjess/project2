const { Role } = require('../models');

const roleData = [{
        name: 'Admin'
    },
    {
        name: 'User'
    },
];

const seedRoles = () => Role.bulkCreate(roleData);

module.exports = seedRoles;