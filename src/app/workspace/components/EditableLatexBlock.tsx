'use client';
import React, { useState, useEffect, useRef } from 'react';
import { MathJax } from 'better-react-mathjax';
import { PlusIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon, DragHandleDots2Icon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

const EditableLatexBlock: React.FC<{ 
  initialContent?: string; 
  isActive: boolean; 
  onActivate: () => void; 
  onAdd: () => void; 
  onRemove: () => void;
}> = ({ initialContent = "", isActive, onActivate, onAdd, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [isEditing, content]);

  useEffect(() => {
    if (!isActive) {
      setIsEditing(false);
    }
  }, [isActive]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      setIsEditing(false);
    }
  };

  const handleDoubleClick = () => {
    onActivate();
    setIsEditing(true);
  };

  
  return (
    <div className="relative w-full mb-4 flex">
      {/* Vertical buttons */}
      <div className="flex h-fit flex-col sticky top-0 ">
        <Button variant="ghost" size="icon" onClick={onAdd}>
          <PlusIcon className="w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onRemove}>
          <TrashIcon className="w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <DragHandleDots2Icon className="w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <ArrowUpIcon className="w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <ArrowDownIcon className="w-4" />
        </Button>
      </div>

      {/* Content area */}
      <div
        className={`flex-grow flex items-stretch p-4 border ${isActive ? "shadow-md" : ""} rounded-md border-gray-300 cursor-pointer`}
        onDoubleClick={handleDoubleClick}
      >
        {isEditing ? (
          <textarea
            ref={textareaRef}
            className="w-full h-full border-none outline-none resize-none bg-transparent font-inherit text-inherit"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
          />
        ) : (
          <div className="w-full h-full overflow-x-aut overflow-y-hidden break-words">
            <MathJax dynamic className='overflow-y-hidden'>
              {content}
            </MathJax>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableLatexBlock;
