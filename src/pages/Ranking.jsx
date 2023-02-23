/* eslint-disable max-len */
import React, { Component } from 'react';
import { AiTwotoneStar } from 'react-icons/ai';
import PropTypes from 'prop-types';
import './styles/Ranking.css';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    ranking.sort((a, b) => b.score - a.score);
    this.setState({ ranking });
  }

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <div className="rankingContainer">
        <div className="rankingDiv">
          <h1 data-testid="ranking-title">Ranking</h1>

          <ul>
            {
              ranking.map((el, index) => (
                <li key={ index }>
                  <img src={ el.picture } alt="GravatarImg" />
                  <p data-testid={ `player-name-${index}` }>{ el.name }</p>
                  <p data-testid={ `player-score-${index}` } className="feedbackPlayerScore">
                    <AiTwotoneStar
                      style={
                        { color: '#F9BA18', position: 'relative', top: '-2px', margin: '0px 5px', fontSize: '30px' }
                      }
                    />
                    {`${el.score} pontos` }
                  </p>
                </li>
              ))
            }
          </ul>

          <button
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            JOGAR NOVAMENTE
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
