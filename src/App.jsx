import { useState } from 'react';

import './App.css';
import ImageEditor from './ImageEditor/ImageEditor';
import EditorHeader from './components/EditorHeader';
import SliderButtons from './components/SliderIconButtons';

function App() {
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState('transparent');
  const [strokeColor, setStrokeColor] = useState("transparent");
  const [shadowColor, setShadowColor] = useState("transparent");
  const [fontStyle, setFontStyle] = useState("bold");
  const [shadowOpacity, setShadowOpacity] = useState(0.5);
  const [shadowBlur, setShadowBlur] = useState(0);
  const [text, setText] = useState("Trees are* vital *to life on Earth...");

  return (
    <>
    <div style={{display:"flex", gap :"30px"}}>

      <div>
    <SliderButtons       text={text} setText={setText}/>
    </div>
    <div style={{display:"flex",flexDirection:"column", gap :"30px"}}>
      <EditorHeader 
        fontSize={fontSize} setFontSize={setFontSize} 
        fontColor={fontColor} setFontColor={setFontColor} 
        strokeColor={strokeColor} setStrokeColor={setStrokeColor}
        shadowColor={shadowColor} setShadowColor={setShadowColor}
        fontStyle={fontStyle} setFontStyle={setFontStyle}
        shadowOpacity={shadowOpacity} setShadowOpacity={setShadowOpacity}
        shadowBlur={shadowBlur} setShadowBlur={setShadowBlur}

        text={text} setText={setText}

      />
      <ImageEditor 
          text={text} setText={setText}
        fontSize={fontSize} setFontSize={setFontSize} 
        fontColor={fontColor} setFontColor={setFontColor} 
        strokeColor={strokeColor} setStrokeColor={setStrokeColor}
        shadowColor={shadowColor} setShadowColor={setShadowColor}
        fontStyle={fontStyle} setFontStyle={setFontStyle}
        shadowOpacity={shadowOpacity} setShadowOpacity={setShadowOpacity}
        shadowBlur={shadowBlur} setShadowBlur={setShadowBlur}
      />
      </div>
      </div>
    </>
  );
}

export default App;
