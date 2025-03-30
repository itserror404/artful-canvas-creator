
import React, { useState, useCallback, useRef } from 'react';
import { Canvas as FabricCanvas } from 'fabric';
import Canvas from '@/components/Canvas';
import Toolbar from '@/components/Toolbar';
import Sidebar from '@/components/Sidebar';
import { toast } from 'sonner';

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
}

const CanvasPage = () => {
  // Canvas state
  const [activeTool, setActiveTool] = useState('brush');
  const [activeColor, setActiveColor] = useState('#6A5ACD'); // Updated to match our new primary color
  const [brushSize, setBrushSize] = useState(5);
  const [showLayers, setShowLayers] = useState(false);
  
  // History management
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const maxHistorySteps = 30;
  
  // Layers management
  const [layers, setLayers] = useState<Layer[]>([
    { id: 'layer-1', name: 'Layer 1', visible: true, opacity: 100 }
  ]);
  const [activeLayerId, setActiveLayerId] = useState('layer-1');
  
  // Reference to the canvas
  const canvasRef = useRef<FabricCanvas | null>(null);
  
  // Add current canvas state to history
  const addToHistory = useCallback((canvas: FabricCanvas) => {
    canvasRef.current = canvas;
    
    const canvasData = canvas.toJSON();
    const serializedCanvas = JSON.stringify(canvasData);
    
    // Add to history
    setHistory(prev => {
      // If we're not at the end of history, remove future states
      const newHistory = prev.slice(0, historyIndex + 1);
      
      // Add new state and limit history length
      newHistory.push(serializedCanvas);
      if (newHistory.length > maxHistorySteps) {
        newHistory.shift();
      }
      
      return newHistory;
    });
    
    setHistoryIndex(prev => {
      if (prev < maxHistorySteps - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, [historyIndex, maxHistorySteps]);
  
  // Handle undo
  const handleUndo = useCallback(() => {
    if (historyIndex > 0 && canvasRef.current) {
      const newIndex = historyIndex - 1;
      const previousState = history[newIndex];
      
      canvasRef.current.loadFromJSON(JSON.parse(previousState), () => {
        canvasRef.current?.renderAll();
      });
      
      setHistoryIndex(newIndex);
    } else {
      toast.info('Nothing to undo');
    }
  }, [history, historyIndex]);
  
  // Handle redo
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1 && canvasRef.current) {
      const newIndex = historyIndex + 1;
      const nextState = history[newIndex];
      
      canvasRef.current.loadFromJSON(JSON.parse(nextState), () => {
        canvasRef.current?.renderAll();
      });
      
      setHistoryIndex(newIndex);
    } else {
      toast.info('Nothing to redo');
    }
  }, [history, historyIndex]);
  
  // Handle export
  const handleSave = () => {
    if (!canvasRef.current) return;
    
    // Get canvas data URL - add the required multiplier property
    const dataURL = canvasRef.current.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1 // Add the required multiplier property
    });
    
    // Create download link
    const link = document.createElement('a');
    link.download = `artify-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Image saved!');
  };
  
  // Layer management functions
  const handleAddLayer = () => {
    const newLayerId = `layer-${layers.length + 1}`;
    setLayers([
      ...layers,
      { id: newLayerId, name: `Layer ${layers.length + 1}`, visible: true, opacity: 100 }
    ]);
    setActiveLayerId(newLayerId);
    toast.success('New layer added');
  };
  
  const handleDeleteLayer = (id: string) => {
    if (layers.length <= 1) {
      toast.error('Cannot delete the only layer');
      return;
    }
    
    const newLayers = layers.filter(layer => layer.id !== id);
    setLayers(newLayers);
    
    // If active layer was deleted, set active to the last layer
    if (activeLayerId === id) {
      setActiveLayerId(newLayers[newLayers.length - 1].id);
    }
    
    toast.success('Layer deleted');
  };
  
  const handleMoveLayer = (id: string, direction: 'up' | 'down') => {
    const index = layers.findIndex(layer => layer.id === id);
    if (index === -1) return;
    
    if (direction === 'up' && index > 0) {
      const newLayers = [...layers];
      [newLayers[index], newLayers[index - 1]] = [newLayers[index - 1], newLayers[index]];
      setLayers(newLayers);
    } else if (direction === 'down' && index < layers.length - 1) {
      const newLayers = [...layers];
      [newLayers[index], newLayers[index + 1]] = [newLayers[index + 1], newLayers[index]];
      setLayers(newLayers);
    }
  };
  
  const handleToggleVisibility = (id: string) => {
    setLayers(layers.map(layer => 
      layer.id === id 
        ? { ...layer, visible: !layer.visible } 
        : layer
    ));
  };
  
  const handleChangeOpacity = (id: string, opacity: number) => {
    setLayers(layers.map(layer => 
      layer.id === id 
        ? { ...layer, opacity } 
        : layer
    ));
  };

  return (
    <div className="min-h-screen pt-16 bg-artify-background flex flex-col">
      {/* Main Canvas */}
      <div className="flex-1 flex items-center justify-center p-4 page-container" style={{ height: "calc(100vh - 80px)" }}>
        <Canvas 
          activeTool={activeTool}
          activeColor={activeColor}
          brushSize={brushSize}
          activeLayerId={activeLayerId}
          addToHistory={addToHistory}
        />
      </div>
      
      {/* Toolbar */}
      <Toolbar 
        activeTool={activeTool}
        activeColor={activeColor}
        brushSize={brushSize}
        onToolChange={setActiveTool}
        onColorChange={setActiveColor}
        onBrushSizeChange={setBrushSize}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onSave={handleSave}
        onToggleLayers={() => setShowLayers(!showLayers)}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
      />
      
      {/* Layers Sidebar */}
      <Sidebar 
        layers={layers}
        activeLayerId={activeLayerId}
        isOpen={showLayers}
        onClose={() => setShowLayers(false)}
        onSelectLayer={setActiveLayerId}
        onToggleVisibility={handleToggleVisibility}
        onChangeOpacity={handleChangeOpacity}
        onAddLayer={handleAddLayer}
        onDeleteLayer={handleDeleteLayer}
        onMoveLayer={handleMoveLayer}
      />
    </div>
  );
};

export default CanvasPage;
