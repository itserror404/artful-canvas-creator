
import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Circle, Rect, PencilBrush, Object as FabricObject } from 'fabric';
import { toast } from 'sonner';

interface CanvasProps {
  activeTool: string;
  activeColor: string;
  brushSize: number;
  activeLayerId: string;
  addToHistory: (canvas: FabricCanvas) => void;
}

const Canvas = ({ activeTool, activeColor, brushSize, activeLayerId, addToHistory }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<FabricCanvas | null>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosX, setLastPosX] = useState(0);
  const [lastPosY, setLastPosY] = useState(0);
  
  // Object being drawn (for shapes)
  const [drawingObject, setDrawingObject] = useState<FabricObject | null>(null);
  
  // Initialize the canvas
  useEffect(() => {
    if (canvasRef.current && !fabricRef.current) {
      const parentDiv = canvasRef.current.parentElement;
      const canvasWidth = parentDiv ? parentDiv.clientWidth - 48 : 800;
      const canvasHeight = parentDiv ? parentDiv.clientHeight - 48 : 600;
      
      const fabricCanvas = new FabricCanvas(canvasRef.current, {
        width: canvasWidth,
        height: canvasHeight,
        backgroundColor: 'white',
        isDrawingMode: activeTool === 'brush' || activeTool === 'eraser'
      });
      
      fabricRef.current = fabricCanvas;
      
      // Add initial state to history
      addToHistory(fabricCanvas);
      
      // Resize handler
      const handleResize = () => {
        if (fabricRef.current && parentDiv) {
          const newWidth = parentDiv.clientWidth - 48;
          const newHeight = parentDiv.clientHeight - 48;
          
          fabricRef.current.setDimensions({
            width: newWidth,
            height: newHeight
          });
          
          fabricRef.current.renderAll();
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        fabricRef.current?.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [addToHistory, activeTool]);
  
  // Update canvas when tool changes
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    
    // Update drawing mode based on active tool
    canvas.isDrawingMode = activeTool === 'brush' || activeTool === 'eraser';
    
    // Configure brush - make sure the brush is initialized before setting properties
    if (canvas.isDrawingMode) {
      if (!canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush = new PencilBrush(canvas);
      }
      
      const brush = canvas.freeDrawingBrush;
      if (brush) {
        brush.width = brushSize;
        
        if (activeTool === 'eraser') {
          // For eraser, we'll use white color
          brush.color = '#FFFFFF';
        } else {
          brush.color = activeColor;
        }
      }
    }
    
    // Deselect any selected object
    canvas.discardActiveObject();
    canvas.renderAll();
    
  }, [activeTool, activeColor, brushSize]);
  
  // Mouse down handler for shape drawing
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool !== 'circle' && activeTool !== 'rectangle') return;
    if (!fabricRef.current) return;
    
    const canvas = fabricRef.current;
    setIsDrawing(true);
    
    // Get canvas coordinates
    const pointer = canvas.getPointer(e.nativeEvent);
    setLastPosX(pointer.x);
    setLastPosY(pointer.y);
    
    // Create a new shape
    let obj: FabricObject;
    
    if (activeTool === 'circle') {
      obj = new Circle({
        left: pointer.x,
        top: pointer.y,
        radius: 1,
        fill: 'transparent',
        stroke: activeColor,
        strokeWidth: brushSize / 2,
        originX: 'center',
        originY: 'center'
      });
    } else {
      // Rectangle
      obj = new Rect({
        left: pointer.x,
        top: pointer.y,
        width: 1,
        height: 1,
        fill: 'transparent',
        stroke: activeColor,
        strokeWidth: brushSize / 2
      });
    }
    
    canvas.add(obj);
    setDrawingObject(obj);
    canvas.renderAll();
  };
  
  // Mouse move handler for shape drawing
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !drawingObject || !fabricRef.current) return;
    
    const canvas = fabricRef.current;
    const pointer = canvas.getPointer(e.nativeEvent);
    
    // Update shape dimensions
    if (activeTool === 'circle') {
      const circle = drawingObject as Circle;
      const dx = pointer.x - lastPosX;
      const dy = pointer.y - lastPosY;
      const radius = Math.sqrt(dx * dx + dy * dy);
      circle.set({ radius });
    } else if (activeTool === 'rectangle') {
      const rect = drawingObject as Rect;
      const width = Math.abs(pointer.x - lastPosX);
      const height = Math.abs(pointer.y - lastPosY);
      
      rect.set({
        width,
        height,
        left: pointer.x < lastPosX ? pointer.x : lastPosX,
        top: pointer.y < lastPosY ? pointer.y : lastPosY
      });
    }
    
    canvas.renderAll();
  };
  
  // Mouse up handler for shape drawing
  const handleMouseUp = () => {
    if (!isDrawing || !fabricRef.current) return;
    
    setIsDrawing(false);
    setDrawingObject(null);
    
    // Add to history
    addToHistory(fabricRef.current);
  };
  
  // Handle file upload for image tool
  const handleFileUpload = () => {
    if (activeTool !== 'image' || !fabricRef.current) return;
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const reader = new FileReader();
        
        reader.onload = (e) => {
          if (fabricRef.current) {
            const imgUrl = e.target?.result as string;
            
            fabric.Image.fromURL(imgUrl, (img) => {
              // Scale image to fit canvas
              const canvas = fabricRef.current!;
              const scale = Math.min(
                (canvas.width / 2) / img.width!,
                (canvas.height / 2) / img.height!
              );
              
              img.scale(scale);
              img.set({
                left: canvas.width / 4,
                top: canvas.height / 4
              });
              
              canvas.add(img);
              canvas.setActiveObject(img);
              canvas.renderAll();
              
              // Add to history
              addToHistory(canvas);
              toast.success('Image added to canvas');
            });
          }
        };
        
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  };
  
  // Handle the color picker tool
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool !== 'picker' || !fabricRef.current) return;
    
    const canvas = fabricRef.current;
    const pointer = canvas.getPointer(e.nativeEvent);
    const context = canvas.getContext();
    
    // Get pixel data at the clicked position
    const imageData = context.getImageData(pointer.x, pointer.y, 1, 1).data;
    const r = imageData[0];
    const g = imageData[1];
    const b = imageData[2];
    
    // Convert to hex
    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    
    // Notify about the picked color
    toast.info(`Color picked: ${hex}`);
  };
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="canvas-container w-full h-full flex items-center justify-center p-6">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={(e) => {
            if (activeTool === 'image') {
              handleFileUpload();
            } else if (activeTool === 'picker') {
              handleCanvasClick(e);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Canvas;
