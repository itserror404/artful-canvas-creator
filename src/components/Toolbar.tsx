
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Brush, Eraser, Circle, Square, Image, Save, Undo, Redo, Pipette, Layers 
} from 'lucide-react';

interface ToolbarProps {
  activeTool: string;
  activeColor: string;
  brushSize: number;
  onToolChange: (tool: string) => void;
  onColorChange: (color: string) => void;
  onBrushSizeChange: (size: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onToggleLayers: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const tools = [
  { id: 'brush', name: 'Brush', icon: Brush },
  { id: 'eraser', name: 'Eraser', icon: Eraser },
  { id: 'circle', name: 'Circle', icon: Circle },
  { id: 'rectangle', name: 'Rectangle', icon: Square },
  { id: 'image', name: 'Image', icon: Image },
  { id: 'picker', name: 'Color Picker', icon: Pipette },
];

const Toolbar = ({
  activeTool,
  activeColor,
  brushSize,
  onToolChange,
  onColorChange,
  onBrushSizeChange,
  onUndo,
  onRedo,
  onSave,
  onToggleLayers,
  canUndo,
  canRedo
}: ToolbarProps) => {
  return (
    <TooltipProvider>
      <div className="dark-floating-panel fixed left-1/2 bottom-6 transform -translate-x-1/2 py-3 px-4 rounded-full flex items-center gap-2 z-10 animate-slide-in">
        {/* Drawing Tools */}
        <div className="flex items-center gap-1 pr-3 border-r border-artify-primary/30">
          {tools.map((tool) => (
            <Tooltip key={tool.id}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`toolbar-button ${activeTool === tool.id ? 'active' : ''}`}
                  onClick={() => onToolChange(tool.id)}
                >
                  <tool.icon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tool.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        
        {/* Color Picker */}
        <div className="flex items-center gap-2 px-3 border-r border-artify-primary/30">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <div
                  className="h-6 w-6 rounded-full border border-white cursor-pointer"
                  style={{ backgroundColor: activeColor }}
                  onClick={() => document.getElementById('color-picker')?.click()}
                />
                <input
                  id="color-picker"
                  type="color"
                  value={activeColor}
                  onChange={(e) => onColorChange(e.target.value)}
                  className="sr-only"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Color</p>
            </TooltipContent>
          </Tooltip>
          
          {/* Brush Size */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={brushSize}
                  onChange={(e) => onBrushSizeChange(parseInt(e.target.value))}
                  className="w-24 accent-artify-secondary"
                />
                <span className="text-xs w-6 text-white">{brushSize}px</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Brush Size</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-1 pl-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="toolbar-button"
                onClick={onUndo}
                disabled={!canUndo}
              >
                <Undo className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Undo</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="toolbar-button"
                onClick={onRedo}
                disabled={!canRedo}
              >
                <Redo className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Redo</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="toolbar-button"
                onClick={onToggleLayers}
              >
                <Layers className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Layers</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="toolbar-button"
                onClick={onSave}
              >
                <Save className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Toolbar;
