const pagination = (page = 1, limit = 10) => {

  const offset = (page - 1) * limit;

  return {
    page,
    limit,
    offset
  };

};

export default pagination;