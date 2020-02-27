export const masterCardDiscount = (value, amount) => {
  if (value.match("^5[1-5]") !== null) {
    return amount * 0.9;
  } else {
    return amount;
  }
};

export const cardNumberFormatter = value => {
  return value
    .replace(/\s?/g, "")
    .replace(/[^\d|^/]*/g, "")
    .replace(/(\d{4})/g, "$1 ")
    .trim()
    .slice(0, 19);
};

export const cardExpiryFormatter = value => {
  return value
    .replace(/^([1-9]\/|[2-9])$/g, "0$1/")
    .replace(/^(0[1-9]|1[0-2])$/g, "$1/")
    .replace(/^1([3-9])$/g, "01/$1")
    .replace(/^0\/|0+$/g, "0")
    .replace(/[^\d|^/]*/g, "")
    .replace(/\/\//g, "/")
    .slice(0, 5);
};

export const cardCvvFormatter = value => {
  return value
  .replace(/[^\d|^/]*/g, "")
  .slice(0, 4);
}

export const cardExpiryMonthandYearSplit = value => {
  return value.split('/')
}

export const reference = async data => {
  return await data.reference;
}

