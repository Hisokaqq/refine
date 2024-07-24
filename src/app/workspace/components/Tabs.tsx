"use client";

import React, { useState } from 'react';
import { AnimatePresence, Reorder, motion } from "framer-motion";
import TabComponent from './Tab';
import { PlusIcon } from '@radix-ui/react-icons';
import './tabs.css';
import { createTab, deleteTab } from '@/app/actions/workspace.action';

type TabsProps = {
  workspaceId: string;
  tabs: Tab[];
};
const Tabs = ({ workspaceId, tabs }: TabsProps ) => {
  const [items, setItems] = useState<Tab[]>(tabs);
  const [selectedTab, setSelectedTab] = useState<Tab | null>(items[items.length-1] || null);

  const add = async () => {
    const response = await createTab(workspaceId);
    if (response.success && response.tab) {
      const tab: Tab = response.tab;
      if(tab){
        setItems([...items, tab]);
        setSelectedTab(tab);
      }
    } else {
      console.error("Failed to create tab:", response.error);
    }
  };

  const remove = async (item: Tab) => {
    await deleteTab(item.id);
    const newItems = items.filter(i => i.id !== item.id);
    setItems(newItems);
    if (selectedTab?.id === item.id) {
      setSelectedTab(newItems.length > 0 ? newItems[0] : null);
    }
  };

  return (
    <div className='w-full flex h-8 overflow-hidden'>
      <Reorder.Group
        className='tabs'
        axis='x'
        values={items}
        onReorder={setItems}
      >
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <TabComponent
              key={item.id}
              item={item}
              isSelected={selectedTab?.id === item.id}
              onClick={() => setSelectedTab(item)}
              onRemove={() => remove(item)}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>
      <motion.button
        className="cursor-pointer w-8 flex items-center justify-center"
        onClick={add}
        disabled={items.length === 5}
        whileTap={{ scale: 0.7 }}
      >
        <PlusIcon className='w-4 h-4' />
      </motion.button>
    </div>
  );
};

export default Tabs;
