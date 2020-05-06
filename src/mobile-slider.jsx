import React from "react";
import CircularSlider from "./slider/index";
import formatCurrency from "./format/currency";

const Slider = () => {
  const [value, setValue] = React.useState(0);
  const minValue = 0;
  const maxValue = 3500;

  return (
    <div className="MobileSlider">
      <div className="MobileSlider-value">
        {formatCurrency(value)}
        <div className="MobileSlider-valueNote">monatlich</div>
      </div>
      <div className="MobileSlider-minValueLabel">
        {formatCurrency(minValue)}
      </div>
      <div className="MobileSlider-maxValueLabel">
        {formatCurrency(maxValue)}
      </div>
      <CircularSlider
        svgSize={220}
        handleRadius={11}
        value={value}
        onChange={setValue}
        startAngle={50}
        endAngle={310}
        minValue={minValue}
        maxValue={maxValue}
        stepValue={70}
      />
    </div>
  );
};

export default Slider;
