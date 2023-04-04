const requestTime = (req, res, next) => {
  const time = new Date().toISOString().slice(0, 19).replace('T', ', ');
  req.time = time;
  next();
};

export default requestTime;
