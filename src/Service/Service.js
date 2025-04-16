
export const wrapText = (text, maxWidth, fontSize) => {
        const words = text.split(" ");
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        context.font = `${fontSize}px Arial`;
        
        let lines = [];
        let currentLine = "";
    
        words.forEach((word) => {
        let testLine = currentLine.length > 0 ? `${currentLine} ${word}` : word;
        let width = context.measureText(testLine).width;
    
        // Adding a slight buffer (e.g., 90% of maxWidth) to prevent overflow
        if (width < maxWidth * 1) {
            currentLine = testLine;
        } else {
            lines.push(currentLine.trim()); // Ensure clean wrapping
            currentLine = word;
        }
        });
    
        if (currentLine) lines.push(currentLine.trim());
    
        return lines;
    };
    
 