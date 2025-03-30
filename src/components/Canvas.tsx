import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Circle, Rect, PencilBrush, Image as FabricImage } from 'fabric';
import { toast } from 'sonner';

interface CanvasProps {
  activeTool: string;
  activeColor: string;
  brushSize: number;
  activeLayerId: string;
  addToHistory: (canvas: FabricCanvas) => void;
}

const Canvas = ({ 
  activeTool, 
  activeColor, 
  brushSize,
  activeLayerId,
  addToHistory
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<FabricCanvas | null>(null);
  const isDrawingRef = useRef(false);
  const lastClickRef = useRef<{ x: number, y: number } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const initCanvas = async () => {
      const canvas = new FabricCanvas(canvasRef.current, {
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.8,
        backgroundColor: "#ffffff",
        isDrawingMode: activeTool === 'brush'
      });
      
      fabricRef.current = canvas;
      
      const resizeCanvas = () => {
        if (fabricRef.current) {
          fabricRef.current.setDimensions({
            width: window.innerWidth * 0.8,
            height: window.innerHeight * 0.8
          });
        }
      };
      
      window.addEventListener('resize', resizeCanvas);
      
      addToHistory(canvas);
      
      canvas.on('object:added', () => {
        if (!isDrawingRef.current && fabricRef.current) {
          addToHistory(fabricRef.current);
        }
      });
      
      canvas.on('object:modified', () => {
        if (fabricRef.current) {
          addToHistory(fabricRef.current);
        }
      });
      
      toast.success('Canvas ready!');
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
        canvas.dispose();
      };
    };
    
    initCanvas();
  }, [addToHistory]);

  useEffect(() => {
    if (!fabricRef.current) return;
    
    const canvas = fabricRef.current;
    
    canvas.isDrawingMode = activeTool === 'brush' || activeTool === 'eraser';
    
    if (canvas.isDrawingMode) {
      if (!canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush = new PencilBrush(canvas);
      }
      
      const brush = canvas.freeDrawingBrush;
      if (brush) {
        brush.width = brushSize;
        
        if (activeTool === 'eraser') {
          brush.color = '#FFFFFF';
        } else {
          brush.color = activeColor;
        }
      }
    }
    
    const handleCanvasClick = (options: any) => {
      if (!fabricRef.current) return;
      
      const pointer = fabricRef.current.getPointer(options.e);
      
      if (activeTool === 'rectangle') {
        if (!lastClickRef.current) {
          lastClickRef.current = { x: pointer.x, y: pointer.y };
        } else {
          const rect = new Rect({
            left: Math.min(lastClickRef.current.x, pointer.x),
            top: Math.min(lastClickRef.current.y, pointer.y),
            width: Math.abs(pointer.x - lastClickRef.current.x),
            height: Math.abs(pointer.y - lastClickRef.current.y),
            fill: activeColor,
            stroke: '#000',
            strokeWidth: 1
          });
          
          fabricRef.current.add(rect);
          fabricRef.current.setActiveObject(rect);
          lastClickRef.current = null;
          
          addToHistory(fabricRef.current);
        }
      } else if (activeTool === 'circle') {
        if (!lastClickRef.current) {
          lastClickRef.current = { x: pointer.x, y: pointer.y };
        } else {
          const radius = Math.sqrt(
            Math.pow(pointer.x - lastClickRef.current.x, 2) +
            Math.pow(pointer.y - lastClickRef.current.y, 2)
          );
          
          const circle = new Circle({
            left: lastClickRef.current.x - radius,
            top: lastClickRef.current.y - radius,
            radius: radius,
            fill: activeColor,
            stroke: '#000',
            strokeWidth: 1
          });
          
          fabricRef.current.add(circle);
          fabricRef.current.setActiveObject(circle);
          lastClickRef.current = null;
          
          addToHistory(fabricRef.current);
        }
      } else if (activeTool === 'picker') {
        const objects = fabricRef.current.getObjects();
        for (const obj of objects) {
          if (obj.containsPoint(pointer)) {
            const fill = obj.fill as string;
            if (fill && fill !== 'transparent') {
              toast.info(`Color picked: ${fill}`);
              break;
            }
          }
        }
      } else if (activeTool === 'image') {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
          if (!fabricRef.current) return;
          
          const target = e.target as HTMLInputElement;
          const file = target.files?.[0];
          
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              if (!fabricRef.current) return;
              const imgUrl = event.target?.result as string;
              
              FabricImage.fromURL(imgUrl).then(img => {
                const canvas = fabricRef.current!;
                const scale = Math.min(
                  canvas.width! / (img.width! * 2),
                  canvas.height! / (img.height! * 2)
                );
                
                img.scale(scale);
                img.set({
                  left: pointer.x - (img.width! * scale) / 2,
                  top: pointer.y - (img.height! * scale) / 2
                });
                
                canvas.add(img);
                canvas.setActiveObject(img);
                
                addToHistory(canvas);
              }).catch(error => {
                console.error("Error loading image:", error);
                toast.error("Failed to load image");
              });
            };
            reader.readAsDataURL(file);
          }
        };
        input.click();
      } else {
        lastClickRef.current = null;
      }
    };
    
    canvas.on('mouse:down', handleCanvasClick);
    
    canvas.on('path:created', () => {
      isDrawingRef.current = false;
      if (fabricRef.current) {
        addToHistory(fabricRef.current);
      }
    });
    
    canvas.on('mouse:down', () => {
      if (canvas.isDrawingMode) {
        isDrawingRef.current = true;
      }
    });
    
    canvas.on('mouse:up', () => {
      if (isDrawingRef.current && fabricRef.current) {
        isDrawingRef.current = false;
      }
    });
    
    return () => {
      canvas.off('mouse:down');
      canvas.off('path:created');
    };
  }, [activeTool, activeColor, brushSize, addToHistory]);

  return (
    <div className="canvas-container flex items-center justify-center">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;
