const { Users } = require('../../db');

const { ctrlWrapper } = require('../../decorators');
const { getDocsList } = require('../../utils');

const getAll = ctrlWrapper(async (req, res) => {
  const usersList = await getDocsList(Users);

  const users = usersList
    .filter(el => el.verifiedEmail)
    .map(({ name, email, accessToken }) => {
      const online = accessToken ? 'online' : null;
      return { name, email, accessToken: online };
    });

  res.status(200).json({ message: `Found ${users.length} users(s)`, result: { users } });
});

module.exports = getAll;
