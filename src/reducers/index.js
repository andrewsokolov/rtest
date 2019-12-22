import { FETCH_EXCHANGE_RATES_START, FETCH_EXCHANGE_RATES_SUCCESS, FETCH_EXCHANGE_RATES_FAILURE, SET_ACTIVE_SECTION, EXCHANGE, SWITCH_SECTIONS, SET_INPUT_VALUE, SELECT_CURRENCY, TYPES } from "../actions"
import { combineReducers } from 'redux'


const defaultBalance = {
  "GBP": 100,
  "USD": 0,
  "EUR": 0
}

function activeSection(state = TYPES.SOURCE, action) {
  switch (action.type) {
    case SET_ACTIVE_SECTION:
      return action.payload.section
    default:
      return state
  }
}

function balance(state = defaultBalance, action) {
  switch (action.type) {
    case EXCHANGE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

function exchange(state = { rates: null, base: null, error: null, isLoading: false }, action) {
  switch (action.type) {
    case FETCH_EXCHANGE_RATES_START:
      return {
        ...state,
        base: action.payload.base,
        error: null,
        isLoading: true
      }
    case FETCH_EXCHANGE_RATES_SUCCESS:
      return {
        base: action.payload.base,
        rates: action.payload.rates,
        isLoading: false
      }
    case FETCH_EXCHANGE_RATES_FAILURE:
      return {
        ...state,
        base: action.payload.base,
        error: action.payload.error,
        isLoading: false
      }
    default:
      return state
  }
}

function values(state = { target: 0, source: 0 }, action) {
  switch (action.type) {
    case SWITCH_SECTIONS:
      return {
        [TYPES.SOURCE]: state.target,
        [TYPES.TARGET]: state.source
      }
    case SET_INPUT_VALUE:
      return {
        ...state,
        [action.payload.section]: action.payload.value
      }
    default:
      return state
  }
}

function currencies(state = { target: "GBP", source: "EUR" }, action) {
  switch (action.type) {
    case SWITCH_SECTIONS:
      const newSource = state.target
      return {
        source: newSource,
        target: state.source
      }
    case SELECT_CURRENCY:
      return {
        ...state,
        [action.payload.section]: action.payload.currency
      }
    default:
      return state
  }
}

const app = combineReducers({
  balance,
  exchange,
  values,
  currencies,
  activeSection
})

export { app }