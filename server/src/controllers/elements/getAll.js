const { query, where } = require('firebase/firestore');

const { Elements } = require('../../db');
const { getDocsList } = require('../../utils');
const { ctrlWrapper } = require('../../decorators');

const getAll = ctrlWrapper(async (req, res) => {
  const owner = req.user.email;

  const q = query(Elements, where('owner', '==', owner));
  const elements = await getDocsList(q);

  res.status(200).json({ message: `Found ${elements.length} element(s)`, result: { elements } });
});

module.exports = getAll;
