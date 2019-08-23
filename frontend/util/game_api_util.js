export const createGame = game => {
  return $.ajax({
    method: "POST",
    url: '/api/game',
    data: { game },
  })
};
