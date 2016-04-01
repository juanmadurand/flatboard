import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';

import Input from 'react-bootstrap/lib/Input';

import * as currencyActions from 'www/reducers/currency';

import { connect } from 'react-redux';
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


  renderCurrencies(currency) {
    const currenciesOpt = [];
    Object.keys(currency).forEach((key) => {
      currenciesOpt.push(<option value={key}>{currency[key]}</option>);
    });
    return currenciesOpt;
  }

  renderRow(currency) {
    return (
      <div className="form-inline">
        <Input type="text" addonBefore="$" placeholder="Amount" />
        <Input type="select" placeholder="select">
          {this.renderCurrencies(this.props.currencies)}
        </Input>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderRow()}
        {this.renderRow()}
      </div>
    );
  }
}
