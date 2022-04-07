const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'cotton',
  },
  {
    tag_name: 'terrycloth',
  },
  {
    tag_name: 'recycled',
  },
  {
    tag_name: 'sustainable',
  },
  {
    tag_name: 'vegan',
  },
  {
    tag_name: 'black',
  },
  {
    tag_name: 'green',
  },
  {
    tag_name: 'straw',
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;