import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';

import Input from 'react-bootstrap/lib/Input';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';


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
    const innerGlyphicon = <Glyphicon glyph="search" />;
    return (
      <div className="search-bar">
        <Input
          type="text"
          value={this.state.term}
          onChange={this.handleInputChange}
          placeholder="Search video"
          addonBefore={innerGlyphicon}
        />
      </div>
    );
  }
}

export default SearchBar;
