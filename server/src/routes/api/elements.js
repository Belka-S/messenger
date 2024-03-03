const express = require('express');

const ctrl = require('../../controllers');
const validate = require('../../validation');
const { authenticate } = require('../../middlewares');

const router = express.Router();

router.use(authenticate);

router.get('/', ctrl.elements.getAll);
router.get('/:id', ctrl.elements.getById);
router.post('/', validate.elements.addSchema, ctrl.elements.add);
router.patch('/:id', validate.elements.updateSchema, ctrl.elements.updateById);
router.delete('/:id', ctrl.elements.removeById);

module.exports = router;
