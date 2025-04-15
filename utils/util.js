export function deepCopy(source) {
  if (source === null || typeof source !== 'object') {
    return source;
  }
  
  if (source instanceof Date) return new Date(source);
  if (source instanceof RegExp) return new RegExp(source);
  
  const target = new source.constructor();
  
  Object.getOwnPropertyNames(source).forEach(prop => {
    target[prop] = deepCopy(source[prop]);
  });
  
  return target;
}

export function convertCurrency(amount, exchangeRate, decimalPlaces = 5) {
  // 输入验证
  if (isNaN(Number(amount)) || isNaN(Number(exchangeRate))) {
    throw new Error('金额和汇率必须是有效数字');
  }

  // 处理字符串输入并转换为数字
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : Number(amount);
  const numericExchangeRate = Number(exchangeRate);

  // 解决浮点数精度问题（如 0.1 + 0.2）
  const precisionMultiplier = Math.pow(10, decimalPlaces);
  const convertedAmount = Math.round(
    numericAmount * numericExchangeRate * precisionMultiplier
  ) / precisionMultiplier;

  return convertedAmount;
}


export function convertCurrenc(amount, rate, reverse = false, decimalPlaces = 5) {
  // 输入验证
  const numericAmount = parseFloat(amount);
  const numericRate = parseFloat(rate);
  
  // if (isNaN(numericAmount) throw new Error('请输入有效金额');
  // if (isNaN(numericRate) || numericRate <= 0) throw new Error('汇率必须为正数');

  // 核心计算（处理浮点数精度）
  const multiplier = Math.pow(10, decimalPlaces);
  const converted = reverse 
    ? Math.round((numericAmount / numericRate) * multiplier) / multiplier
    : Math.round((numericAmount * numericRate) * multiplier) / multiplier;

  // 格式化输出（补零）
  return converted.toFixed(decimalPlaces);
}