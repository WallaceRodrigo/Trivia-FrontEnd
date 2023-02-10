import React, { Component } from 'react';

const arrayIndex = 0;
class Questions extends Component {
  state = {
    array: [],
  };

  componentDidMount() {
    this.buttonQuestion();
  }

  buttonQuestion = () => {
    const number = 0.5;
    const { data } = this.props;
    console.log(data);
    const { correct_answer, incorrect_answers } = results[arrayIndex];
    let answers = [];
    answers = [correct_answer, ...incorrect_answers];
    this.setState({
      array: answers.sort(() => Math.random() - number),
    });
  };

  /* const {
    correct_answer: correct, incorrect_answers: incorrect,
  } = questions[questionIndex];
  let answers = [];
  answers = [correct, ...incorrect];
  this.setState({
    array: answers.sort(() => Math.random() - number),
  }); */
  render() {
    const { data: { results } } = this.props;
    const { array } = this.state;
    console.log(array);
    return (
      <div>
        <h1 data-testid="question-category">
          {/*  {results[arrayIndex].category} */}
        </h1>
        <h2 data-testid="question-text">
          {/* {results[arrayIndex].question} */}
        </h2>
      </div>
    );
  }
}

export default Questions;
