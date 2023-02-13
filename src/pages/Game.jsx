import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  state = {
    data: '',
    timer: 30,
    isDisabled: true,
    intervalId: 0,
  };

  componentDidMount() {
    this.triviaAPI();
    this.handleTimer();
  }

  // Iniciando requisito 8
  handleTimer = () => {
    const MIN_INTERVAL = 1000;
    const MIN_TIMEOUT = 30000;
    const TIMER_BUTTON = 5000;

    const { intervalId } = this.state;

    if (intervalId !== 0) {
      clearInterval(intervalId);
      this.setState({ timer: 30 });
    }

    const interval = setInterval(() => {
      this.setState((initial) => ({
        timer: initial.timer - 1,
        intervalId: interval,
      }));
    }, MIN_INTERVAL);

    setTimeout(() => this
      .setState({
        isDisabled: false,
      }), TIMER_BUTTON);

    setTimeout(() => {
      clearInterval(interval);
      this.setState({
        isDisabled: true,
      });
    }, MIN_TIMEOUT);
  };

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
      });
  };

  render() {
    const { data, isDisabled, timer } = this.state;
    const { history } = this.props;
    return (
      <div>
        <Header />
        <div>
          <Questions
            data={ data }
            isDisabled={ isDisabled }
            timer={ timer }
            history={ history }
            handleTimer={ this.handleTimer }
          />
        </div>

      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
