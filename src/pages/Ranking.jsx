import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking') ?? '[]');
    ranking.sort((a, b) => b.score - a.score);
    this.setState({ ranking });
  }

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>

        <div>
          {
            ranking.map((el, index) => (
              <div key={ index }>
                <img src={ el.picture } alt="GravatarImg" />
                <p data-testid={ `player-name-${index}` }>{ el.name }</p>
                <p data-testid={ `player-score-${index}` }>{ el.score }</p>
              </div>
            ))
          }
        </div>

        <button
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          início
        </button>
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
