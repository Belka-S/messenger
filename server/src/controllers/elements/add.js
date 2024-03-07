const { doc, setDoc } = require('firebase/firestore');

const { Elements } = require('../../db');
const { getDocByRef, HttpError } = require('../../utils');
const { ctrlWrapper } = require('../../decorators');

const add = ctrlWrapper(async (req, res) => {
  const { email } = req.user;
  const { id, owner } = req.body;
  if (owner !== email) throw HttpError(403);

  const elRef = doc(Elements, id);
  await setDoc(elRef, { ...req.body });
  const element = await getDocByRef(elRef);

  res.status(201).json({ message: 'Created', result: { element } });
});

module.exports = add;
