import { Stage, Layer, Image, Text, Rect } from "react-konva";
import useImage from "use-image";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Button } from "antd";
import { wrapText } from "../Service/Service";

const STAGE_WIDTH = 400;
const STAGE_HEIGHT = 400;
const MAX_TEXT_WIDTH = STAGE_WIDTH - 40;

const ImageEditor = ({ fontSize, setFontSize,
    fontColor, setFontColor,
    strokeColor, setStrokeColor,
    shadowColor, setShadowColor,
    fontStyle, setFontStyle,
    shadowOpacity, setShadowOpacity,
    shadowBlur, setShadowBlur}) => {
const [customImage] = useImage(
    "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg", 
    "anonymous"
);

const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
const [textPosition, setTextPosition] = useState({ x: 10, y: 100 });
const [headerText, setHeaderText] = useState("Header Text Example That May Be Long");
const [footerText, setFooterText] = useState("Footer Text Example That May Be Long Footer Text Example That May Be Long");

const [text, setText] = useState("Trees are* vital *to life on Earth *, shelter, and *food for countless *species*. They absorb carbon dioxide, helping to combat climate change, and their roots prevent soil erosion. Trees also offer shade, reduce air pollution, and enhance biodiversity by supporting birds, insects, and animals");
const [wrappedText, setWrappedText] = useState([]);
const [isDragging, setIsDragging] = useState(false);
const [isEditing, setIsEditing] = useState(false);

const stageRef = useRef(null);
const inputRef = useRef(null);

const handleDownload = () => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const link = document.createElement("a");
    link.href = uri;
    link.download = "canvas-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const handleDoubleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
    inputRef.current.focus();
    }, 100);
};

useLayoutEffect(() => {
    setWrappedText(wrapText(text, MAX_TEXT_WIDTH, fontSize));
}, [text, fontSize]);


const footerLines = wrapText(footerText, MAX_TEXT_WIDTH, fontSize + 2);
const footerHeight = footerLines.length * (fontSize + 2) * 1.2;
const footerY = STAGE_HEIGHT - footerHeight - 10; // Adjusted Y position

return (
    <div style={{ textAlign: "center", position: "relative" }}>
    <Stage
        ref={stageRef}
        width={STAGE_WIDTH}
        height={STAGE_HEIGHT}
        style={{ border: "1px solid black" }}
    >
        <Layer>
        {customImage && (
            <Image
            image={customImage}
            x={imagePosition.x}
            y={imagePosition.y}
            width={STAGE_WIDTH}
            height={STAGE_HEIGHT}
            draggable
            onDragEnd={(e) =>
                setImagePosition({ x: e.target.x(), y: e.target.y() })
            }
            />
        )}

        {/* Header Text with Wrapping */}
        {wrapText(headerText, MAX_TEXT_WIDTH, fontSize + 4).map((line, i) => (
            <Text
                key={`header-${i}`}
                x={20}
                y={10 + i * (fontSize + 4) * 1.2}
                text={line}
                fontSize={fontSize + 4}
                fill={fontColor}
                fontStyle="bold"
            />
        ))}

        {isDragging && (
            <Rect
            x={textPosition.x - 5}
            y={textPosition.y - 5}
            width={MAX_TEXT_WIDTH}
            height={wrappedText.length * fontSize * 1.2}
            stroke="red"
            strokeWidth={2}
            dash={[5, 5]}
            />
        )}

        {wrappedText.map((line, index) => {
            const parts = line.split(/(\*[^*]+\*)/g);
            let xOffset = textPosition.x;
            return parts.map((part, i) => {
                const isHighlighted = part.startsWith("*") && part.endsWith("*");
                const cleanText = isHighlighted ? part.slice(1, -1) : part;
                const textX = xOffset;
                xOffset += cleanText.length * (fontSize / 2);
                return (
                    <Text
                        key={`${index}-${i}`}
                        x={textX}
                        y={textPosition.y + index * fontSize * 1.2}
                        text={cleanText}
                        fontSize={fontSize}
                        fill={isHighlighted ? 'white' : fontColor}
                        fontStyle={fontStyle}
                        stroke={strokeColor}
                        shadowOpacity={shadowOpacity}
                        shadowOffset={{ x: 3, y: 3 }}
                        shadowBlur={0}
                        strokeWidth={1}
                        draggable
                        onDblClick={handleDoubleClick}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={(e) => {
                            setIsDragging(false);
                            setTextPosition({ x: e.target.x(), y: e.target.y() });
                        }}
                    />
                );
            });
        })}

        {/* Footer Text with Wrapping */}
        {footerLines.map((line, i) => (
    <Text
        key={`footer-${i}`}
        x={20}
        y={footerY + i * (fontSize + 2) * 1.2} // Adjusted to prevent overflow
        text={line}
        fontSize={fontSize + 2}
        fill={fontColor}
        fontStyle="italic"
    />
))
}
        </Layer>
    </Stage>

    <Button onClick={handleDownload}> Download Image </Button>
    </div>
);
};

export default ImageEditor;
