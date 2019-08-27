export const createGame = game => {
  return $.ajax({
    method: "POST",
    url: '/api/game',
    data: { game },
  })
};

export const fetchGame = game => {
  return $.ajax({
    method: "GET",
    url: '/api/game',
    data: { game }
  })
};

export const updateGame = game => {
  return $.ajax({
    method: "PATCH",
    url: '/api/game',
    data: { game }
  })
}

export const deleteGame = game => {
  return $.ajax({
    method: "DELETE",
    url: '/api/game',
    data: { game }
  })
}
