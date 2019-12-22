export const UPDATE_EXCHANGE_RATES = 'UPDATE_EXCHANGE_RATES'
export const FETCH_EXCHANGE_RATES_START = 'FETCH_EXCHANGE_RATES_START'
export const FETCH_EXCHANGE_RATES_SUCCESS = 'FETCH_EXCHANGE_RATES_SUCCESS'
export const FETCH_EXCHANGE_RATES_FAILURE = 'FETCH_EXCHANGE_RATES_FAILURE'
export const EXCHANGE = 'EXCHANGE'
export const SWITCH_SECTIONS = 'SWITCH_SECTIONS'
export const SET_INPUT_VALUE = 'SET_INPUT_VALUE'
export const SET_ACTIVE_SECTION = 'SET_ACTIVE_SECTION'
export const SELECT_CURRENCY = 'SELECT_CURRENCY'

export const TYPES = {
    TARGET: "target",
    SOURCE: "source"
}

export function updateExchangeRates(data) {
    return { type: UPDATE_EXCHANGE_RATES, data }
}

export function exchange() {
    return (dispatch, getState) => {
        const sourceCurrency = getState().currencies.source
        const targetCurrency = getState().currencies.target
        const targetExchangeRate = getState().exchange.rates[targetCurrency]
        const sourceValue = getState().values.source
        // const targetValue = getState().values.target
        const sourceBalance = getState().balance[sourceCurrency]
        const targetBalance = getState().balance[targetCurrency]
        if (sourceValue > sourceBalance) {
            return
        }
        const newSourceBalance = sourceBalance - sourceValue
        const newTargetBalance = targetBalance + (sourceValue * targetExchangeRate)
        dispatch({ type: EXCHANGE, payload: { [sourceCurrency]: newSourceBalance, [targetCurrency]: newTargetBalance } })
        dispatch(changeInputValue(0, TYPES.SOURCE))
    }
}

export function setInputValue(value, section) {
    return { type: SET_INPUT_VALUE, payload: { value, section } }
}

export function setActiveSection(section) {
    return { type: SET_ACTIVE_SECTION, payload: { section } }
}

export function selectCurrency(currency, section) {
    return { type: SELECT_CURRENCY, payload: { currency, section } }
}

export function changeInputValue(value, section) {
    return (dispatch, getState) => {
        dispatch(setActiveSection(section))
        const oppositeSection = section === TYPES.TARGET ? TYPES.SOURCE : TYPES.TARGET
        dispatch(setInputValue(value, section))
        const targetCurrency = getState().currencies.target
        const exchangeRate = getState().exchange.rates[targetCurrency]
        const newValue = section === TYPES.TARGET ? value / exchangeRate : value * exchangeRate
        dispatch(setInputValue(Number(newValue.toFixed(2)), oppositeSection))
    }
}

export function setEditableValue(section) {
    return (dispatch, getState) => {
        const sectionValue = getState().values[section]
        dispatch(changeInputValue(sectionValue, section))
    }
}


export function switchSections() {
    return (dispatch, getState) => {
        dispatch({ type: SWITCH_SECTIONS })
        dispatch(fetchExchangeRates(getState().currencies.source)).then((data) => {
            const activeSection = getState().activeSection
            const sectionValue = getState().values[activeSection]
            dispatch(changeInputValue(sectionValue, activeSection))
        })
    }
}

export function fetchExchangeRates(base) {
    return (dispatch, getState) => {
        if (isBaseSame(getState(), base) && isLoading(getState())) {
            return
        }
        dispatch({ type: FETCH_EXCHANGE_RATES_START, payload: { base } })
        return fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
            .then((response) => response.json())
            .then(({ rates }) => {
                if (!isBaseSame(getState(), base)) {
                    return
                }
                dispatch({ type: FETCH_EXCHANGE_RATES_SUCCESS, payload: { base, rates } })
            })
            .catch((error) => {
                if (!isBaseSame(getState(), base)) {
                    return
                }
                dispatch({ type: FETCH_EXCHANGE_RATES_FAILURE, payload: { base, error } })
            })
    }
}



export function isBaseSame(state, base) {
    return state.exchange.base === base
}

export function isLoading(state) {
    return state.exchange.isLoading
}