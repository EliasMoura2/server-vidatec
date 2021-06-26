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
    order,
    titulo: parameters.titulo || ''
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
  const {page, limit, titulo } = paginationInfo;
  let results = {};
  if(titulo.length > 0){
    results.current = `${route}?page=${page}&pageSize=${limit}&titulo=${titulo}`;
  } else {
    results.current = `${route}?page=${page}&pageSize=${limit}`;
  }
  results.prev = getPreviousPage(page, limit, titulo,  route);
  results.next = getNextPage(page, limit, titulo, route, count);
  return results;
};

const getPreviousPage = (page, limit, titulo, route) => {
  if (page <= 1) {
    return null;
  }
  let prevPage = {}
  if(titulo.length > 0){
    prevPage = `${route}?page=${page - 1}&pageSize=${limit}&titulo=${titulo}`;
  } else {
    prevPage = `${route}?page=${page - 1}&pageSize=${limit}`;
  }
  return prevPage;
};

const getNextPage = (page, limit, titulo, route, count) => {
  let rest = count - page * limit;
  if (rest > 0) {
    let nextPage = {}
    if(titulo.length > 0){
      nextPage = `${route}?page=${page + 1}&pageSize=${limit}&titulo=${titulo}`;
    } else {
      nextPage = `${route}?page=${page + 1}&pageSize=${limit}`;
    }
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