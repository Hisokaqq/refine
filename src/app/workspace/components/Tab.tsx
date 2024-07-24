import { Reorder, motion } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { Cross1Icon } from "@radix-ui/react-icons";
import { updateTab } from '@/app/actions/workspace.action';

type TabProps = {
  item: Tab;
  isSelected: boolean;
  onClick: () => void;
  onRemove: () => void;
  onUpdateTitle: (id: string, newTitle: string) => void;
};

const Tab = ({ item, isSelected, onClick, onRemove, onUpdateTitle }: TabProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(item.title);
  }, [item.title]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBlur = async () => {
    setIsEditing(false);
    if (title !== item.title) {
      onUpdateTitle(item.id, title);
      console.log('saved');
      await updateTab(item.id, title, item.content);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (title !== item.title) {
        onUpdateTitle(item.id, title);
        console.log("Enter saved");
        await updateTab(item.id, title, item.content);
      }
      setIsEditing(false);
    }
  };

  return (
    <Reorder.Item
      key={item.id}
      value={item}
      animate={{ opacity: 1, backgroundColor: isSelected ? '#fff' : "#f3f3f3", transition: { duration: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      whileDrag={{ backgroundColor: "#fff" }}
      className={`tab cursor-pointer p-2 ${isSelected ? "bg-white" : "bg-gray-200"} flex border items-center justify-between`}
      onPointerDown={onClick}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <motion.input
          ref={inputRef}
          type="text"
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus
          className={`bg-transparent border-none outline-none tab-input-${item.id}`}
        />
      ) : (
        <motion.span layout="position" className={`tab-title-${item.id}`}>{item.title}</motion.span>
      )}
      <motion.div layout>
        <motion.button
          onPointerDown={(event) => {
            event.stopPropagation();
            onRemove();
          }}
          initial={false}
          className="p-1 flex items-center justify-center"
        >
          <Cross1Icon />
        </motion.button>
      </motion.div>
    </Reorder.Item>
  );
};

export default Tab;
