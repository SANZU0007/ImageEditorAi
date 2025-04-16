import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { 
  UploadOutlined, 
  AppstoreOutlined, 
  ProjectOutlined, 
  EditOutlined, 
  SaveOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  FileTextOutlined,
  PictureOutlined 
} from '@ant-design/icons';

// Import your components
import Text from "../ChildComponents/Text";  
import Image from '../ChildComponents/Image';

// Component Mapping
const componentMapping = {
  Text: Text,
  Image :Image

};

const icons = [
  { name: 'Apps', icon: <AppstoreOutlined /> },
  { name: 'Text', icon: <FileTextOutlined /> },
  { name: 'Image', icon: <PictureOutlined /> },
  { name: 'Projects', icon: <ProjectOutlined /> },
  { name: 'Edit', icon: <EditOutlined /> },
  { name: 'Save', icon: <SaveOutlined /> },
  { name: 'Delete', icon: <DeleteOutlined /> },
  { name: 'Preview', icon: <EyeOutlined /> },

  { name: 'Upload', icon: <UploadOutlined /> }
];

const SliderButtons = ({  text,setText}) => {
  const [selectedIcon, setSelectedIcon] = useState(icons[0].name);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get the selected component from mapping
  const SelectedComponent = componentMapping[selectedIcon];

  return (
    <div style={{ display: 'flex', height }}>
      {/* Sidebar */}
      <div style={{
        width: '50px',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
       
        backgroundColor: '#121212',
        padding: '10px',
        borderRight: '2px solid #333',
        scrollbarWidth: 'thin',
        scrollbarColor: '#888 transparent'
      }}>
        {icons.map((item, index) => (
          <div key={index} style={{ textAlign: 'center', cursor: 'pointer' }}>
            <Button
              style={{ color: selectedIcon === item.name ? '#40a9ff' : 'white', fontSize: '16px' }}
              type="text"
              icon={item.icon}
              onClick={() => setSelectedIcon(item.name)}
            />
            <div style={{ color: 'white', fontSize: '12px' }}>{item.name}</div>
          </div>
        ))}
      </div>

      {/* Display Section */}
      <div style={{
        flex: 1,
        height: '100%',
        backgroundColor: '#1e1e1e',
        color: 'white',
        width:"300px",
        display: 'flex',
      
        justifyContent: 'center',
        fontSize: '20px',
        fontWeight: 'bold'
      }}>
        {SelectedComponent ? <SelectedComponent       text={text} setText={setText} /> : selectedIcon}
      </div>
    </div>
  );
};

export default SliderButtons;
