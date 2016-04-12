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
    nominal: state.currency.nominal,
    fields: state.currency.fields,
  }),
  dispatch => bindActionCreators(currencyActions, dispatch)
)

export default class Currency extends Component {
  static propTypes = {
    store: PropTypes.any,
    setNominalValue: PropTypes.func.isRequired,
    changeField: PropTypes.func.isRequired,
    currencies: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    nominal: PropTypes.number.isRequired,
    fields: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
    props.fields.forEach((field) => {
      this.state = {
        ...this.state,
        [field]: {
          value: 1,
        },
      };
    });
  }

  componentWillReceiveProps(nextProps) {
    const fields = nextProps.fields.filter((key) => (
      key !== this.state.activeField
    ));
    for (const field of fields) {
      const newValue = nextProps.nominal * this.props.values[`USD${field}`];
      this.setState({
        [field]: {
          value: newValue.toFixed(2),
        },
      });
    }
  }

  updateNominalValue(field, value) {
    // Transform value to USD
    let usdValue;
    if (field === 'USD') {
      usdValue = value;
    } else {
      usdValue = value / this.props.values[`USD${field}`];
    }

    this.props.setNominalValue(usdValue);
  }

  @autobind
  handleValueChange(field, value) {
    this.updateNominalValue(field, value);

    this.setState({
      [field]: {
        value,
      },
    });
  }

  @autobind
  handleCurrencyChange(field, newField) {
    const value = this.state[field].value;

    this.updateNominalValue(newField, value);

    this.props.changeField(this.props.fields.indexOf(field), newField);
  }

  renderCurrencies(currency) {
    const currenciesOpt = [];
    Object.keys(currency).forEach((key) => {
      currenciesOpt.push(<option value={key}>{key} - {currency[key]}</option>);
    });
    return currenciesOpt;
  }

  @autobind
  renderRow(field) {
    const inputChange = (e) => (
      this.handleValueChange(field, parseInt(e.target.value || 0, 10))
    );

    const currencyChange = (e) => (
      this.handleCurrencyChange(field, e.target.value)
    );

    const setActiveField = () => {
      this.setState({activeField: field});
    };

    return (
      <div className="form-inline" key={field}>
        <Input
          type="text"
          addonBefore="$"
          placeholder="Amount"
          value={this.state[field].value || ''}
          onChange={inputChange}
          onFocus={setActiveField}
        />
        <Input
          type="select"
          value={field}
          onChange={currencyChange}
          onFocus={setActiveField}
        >
          {this.renderCurrencies(this.props.currencies)}
        </Input>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.fields.map((field) => (
          this.renderRow(field)
        ))}
      </div>
    );
  }
}
