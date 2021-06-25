const getPaginationInfo = parameters => {
  let order = parameters.order|| 'DESC';
  switch (order.toUpperCase()) {
    case 'DESC':
      order = 1;
      break;
    case 'ASC':
      order = -1;
      break;
    default:
      order = 1;
      break;
  }

  const paginationInfo = {
    page: parseInt(parameters.page) || 1,
    limit: parseInt(parameters.pageSize) || 10,
    order
  };
  return paginationInfo;
};

const getPaginationParams = (paginationInfo) => {
  let { limit, page } = paginationInfo;
  return (paginationInfo)
            ? {
                skip: getOffSet(page, limit),
              }
            : {
              skip: '',
            };
};

const getOffSet = (page, limit) => {
  const offset = page * limit - limit;
  return offset;
};

const getPaginationResult = (paginationInfo, route, count) => {
  const {page, limit, order} = paginationInfo;
  let results = {};
  results.current = `${route}?page=${page}&pageSize=${limit}&order=${order}`;
  results.prev = getPreviousPage(page, limit, order, route);
  results.next = getNextPage(page, limit, order, route, count);
  return results;
};

const getPreviousPage = (page, limit, order, route) => {
  if (page <= 1) {
    return null;
  }
  return `${route}?page=${page - 1}&pageSize=${limit}&order=${order}`;
};

const getNextPage = (page, limit, order, route, count) => {
  let rest = count - page * limit;
  if (rest > 0) {
    let nextPage = `${route}?page=${page + 1}&pageSize=${limit}&order=${order}`;
    return nextPage;
  } else {
    return null;
  }
};

module.exports = {
  getPaginationInfo,
  getPaginationParams,
  getPaginationResult,
};