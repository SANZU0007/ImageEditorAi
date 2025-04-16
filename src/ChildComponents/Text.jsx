import React, { useState } from "react";
import { Input } from "antd";

const { TextArea } = Input;

const Text = ({ text, setText }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div >
        <br/>  <br/>
        <TextArea
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{width: '250px', maxheight: '200px'}}
          autoFocus
      
        />
     
    </div>
  );
};



export default Text;
