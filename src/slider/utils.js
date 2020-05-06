export const isNotTouchEvent = event =>
  event.touches.length > 1 ||
  (event.type.toLowerCase() === "touchend" && event.touches.length > 0);

export function getClosestPoint(val, { stepValue, minValue, maxValue }) {
  const points = [];

  const maxSteps = Math.floor((maxValue - minValue) / stepValue);
  const steps = Math.min((val - minValue) / stepValue, maxSteps);
  const closestStep = Math.round(steps) * stepValue + minValue;
  points.push(closestStep);

  const diffs = points.map(point => Math.abs(val - point));
  return points[diffs.indexOf(Math.min(...diffs))];
}

export function getPrecision(stepValue) {
  const stepString = stepValue.toString();
  let precision = 0;
  if (stepString.indexOf(".") >= 0) {
    precision = stepString.length - stepString.indexOf(".") - 1;
  }
  return precision;
}

export function isValueOutOfRange(value, { minValue, maxValue }) {
  return value < minValue || value > maxValue;
}

export function ensureValuePrecision(val, props) {
  const { stepValue } = props;
  const closestPoint = isFinite(getClosestPoint(val, props))
    ? getClosestPoint(val, props)
    : 0;
  return parseFloat(closestPoint.toFixed(getPrecision(stepValue)));
}

export function ensureValueInRange(value, { maxValue, minValue }) {
  if (value <= minValue) {
    return minValue;
  }
  if (value >= maxValue) {
    return maxValue;
  }
  return value;
}

export const trimAlignValue = (value, props) => {
  const val = ensureValueInRange(value, props);
  return ensureValuePrecision(val, props);
};
