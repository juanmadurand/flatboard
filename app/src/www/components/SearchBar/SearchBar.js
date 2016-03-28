import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';

class SearchBar extends Component {
  static propTypes = {
    onSearchTermChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  @autobind
  handleInputChange(event) {
    const term = event.target.value;
    this.setState({term});
    this.props.onSearchTermChange(term);
  }

  render() {
    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default SearchBar;
