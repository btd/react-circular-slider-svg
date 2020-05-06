import * as React from "react";
import {
  angleToPosition,
  positionToAngle,
  valueToAngle,
  angleToValue
} from "./circularGeometry";
import { arcShapedPath } from "./svgPaths";

export const CircularSlider = ({
  svgSize,
  maxValue,
  minValue,
  angleType,
  startAngle,
  endAngle,
  value,
  onChange,
  disabled,
  coerceToInt
}) => {
  const svgRef = React.useRef();
  const onMouseEnter = ev => {
    // TODO
    if (ev.buttons === 1) {
      onMouseDown(ev);
    }
  };
  const onMouseDown = ev => {
    const svg = svgRef.current;
    if (svg) {
      svg.addEventListener("mousemove", processSelection);
      svg.addEventListener("mouseleave", removeMouseListeners);
      svg.addEventListener("mouseup", removeMouseListeners);
    }
    processSelection(ev);
  };
  const removeMouseListeners = () => {
    const svg = svgRef.current;
    if (svg) {
      svg.removeEventListener("mousemove", processSelection);
      svg.removeEventListener("mouseleave", removeMouseListeners);
      svg.removeEventListener("mouseup", removeMouseListeners);
    }
  };
  const processSelection = ev => {
    const svg = svgRef.current;
    if (!svg) {
      return;
    }
    const svgPoint = svg.createSVGPoint();
    const x = ev.clientX;
    const y = ev.clientY;
    svgPoint.x = x;
    svgPoint.y = y;
    const coordsInSvg = svgPoint.matrixTransform(svg.getScreenCTM().inverse());
    const angle = positionToAngle(coordsInSvg, svgSize, angleType);
    let value = angleToValue({
      angle,
      minValue,
      maxValue,
      startAngle,
      endAngle
    });
    if (coerceToInt) {
      value = Math.round(value);
    }
    if (!disabled) {
      onChange(value);
    }
  };

  const trackRadius = svgSize / 2 - 20;
  const handleAngle = valueToAngle({
    value,
    minValue,
    maxValue,
    startAngle,
    endAngle
  });

  const handlePosition = angleToPosition(
    { degree: handleAngle, ...angleType },
    trackRadius,
    svgSize
  );

  return (
    <svg
      width={svgSize}
      height={svgSize}
      ref={svgRef}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onClick={ev => !disabled && ev.stopPropagation()}
      className="CircularSlider"
    >
      <path
        d={arcShapedPath({
          startAngle: handleAngle,
          endAngle,
          angleType,
          radius: trackRadius,
          svgSize: svgSize,
          direction: angleType.direction
        })}
        className="CircularSlider-track"
      />

      <path
        d={arcShapedPath({
          startAngle,
          endAngle: handleAngle,
          angleType,
          radius: trackRadius,
          svgSize: svgSize,
          direction: angleType.direction
        })}
        className="CircularSlider-fill"
      />

      <filter id="handleShadow" x="-50%" y="-50%" width="16" height="16">
        <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
        <feColorMatrix
          result="matrixOut"
          in="offOut"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="5" />
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
      </filter>
      <circle
        cx={handlePosition.x}
        cy={handlePosition.y}
        filter="url(#handleShadow)"
        className="CircularSlider-handle"
      />
    </svg>
  );
};

CircularSlider.defaultProps = {
  svgSize: 200,
  minValue: 0,
  maxValue: 100,
  startAngle: 0,
  endAngle: 360,
  angleType: {
    direction: "cw",
    axis: "-y"
  }
};
export default CircularSlider;
