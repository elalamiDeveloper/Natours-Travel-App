const checkBody = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price)
    return res.status(400).json({
      status: 'fail',
      message: `${!name ? 'name' : 'price'} not found!!`,
    });

  next();
};

export default checkBody;
