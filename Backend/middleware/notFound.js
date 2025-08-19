const notFound = (req, res, next) => {
  const error = new Error('Não encontrado');
  error.status = 404;
  next(error);
};

export default notFound;
