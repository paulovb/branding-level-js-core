module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
      unique: true
    },
    description: {
      type: 'text'
    },
    slug: {
      type: 'string'
    },

    mentions: {
      collection: 'mention',
      via: 'brand'
    },

    beforeCreate: function (values, cb) {
      values.slug = slug(values.name).toLowerCase();
      cb();
    }

  }
};

