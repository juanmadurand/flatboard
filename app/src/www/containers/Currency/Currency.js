import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import Input from 'react-bootstrap/lib/Input';
import * as currencyActions from 'www/reducers/currency';

@connect(
  state => ({
    currencies: state.currency.currencies,
    values: state.currency.values,
  }),
  dispatch => bindActionCreators(currencyActions, dispatch)
)

export default class Currency extends Component {
  static propTypes = {
    store: PropTypes.any,
    currencies: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
  };

  @autobind
  handleInputChange() {
    console.log(this);
  }

  renderCurrencies(currency) {
    const currenciesOpt = [];
    Object.keys(currency).forEach((key) => {
      currenciesOpt.push(<option value={key}>{currency[key]}</option>);
    });
    return currenciesOpt;
  }

  renderRow(idx) {
    return (
      <div className="form-inline">
        <Input type="text"
          addonBefore="$"
          placeholder="Amount"
          onChange={this.handleInputChange}
          ref={`currency_${idx}`}
        />
        <Input type="select" placeholder="select">
          {this.renderCurrencies(this.props.currencies)}
        </Input>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderRow(1)}
        {this.renderRow(2)}
      </div>
    );
  }
}
