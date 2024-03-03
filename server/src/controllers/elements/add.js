const { addDoc } = require('firebase/firestore');

const { Elements } = require('../../db');
const { getDocByRef } = require('../../utils');
const { ctrlWrapper } = require('../../decorators');

const add = ctrlWrapper(async (req, res) => {
  const { email: owner } = req.user;

  const createdAt = new Date().toLocaleDateString('en-CA', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });

  const elRef = await addDoc(Elements, { ...req.body, owner, createdAt });
  const element = await getDocByRef(elRef);

  res.status(201).json({ message: 'Created', result: { element } });
});

module.exports = add;
