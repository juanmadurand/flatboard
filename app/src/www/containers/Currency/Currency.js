import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import truncate from 'lodash.truncate';

import Input from 'react-bootstrap/lib/Input';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Select from 'react-select';
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
    addField: PropTypes.func.isRequired,
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

  @autobind
  getCurrencies(currency, currentField) {
    const currenciesOpt = [];
    Object.keys(currency).forEach((key) => {
      if (this.props.fields.includes(key) && key !== currentField) {
        return;
      }
      const label = truncate(currency[key], {
        length: 24,
        separator: ' ',
      });
      currenciesOpt.push({
        value: key,
        label,
      });
    });
    return currenciesOpt;
  }

  @autobind
  handleCurrencyChange(field, newField) {
    const value = this.state[field].value;

    this.updateNominalValue(newField, value);

    this.props.changeField(this.props.fields.indexOf(field), newField);
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
  renderRow(field) {
    const inputChange = (e) => (
      this.handleValueChange(field, parseInt(e.target.value || 0, 10))
    );

    const currencyChange = (selected) => (
      this.handleCurrencyChange(field, selected.value)
    );

    const currencyOptions = this.getCurrencies(this.props.currencies, field);

    const setActiveField = () => {
      this.setState({activeField: field});
    };

    return (
      <Row key={field}>
        <Col md={4}>
          <Input
            type="text"
            addonBefore="$"
            placeholder="Amount"
            value={this.state[field].value || ''}
            onChange={inputChange}
            onFocus={setActiveField}
          />
        </Col>
        <Col md={8}>
          <Select
            clearable={false}
            value={field}
            options={currencyOptions}
            onChange={currencyChange}
            onFocus={setActiveField}
          />
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <div>
        {this.props.fields.map((field) => (
          this.renderRow(field)
        ))}
        <div className="clearfix">
          <Button onClick={this.props.addField} bsStyle="success" className="pull-right">
            <i className="fa fa-plus" /> Add Field
          </Button>
        </div>
      </div>
    );
  }
}
