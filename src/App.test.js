import { updateExchangeRates, setEditableValue, changeInputValue, TYPES, setInputValue, switchAccounts, selectCurrency, switchSections } from './actions'
import { createStore, applyMiddleware } from 'redux'
import { app } from './reducers'
import ReduxThunk from 'redux-thunk';

const rates = {
  base: "EUR",
  rates: {
    "GBP": 1.2,
    "USD": 1.1,
    "EUR": 1
  }
}

test('renders learn react link', () => {
  const store = createStore(app, applyMiddleware(ReduxThunk))
  store.dispatch(updateExchangeRates(rates))
  expect(store.getState()).toMatchSnapshot()
  store.dispatch(setInputValue(20, TYPES.SOURCE))
  expect(store.getState()).toMatchSnapshot()
  store.dispatch(setInputValue(20, TYPES.TARGET))
  expect(store.getState()).toMatchSnapshot()
  store.dispatch(selectCurrency("USD", TYPES.TARGET))
  expect(store.getState()).toMatchSnapshot()
  store.dispatch(selectCurrency("EUR", TYPES.SOURCE))
  expect(store.getState()).toMatchSnapshot()
  store.dispatch(changeInputValue(100, TYPES.SOURCE))
  expect(store.getState()).toMatchSnapshot()
  store.dispatch(changeInputValue(200, TYPES.TARGET))
  expect(store.getState()).toMatchSnapshot()
  store.dispatch(setEditableValue(TYPES.SOURCE))
  expect(store.getState()).toMatchSnapshot()
  store.dispatch(setEditableValue(TYPES.TARGET))
  expect(store.getState()).toMatchSnapshot()


  store.dispatch(switchSections())
  expect(store.getState()).toMatchSnapshot()
  store.dispatch(switchSections())
  expect(store.getState()).toMatchSnapshot()
});
