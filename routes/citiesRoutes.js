const router = require('express').Router();
const ctrl = require('../controllers');

router.get('/', ctrl.cities.index);
router.get('/:cityName', ctrl.cities.show);
router.post('/', ctrl.cities.create);
router.put('/:cityName', ctrl.cities.update);
router.delete('/:cityName', ctrl.cities.destroy);

module.exports = router;