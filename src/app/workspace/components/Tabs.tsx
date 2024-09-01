"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, Reorder, motion } from "framer-motion";
import TabComponent from './Tab';
import { PlusIcon } from '@radix-ui/react-icons';
import './tabs.css';
import { createTab, deleteTab } from '@/app/actions/workspace.action';
import { useSignleWorkspaceStore } from '@/stores/useWorkspaceStore';

const Tabs = () => {
  const { workspace, setSelectedTab, selectedTab } = useSignleWorkspaceStore();
  const { id: workspaceId, tabs } = workspace ?? { id: '1', tabs: [] };
  const [items, setItems] = useState<Tab[]>(tabs ?? []);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  useEffect(() => {
    if(tabs){
      setItems(tabs);
      setSelectedTab(tabs[tabs.length - 1] || null);
    }
  }, [tabs, setSelectedTab]);

  const add = async () => {
    setIsAdding(true);
    const tempTabId = `temp-${Date.now()}`;
    const newTab = { id: tempTabId, title: 'Loading...', content: "", updatedAt: new Date().toISOString() };
    setItems(prevItems => [...prevItems, newTab]);
    setSelectedTab(newTab);

    const response = await createTab(workspaceId);
    setIsAdding(false);

    if (response.success && response.tab) {
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === tempTabId ? { ...item, ...response.tab, id: response.tab.id } : item
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
      setSelectedTab(tabs!.length > 0 ? items[0] : null);
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
    <div className='w-full h-8 flex-shrink-0 flex overflow-hidden'>
      <Reorder.Group
        className='tabs h-full'
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
        className={`${(isAdding || items.length === 5) ? "opacity-50" : ""} cursor-pointer w-8 flex items-center justify-center `}
        onClick={add}
        disabled={isAdding || items.length === 5}
        whileTap={!(isAdding || items.length === 5) ? { scale: 0.8 } : {}}
      >
        <PlusIcon className='w-4 h-4' />
      </motion.button>
    </div>
  );
};

export default Tabs;
