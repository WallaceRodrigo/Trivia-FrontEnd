// https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}

export const triviaAPI = () => {
  // const token = localStorage.getItem('token');
  const error3 = 3;

  fetch(`https://opentdb.com/api.php?amount=5&token=${'3y7ry37y'}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.response_code === error3) {
        console.log('error');
      }
    })
    .catch((error) => console.log('Erro ao fazer requisição.', error.message));
};
