const router = require('express').Router();

router.get(
  '/movies',
  (req, res) => {
    res.status(200).json({msg: 'Movies'});
  }
)

module.exports = router;