import { angleToPosition } from "./circularGeometry";

export function arcShapedPath(opts) {
  const { startAngle, radius, direction, angleType, svgSize } = opts;
  let { endAngle } = opts;
  if (startAngle % 360 === endAngle % 360 && startAngle !== endAngle) {
    endAngle = endAngle - 0.001;
  }

  const largeArc = endAngle - startAngle >= 180;
  const arcStart = angleToPosition(
    { degree: startAngle, ...angleType },
    radius,
    svgSize
  );
  const arcEnd = angleToPosition(
    { degree: endAngle, ...angleType },
    radius,
    svgSize
  );
  return `
      M ${arcStart.x},${arcStart.y}
      A ${radius} ${radius} 0
        ${largeArc ? "1" : "0"}
        ${direction === "cw" ? "1" : "0"}
        ${arcEnd.x} ${arcEnd.y}
    `;
}
