const { addDoc } = require('firebase/firestore');

const { Elements } = require('../../db');
const { getDocByRef, getDate } = require('../../utils');
const { ctrlWrapper } = require('../../decorators');

const add = ctrlWrapper(async (req, res) => {
  const { email: owner } = req.user;

  const createdAt = getDate();

  const elRef = await addDoc(Elements, { ...req.body, owner, createdAt });
  const element = await getDocByRef(elRef);

  res.status(201).json({ message: 'Created', result: { element } });
});

module.exports = add;
