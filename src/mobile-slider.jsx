import React from "react";
import CircularSlider from "./slider/index";

const Slider = () => {
  const [value, setValue] = React.useState(20);

  return (
    <div className="MobileSlider">
      <CircularSlider
        svgSize={240}
        value={value}
        onChange={setValue}
        startAngle={50}
        endAngle={310}
      />
    </div>
  );
};

export default Slider;
