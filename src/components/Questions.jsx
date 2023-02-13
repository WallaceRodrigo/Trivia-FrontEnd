import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { calcScore } from '../redux/actions';

class Questions extends Component {
  state = {
    array: [],
    ifValidation: true,
    results: [{
      category: '',
      question: '',
      isDisabled: false,
    }],
    loading: true,
    nextButton: false,
    arrayIndex: 0,
  };

  componentDidUpdate() {
    this.buttonQuestion();
  }

  buttonQuestion = () => {
    const number = 0.5;
    const { data: { results } } = this.props;
    const { arrayIndex } = this.state;
    const { correct_answer: correct, incorrect_answers: incorrect } = results[arrayIndex];

    let answers = [];

    answers = [correct, ...incorrect];

    const { ifValidation } = this.state;
    if (ifValidation) {
      this.setState({
        results,
        array: answers.sort(() => Math.random() - number),
        ifValidation: false,
        loading: false,
      });
    }
  };

  questionButton = ({ target }) => {
    const btnCorrect = document.querySelector('.correct');
    const btnsInorrect = document.querySelectorAll('.incorrect');

    btnCorrect.style.border = '3px solid rgb(6, 240, 15)';
    btnsInorrect.forEach((el) => {
      el.style.backgroundColor = 'red';
      el.style.border = '3px solid red';
    });

    if (target.className === 'correct') {
      this.calcScore();
    }

    this.setState({ nextButton: true });
  };

  calcScore = () => {
    const { results, arrayIndex } = this.state;
    const { difficulty } = results[arrayIndex];
    const { timer, dispatch } = this.props;

    let convertedDifficulty = 0;
    const three = 3;
    if (difficulty === 'easy') { convertedDifficulty = 1; }
    if (difficulty === 'medium') { convertedDifficulty = 2; }
    if (difficulty === 'hard') { convertedDifficulty = three; }

    const ten = 10;
    const score = ten + (timer * convertedDifficulty);
    dispatch(calcScore(score));
  };

  handleNextButton = () => {
    const { arrayIndex } = this.state;

    this.setState({
      arrayIndex: arrayIndex + 1,
      loading: true,
      ifValidation: true,
      nextButton: false,
    });

    this.buttonQuestion();

    const four = 4;
    if (arrayIndex >= four) {
      const { history } = this.props;
      history.push('/');
    }

    const { handleTimer } = this.props;
    handleTimer();
  };

  render() {
    const { isDisabled } = this.props;
    const { results, array, loading, nextButton, arrayIndex } = this.state;
    const correctAnswer = results[arrayIndex].correct_answer;
    return (
      <div>
        {
          loading ? (
            <h1>Loading...</h1>
          ) : (
            <div>
              <h1 data-testid="question-category">
                {results[arrayIndex].category}
              </h1>
              <h2 data-testid="question-text">
                {results[arrayIndex].question}
              </h2>
              <div data-testid="answer-options">
                {
                  array.map((el, index) => (
                    <button
                      key={ index }
                      disabled={ isDisabled }
                      data-testid={
                        el === correctAnswer ? 'correct-answer' : `wrong-answer-${index}`
                      }
                      onClick={ this.questionButton }
                      className={ el === correctAnswer ? 'correct' : 'incorrect' }
                    >
                      { el }
                    </button>
                  ))
                }
              </div>
            </div>
          )
        }
        {
          nextButton ? (
            <button
              data-testid="btn-next"
              onClick={ () => this.handleNextButton() }
            >
              Next
            </button>
          )
            : ''
        }
      </div>
    );
  }
}

Questions.propTypes = {
  data: PropTypes.shape({
    results: PropTypes.arrayOf({}),
  }),
}.isRequired;
export default connect(null)(Questions);
