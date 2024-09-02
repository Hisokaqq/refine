'use client';
import React, { useState, useEffect, useRef } from 'react';
import { MathJaxContext } from 'better-react-mathjax';
import EditableLatexBlock from './EditableLatexBlock';
import { useSignleWorkspaceStore } from '@/stores/useWorkspaceStore';

interface Block {
  id: string;
  value: string;
  is_opened: boolean;
}

const TextField: React.FC = () => {
  
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { selectedTab } = useSignleWorkspaceStore();
  const { content }: { content: string | null } = selectedTab || { content: null };
  
  const [blocks, setBlocks] = useState<Block[]>([]);
  useEffect(() => {
    if (content){
      setBlocks(JSON.parse(content));
    }
  }, [content]);

  const addBlock = (index: number) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, { id: Math.random().toString(36).substring(7), value: "New block. Edit this to add your own LaTeX code.", is_opened: false });
    setBlocks(newBlocks);
  };

  const removeBlock = (index: number) => {
    if (blocks.length > 1) {
      const newBlocks = blocks.filter((_, i) => i !== index);
      setBlocks(newBlocks);
      if (activeIndex !== null && index <= activeIndex) {
        setActiveIndex(activeIndex > 0 ? activeIndex - 1 : null);
      }
    }
  };

  const activateBlock = (index: number) => {
    setActiveIndex(index);
  };

  const updateContainerWidth = () => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);

    return () => {
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, []);

  return (
    <MathJaxContext>
      <div
        ref={containerRef}
        className="w-full"
        style={{ width: containerWidth ? `${containerWidth}px` : 'auto' }}
      >
        {containerWidth !== null && blocks.map((block, index) => (
          <EditableLatexBlock
            key={block.id} // Use id as key
            initialContent={block.value}
            isActive={activeIndex === index}
            onActivate={() => activateBlock(index)}
            onAdd={() => addBlock(index)} // Pass the correct index to addBlock
            onRemove={() => removeBlock(index)} // Pass the correct index to removeBlock
          />
        ))}
      </div>
    </MathJaxContext>
  );
};

export default TextField;
