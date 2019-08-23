export const createPlayer = player => {
  return $.ajax({
    method: "POST",
    url: '/api/players',
    data: { player },
  })
};
