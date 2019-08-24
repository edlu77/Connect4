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
