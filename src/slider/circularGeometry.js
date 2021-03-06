export function angleToValue(params) {
  const { angle, minValue, maxValue, startAngle, endAngle } = params;
  if (endAngle <= startAngle) {
    throw new Error("endAngle must be greater than startAngle");
  }
  if (angle < startAngle) {
    return minValue;
  } else if (angle > endAngle) {
    return maxValue;
  } else {
    const ratio = (angle - startAngle) / (endAngle - startAngle);
    const value = ratio * (maxValue - minValue) + minValue;
    return value;
  }
}

export function valueToAngle(params) {
  const { value, minValue, maxValue, startAngle, endAngle } = params;
  if (endAngle <= startAngle) {
    throw new Error("endAngle must be greater than startAngle");
  }
  const ratio = (value - minValue) / (maxValue - minValue);
  const angle = ratio * (endAngle - startAngle) + startAngle;
  return angle;
}

function convertAngle(degree, from, to) {
  to = to || { direction: "ccw", axis: "+x" };
  if (from.direction !== to.direction) {
    degree = degree === 0 ? 0 : 360 - degree;
  }
  if (from.axis === to.axis) {
    return degree;
  }
  if (from.axis[1] === to.axis[1]) {
    return (180 + degree) % 360;
  }
  switch (to.direction + from.axis + to.axis) {
    case "ccw+x-y":
    case "ccw-x+y":
    case "ccw+y+x":
    case "ccw-y-x":
    case "cw+y-x":
    case "cw-y+x":
    case "cw-x-y":
    case "cw+x+y":
      return (90 + degree) % 360;
    case "ccw+y-x":
    case "ccw-y+x":
    case "ccw+x+y":
    case "ccw-x-y":
    case "cw+x-y":
    case "cw-x+y":
    case "cw+y+x":
    case "cw-y-x":
      return (270 + degree) % 360;
    default:
      throw new Error("Unhandled conversion");
  }
}

export function angleToPosition(angle, radius, svgSize) {
  const angleConverted = convertAngle(angle.degree, angle, {
    direction: "ccw",
    axis: "+x"
  });
  const angleInRad = (angleConverted / 180) * Math.PI;
  let dX;
  let dY;
  if (angleInRad <= Math.PI) {
    if (angleInRad <= Math.PI / 2) {
      dY = Math.sin(angleInRad) * radius;
      dX = Math.cos(angleInRad) * radius;
    } else {
      dY = Math.sin(Math.PI - angleInRad) * radius;
      dX = Math.cos(Math.PI - angleInRad) * radius * -1;
    }
  } else {
    if (angleInRad <= Math.PI * 1.5) {
      dY = Math.sin(angleInRad - Math.PI) * radius * -1;
      dX = Math.cos(angleInRad - Math.PI) * radius * -1;
    } else {
      dY = Math.sin(2 * Math.PI - angleInRad) * radius * -1;
      dX = Math.cos(2 * Math.PI - angleInRad) * radius;
    }
  }
  const x = dX + svgSize / 2;
  const y = svgSize / 2 - dY;
  return { x, y };
}

export function positionToAngle(position, svgSize, angleType) {
  const dX = position.x - svgSize / 2;
  const dY = svgSize / 2 - position.y;
  let theta = Math.atan2(dY, dX);
  if (theta < 0) {
    theta = theta + 2 * Math.PI;
  }
  const degree = (theta / Math.PI) * 180;
  return convertAngle(
    degree,
    {
      direction: "ccw",
      axis: "+x"
    },
    angleType
  );
}
