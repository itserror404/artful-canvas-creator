
import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Eye, EyeOff, Trash2, Plus, MoveUp, MoveDown, X 
} from 'lucide-react';

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
}

interface SidebarProps {
  layers: Layer[];
  activeLayerId: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectLayer: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onChangeOpacity: (id: string, opacity: number) => void;
  onAddLayer: () => void;
  onDeleteLayer: (id: string) => void;
  onMoveLayer: (id: string, direction: 'up' | 'down') => void;
}

const Sidebar = ({
  layers,
  activeLayerId,
  isOpen,
  onClose,
  onSelectLayer,
  onToggleVisibility,
  onChangeOpacity,
  onAddLayer,
  onDeleteLayer,
  onMoveLayer
}: SidebarProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-72 bg-artify-primary border-l border-gray-800 shadow-lg p-4 z-20 overflow-y-auto animate-slide-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Layers</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="space-y-4">
        {layers.map((layer) => (
          <div 
            key={layer.id}
            className={`p-3 rounded-lg border ${
              activeLayerId === layer.id 
                ? 'border-artify-secondary bg-artify-secondary/10' 
                : 'border-gray-800 bg-artify-background/40'
            }`}
          >
            <div 
              className="flex items-center justify-between mb-2 cursor-pointer"
              onClick={() => onSelectLayer(layer.id)}
            >
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-6 w-6 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleVisibility(layer.id);
                  }}
                >
                  {layer.visible ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
                <span 
                  className={layer.visible ? '' : 'text-gray-500'}
                >
                  {layer.name}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveLayer(layer.id, 'up');
                  }}
                >
                  <MoveUp className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveLayer(layer.id, 'down');
                  }}
                >
                  <MoveDown className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-6 w-6 text-artify-accent"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteLayer(layer.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Layer Opacity Control */}
            <div className="flex items-center gap-3">
              <span className="text-xs">Opacity:</span>
              <Slider
                value={[layer.opacity]}
                min={0}
                max={100}
                step={1}
                className="flex-1"
                onValueChange={(value) => onChangeOpacity(layer.id, value[0])}
              />
              <span className="text-xs w-7">{layer.opacity}%</span>
            </div>
          </div>
        ))}
        
        <Button 
          onClick={onAddLayer}
          variant="outline" 
          className="w-full border-dashed border-gray-700 hover:border-artify-secondary flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Layer
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
