import React from 'react';
import { connect } from 'react-redux';
import { Button, Flex } from 'rebass';
import { changeInputValue, exchange, fetchExchangeRates, setEditableValue, switchSections } from './actions';
import { SeparatorBox } from './components/SeparatorBox';
import { SourceBox } from './components/SourceBox';
import { TargetBox } from './components/TargetBox';
import { checkIsValidNumber, cleanValue, formatValue } from './utils';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchExchangeRates(this.props.source)
    this.internal = setInterval(() => {
      this.props.fetchExchangeRates(this.props.source);
    }, 10000)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.source !== this.props.source) {
      this.props.fetchExchangeRates(this.props.source);
    }
  }

  componentWillUnmount() {
    clearInterval(this.internal)
  }

  render() {
    return <StatelessApp {...this.props} />
  }
}

function StatelessApp(props) {
  return (
    <Flex flexDirection="column">
      <SourceBox {...props} />
      <SeparatorBox {...props} />
      <TargetBox {...props} />
      <Button onClick={props.exchangeMoney}>exchange</Button>
    </Flex>



    // <div className="App vertical-block">
    //   <div className="horizontal-block">




    //     <div>


    //       <div>{props.from}</div>
    //       <div>Balance: {props.balance[props.from]}</div>
    //     </div>
    //     <div>
    //       <CurrencyInput value={props.values.from} onChange={(value) => props.setInputValue(value, "from")} />
    //     </div>
    //   </div>

    //   <div className="block-separator">
    //     <button onClick={() => props.switchAccounts(props.from, props.to)}>switch</button>  
    //     <span>Exchange rate: {props.exchange.rates[props.to]}</span>
    //   </div>

    //   <div className="horizontal-block">
    //     <div>
    //       <div>{props.to}</div>
    //       <div>Balance: {props.balance[props.to]}</div>
    //     </div>
    //     <div>
    //       <CurrencyInput value={props.values.to} onChange={(value) => props.setInputValue(value, "to")} />
    //     </div>
    //   </div>

    //   <div className="block">
    //     <button onClick={() => props.exchangeMoney(props.from, props.to, props.exchange.rates[props.to])}>exchange</button>
    //   </div>

    // </div>
  );
}

export const addCommas = (value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const removeCommas = (value) => value.replace(/,/g, '');

class CurrencyInput extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef(null);
  }

  componentDidMount() {
    console.log(this.inputRef.current)
    this.inputRef.current.focus();
    this.inputRef.current.setSelectionRange(0, 1)
  }

  onChange = (evt) => {
    const { selectionStart, value } = evt.target;
    console.log(selectionStart, value)
    const onlyValue = cleanValue(value)
    console.log(onlyValue, checkIsValidNumber(onlyValue))
    if (!checkIsValidNumber(onlyValue)) {
      evt.preventDefault()
      return
    }
    this.props.onChange(onlyValue)
  }

  render() {
    const value = formatValue(this.props.value)
    return <input type="text" className="currency-input" pattern="[0-9]+" value={value} onChange={this.onChange} ref={this.inputRef}></input>
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    source: state.currencies.source,
    exchangeRate: state.exchange.rates && state.exchange.rates[state.currencies.target]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchExchangeRates: (base) => {
      dispatch(fetchExchangeRates(base))
    },
    switch: () => {
      dispatch(switchSections())
    },
    exchangeMoney: () => {
      dispatch(exchange())
    },
    // switchAccounts: (from, to) => {
    //   dispatch(switchAccounts(from, to))
    // },
    setActiveSection: (section) => {
      dispatch(setEditableValue(section))
    },
    setInputValue: (value, section) => {
      dispatch(changeInputValue(value, section))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
