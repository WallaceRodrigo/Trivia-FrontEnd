import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  state = {
    data: '',
  };

  componentDidMount() {
    this.triviaAPI();
  }

  triviaAPI = () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const error3 = 3;

    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.response_code === error3) {
          history.push('/');
          localStorage.removeItem('token');
        }
        this.setState({ data });
        console.log(data);
      });
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <Header />
        <div>
          <Questions data={ data } />
        </div>

      </div>
    );
  }
}

export default Game;
