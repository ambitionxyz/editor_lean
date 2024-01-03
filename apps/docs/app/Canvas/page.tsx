"use client";
import { useCallback, useState } from "react";
import { Stage, Layer, Star, Text } from "react-konva";

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}
const INITIAL_STATE = generateShapes();

const Page = () => {
  const [stars, setStars] = useState(INITIAL_STATE);

  const [sizeWrapper, setSizeWrapper] = useState({
    height: 0,
    width: 0,
  });

  const refWrapper = useCallback((node: any) => {
    if (node !== null) {
      console.log(node.getBoundingClientRect());
      const size = node.getBoundingClientRect();
      setSizeWrapper({
        height: size.height,
        width: size.width,
      });
    }
  }, []);

  const handleDragStart = (e: any) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      })
    );
  };
  const handleDragEnd = (e: any) => {
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: false,
        };
      })
    );
  };

  const textJson = {
    id: "C15xx_0Hh9",
    type: "text",
    x: 37.36601454251254,
    y: 234.82982088253098,
    rotation: 0,
    opacity: 1,
    locked: false,
    blurEnabled: false,
    blurRadius: 10,
    brightnessEnabled: false,
    brightness: 0,
    sepiaEnabled: false,
    grayscaleEnabled: false,
    shadowEnabled: false,
    shadowBlur: 5,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: "black",
    text: "Adventure",
    placeholder: "",
    fontSize: 65.26166180875003,
    fontFamily: "Rock Salt",
    fontStyle: "italic",
    fontWeight: "normal",
    textDecoration: "",
    fill: "rgba(0,0,0,1)",
    align: "center",
    width: 425.2679709149749,
    height: 78.31399417050004,
    strokeWidth: 0,
    stroke: "black",
    lineHeight: 1.2,
    letterSpacing: 0,
  };

  return (
    <div ref={refWrapper} className="w-full h-full bg-transparent">
      <Stage width={sizeWrapper.width} height={sizeWrapper.height}>
        <Layer>
          {stars.map((star) => (
            <Star
              key={star.id}
              id={star.id}
              x={star.x}
              y={star.y}
              numPoints={5}
              innerRadius={20}
              outerRadius={40}
              fill="#89b717"
              opacity={0.8}
              draggable
              rotation={star.rotation}
              shadowColor="black"
              shadowBlur={10}
              shadowOpacity={0.6}
              shadowOffsetX={star.isDragging ? 10 : 5}
              shadowOffsetY={star.isDragging ? 10 : 5}
              scaleX={star.isDragging ? 1.2 : 1}
              scaleY={star.isDragging ? 1.2 : 1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
          <Text {...textJson} />
        </Layer>
      </Stage>
    </div>
  );
};

export default Page;
