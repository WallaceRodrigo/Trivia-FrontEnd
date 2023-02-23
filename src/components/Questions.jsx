/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IoIosTimer } from 'react-icons/io';
import { BsCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import { calcScore, saveCorrects } from '../redux/actions';
import './styles/questions.css';
import letterA from '../content/letterA.svg';
import letterB from '../content/letterB.svg';
import letterC from '../content/letterC.svg';
import letterD from '../content/letterD.svg';
import triviaLogo from '../content/triviaLogo.png';

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
    const btnsIncorrect = document.querySelectorAll('.incorrect');

    btnCorrect.style.border = '1px solid #2FC18C';
    btnCorrect.style.boxShadow = '0px 0px 20px #2FC18C';
    btnsIncorrect.forEach((el) => {
      el.style.border = '1px solid #B83B3B';
      el.style.boxShadow = '0px 0px 20px #B83B3B';
    });

    if (target.className === 'correct' || target.className === 'correctEl') {
      this.calcScore();
      const { dispatch } = this.props;
      dispatch(saveCorrects());
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
      history.push('/feedback');
    }

    const { handleTimer } = this.props;
    handleTimer();
  };

  render() {
    const { isDisabled, timer } = this.props;
    const { results, array, loading, nextButton, arrayIndex } = this.state;
    const correctAnswer = results[arrayIndex].correct_answer;
    const answers = [letterA, letterB, letterC, letterD];
    return (
      <div className="questionsDiv">
        {
          loading ? (
            <h1>Loading...</h1>
          ) : (
            <div className="questions">
              <img src={ triviaLogo } alt="triviaLogo" className="gameTriviaLogo" />
              <h1 data-testid="question-category">
                {results[arrayIndex].category}
              </h1>
              <h2 data-testid="question-text">
                {results[arrayIndex].question}
              </h2>
              <h3 style={ { color: 'red' } }>
                <IoIosTimer style={ { position: 'relative', top: '3px', right: '5px' } } />
                { `Tempo restante: ${timer}` }
              </h3>
            </div>
          )
        }
        {
          !loading ? (
            <div data-testid="answer-options" className="options">
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
                    {
                      nextButton ? (
                        el === correctAnswer
                          ? <BsCheckCircleFill style={ { fontSize: '46px', color: '#2FC18C', margin: '0px 10px' } } />
                          : <BsFillXCircleFill style={ { fontSize: '46px', color: '#EA5D5D', margin: '0px 10px' } } />
                      ) : <img src={ answers[index] } alt="letters" className={ el === correctAnswer ? 'correctEl' && 'letters' : 'incorrectEl' && 'letters' } />
                    }
                    <p className={ el === correctAnswer ? 'correctEl' : 'incorrectEl' }>{ el }</p>
                  </button>
                ))
              }
              {
                nextButton ? (
                  <button
                    data-testid="btn-next"
                    onClick={ () => this.handleNextButton() }
                    className="nextButton"
                  >
                    PROXIMA
                  </button>
                )
                  : ''
              }
            </div>
          ) : <div />
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
