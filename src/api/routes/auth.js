const auth = router => {
  /* EXAMPLE ROUTE FOR AUTH */
  router.get('/login', (req, res, next) => {
    return res.json({ msg: 'login' }).status(200);
  });
};

module.exports = auth;
