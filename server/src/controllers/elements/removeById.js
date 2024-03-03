const { doc, getDoc, deleteDoc } = require('firebase/firestore');

const { Elements } = require('../../db');
const { HttpError } = require('../../utils');
const { ctrlWrapper } = require('../../decorators');

const removeById = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const elRef = doc(Elements, id);

  await deleteDoc(elRef);

  const elSnap = await getDoc(elRef);
  if (elSnap.exists()) {
    return HttpError(403, 'Failed to delete');
  }

  res.status(200).json({ message: 'Deleted', result: { id } });
});

module.exports = removeById;
