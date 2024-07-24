import { Reorder, motion } from 'framer-motion';
import React from 'react';
import { Cross1Icon } from "@radix-ui/react-icons";

type TabProps = {
  item: Tab; // Adjust this to use the Tab type
  isSelected: boolean;
  onClick: () => void;
  onRemove: () => void;
}

const Tab = ({ item, isSelected, onClick, onRemove }: TabProps) => {
  return (
    <Reorder.Item
      key={item.id}
      value={item}
      animate={{ opacity: 1, backgroundColor: isSelected ? '#fff' : "#f3f3f3", transition: { duration: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      whileDrag={{ backgroundColor: "#fff" }}
      className={`tab cursor-pointer p-2 ${isSelected ? "bg-white" : "bg-gray-200"} flex border items-center justify-between`}
      onPointerDown={onClick}
    >
      <motion.span layout="position">{item.id}</motion.span>
      <motion.div layout>
        <motion.button
          onPointerDown={(event) => {
            event.stopPropagation();
            onRemove();
          }}
          initial={false}
          className="p-1 flex items-center justify-center"
        >
          <Cross1Icon/>
        </motion.button>
      </motion.div>
    </Reorder.Item>
  )
}

export default Tab;
