export const addCommas = (value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const removeCommas = (value) => value.replace(/,/g, '');

export const checkIsValidNumber = (input) => {
  if (Number(input) < 0 || isNaN(Number(input))) {
    return false;
  }

  return true;
};

/**
 * Remove commas and extra decimals from value
 */
export const cleanValue = (value) => {
  const withoutCommas = removeCommas(value);

  if (withoutCommas.includes('.')) {
    const [int, decimals] = withoutCommas.split('.');
    const includeDecimals = decimals.slice(0, 2) 

    return `${int}.${includeDecimals}`;
  }

  return withoutCommas;
};

/**
 * Format value with commas
 */
export const formatValue = (value) => {
  const [int, decimals] = value.split('.');
  const includeDecimals = value.includes('.') ? `.${decimals}` : '';
  return `${addCommas(int)}${includeDecimals}`;
};