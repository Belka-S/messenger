const { doc, updateDoc } = require('firebase/firestore');

const { Elements } = require('../../db');
const { getDocByRef } = require('../../utils');
const { ctrlWrapper } = require('../../decorators');

const updateById = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const elRef = doc(Elements, id);

  await updateDoc(elRef, { ...req.body });
  const element = await getDocByRef(elRef);

  res.status(200).json({ message: 'Updated', result: { element } });
});

module.exports = updateById;
