import React from "react";
import { Button, ColorPicker } from "antd";

const EditorHeader = ({ fontSize, setFontSize,
  fontColor, setFontColor,
  strokeColor, setStrokeColor,
  shadowColor, setShadowColor,
  fontStyle, setFontStyle,
  shadowOpacity, setShadowOpacity,
  shadowBlur, setShadowBlur }) => {
  return (
    <div style={{display:"flex", alignItems:'center', gap:'20px', marginBottom:"10px" }}>
      <ColorPicker
        defaultValue={fontColor}
        onChange={(color) => setFontColor(color.toHexString())}
      />

<ColorPicker
        defaultValue={strokeColor}
        onChange={(color) => setStrokeColor(color.toHexString())}
      />

<ColorPicker
        defaultValue={shadowColor}
        onChange={(color) => setShadowColor(color.toHexString())}
      />



      <div style={{ marginTop: "10px" }}>
        <Button onClick={() => setFontSize(fontSize + 2)}>Increase Size</Button>
        <Button
          onClick={() => setFontSize(Math.max(10, fontSize - 2))}
          style={{ marginLeft: "10px" }}
        >
          Decrease Size
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;
