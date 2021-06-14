const router = require('express').Router();
const ctrl = require('../controllers');

router.get('/', ctrl.users.index);
router.get('/:username', ctrl.users.show);
router.post('/login', ctrl.users.login);
router.post('/', ctrl.users.create);
router.put('/:username', ctrl.users.update);
router.delete('/:username', ctrl.users.destroy);

module.exports = router;