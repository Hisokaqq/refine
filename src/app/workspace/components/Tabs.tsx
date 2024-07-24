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
  const [selectedTab, setSelectedTab] = useState<Tab | null>(items[items.length - 1] || null);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const add = async () => {
    setIsAdding(true);
    const tempTabId = `Loading...`;
    const newTab = { id: "Loading...", title: tempTabId, content: "", updatedAt: "1" };
    setItems(prevItems => [...prevItems, newTab]);
    setSelectedTab(newTab);

    const response = await createTab(workspaceId);
    setIsAdding(false);

    if (response.success && response.tab) {
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === tempTabId ? response.tab : item
        )
      );
      setSelectedTab(response.tab);
    } else {
      console.error("Failed to create tab:", response.error);
      setItems(prevItems => prevItems.filter(item => item.id !== tempTabId));
    }
  };

  const remove = async (item: Tab) => {
    setItems(prevItems => prevItems.filter(i => i.id !== item.id));
    if (selectedTab?.id === item.id) {
      setSelectedTab(items.length > 0 ? items[0] : null);
    }
    try {
      await deleteTab(item.id);
    } catch (error) {
      console.error("Failed to delete tab:", error);
    }
  };

  const updateTitle = (id: string, newTitle: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, title: newTitle } : item
      )
    );
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
              onUpdateTitle={updateTitle}
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
        disabled={isAdding || items.length === 5}
        whileTap={{ scale: 0.7 }}
      >
        <PlusIcon className='w-4 h-4' />
      </motion.button>
    </div>
  );
};

export default Tabs;
