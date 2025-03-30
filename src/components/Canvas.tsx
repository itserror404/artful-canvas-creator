
import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Circle, Rect, PencilBrush, Object as FabricObject, Image as FabricImage } from 'fabric';
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
  
  const [drawingObject, setDrawingObject] = useState<FabricObject | null>(null);
  
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
      
      fabricCanvas.freeDrawingBrush = new PencilBrush(fabricCanvas);
      fabricCanvas.freeDrawingBrush.width = brushSize;
      fabricCanvas.freeDrawingBrush.color = activeColor;
      
      addToHistory(fabricCanvas);
      
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
  }, [addToHistory, activeTool, activeColor, brushSize]);
  
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    
    canvas.isDrawingMode = activeTool === 'brush' || activeTool === 'eraser';
    
    if (canvas.isDrawingMode && canvas.freeDrawingBrush) {
      const brush = canvas.freeDrawingBrush;
      brush.width = brushSize;
      
      if (activeTool === 'eraser') {
        brush.color = '#FFFFFF';
      } else {
        brush.color = activeColor;
      }
    }
    
    canvas.discardActiveObject();
    canvas.renderAll();
  }, [activeTool, activeColor, brushSize]);
  
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool !== 'circle' && activeTool !== 'rectangle') return;
    if (!fabricRef.current) return;
    
    const canvas = fabricRef.current;
    setIsDrawing(true);
    
    const pointer = canvas.getPointer(e.nativeEvent);
    setLastPosX(pointer.x);
    setLastPosY(pointer.y);
    
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
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !drawingObject || !fabricRef.current) return;
    
    const canvas = fabricRef.current;
    const pointer = canvas.getPointer(e.nativeEvent);
    
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
  
  const handleMouseUp = () => {
    if (!isDrawing || !fabricRef.current) return;
    
    setIsDrawing(false);
    setDrawingObject(null);
    
    addToHistory(fabricRef.current);
  };
  
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
            
            // Fix: Using the correct format for FabricImage.fromURL with options and callback
            FabricImage.fromURL(imgUrl, {}, (img) => {
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
  
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool !== 'picker' || !fabricRef.current) return;
    
    const canvas = fabricRef.current;
    const pointer = canvas.getPointer(e.nativeEvent);
    const context = canvas.getContext();
    
    const imageData = context.getImageData(pointer.x, pointer.y, 1, 1).data;
    const r = imageData[0];
    const g = imageData[1];
    const b = imageData[2];
    
    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    
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
