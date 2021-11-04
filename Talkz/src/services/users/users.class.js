const { Service } = require('feathers-sequelize')
const crypto = require('crypto')

const gravatarUrl = 'https://s.gravatar.com/avatar';
// The size query. Our chat needs 60px images
const query = 's=60';
// Returns the Gravatar image for an email
const getGravatar = email => {
  // Gravatar uses MD5 hashes from an email address (all lowercase) to get the image
  const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  // Return the full avatar URL
  return `${gravatarUrl}/${hash}?${query}`;
};

exports.Users = class Users extends Service {
    create (data, params) {
        const { email, password, githubId, googleId, name} = data;
        const avatar = data.avatar || getGravatar(email);
        const userData = {
            email,
            name,
            password,
            githubId,
            googleId,
            avatar
        };

        return super.create(userData, params);
    }
}
