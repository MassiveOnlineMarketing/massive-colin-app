"use client";

import { cn } from "@/lib/utils";
import React, { useState, createContext, useRef, useEffect } from "react";

interface TabContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsContextProps {
  activeTab: number;
  setActiveTab: (id: number) => void;
  tabWidths: number[]; // Array of widths for each tab
  updateTabWidth: (index: number, width: number) => void; // Function to update width of a specific tab
}

export const TabsContext = createContext<TabsContextProps>({
  activeTab: 1,
  setActiveTab: () => {},
  tabWidths: [], // Initialize as empty array
  updateTabWidth: () => {}, // Placeholder function
});

/**
 * TabContainer component that provides a context for managing tabs.
 *
 * @component
 * @param {TabContainerProps} props - The props for the TabContainer component.
 * @param {React.ReactNode} props.children - The content of the TabContainer.
 * @returns {JSX.Element} The rendered TabContainer component.
 */
const TabContainer: React.FC<TabContainerProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [tabWidths, setTabWidths] = useState<number[]>([]); // State to store widths of all tabs

  /**
   * Function to update the width of a specific tab.
   *
   * @param {number} index - The index of the tab.
   * @param {number} width - The width of the tab.
   */
  const updateTabWidth = (index: number, width: number) => {
    setTabWidths((prevWidths) => {
      const newWidths = [...prevWidths];
      newWidths[index - 1] = width; // Adjust for zero-based index
      return newWidths;
    });
  };

  const value = { activeTab, setActiveTab, tabWidths, updateTabWidth };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

const useTab = () => {
  const context = React.useContext(TabsContext);

  if (!context) {
    throw new Error("useTab must be used within a TabProvider");
  }

  return context;
};

interface TabTitleProps {
  children: React.ReactNode;
  id: number;
  className?: string;
  onClick?: () => void;	
}

const TabTitle: React.FC<TabTitleProps> = ({ children, id, className, onClick }) => {
  const { activeTab, setActiveTab, updateTabWidth } = useTab();
  const tabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabRef.current) {
      updateTabWidth(id, tabRef.current.offsetWidth);
    }
  }, [id]);

  const handleClick = () => {
    setActiveTab(id);
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      ref={tabRef}
      className={cn(
        `cursor-pointer px-4 ${activeTab === id ? "text-primary-500" : "text-gray-400"}`,
        className,
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

const TabIndicatorLineAnimated = ({ gapSize }: { gapSize: number }) => {
  const { tabWidths, activeTab } = useTab();

  let leftPosition = gapSize * (activeTab - 1);
  for (let i = 0; i < activeTab - 1; i++) {
    leftPosition += tabWidths[i] || 0;
  }

  return (
    <div
      className="inline-block absolute z-20 h-full left-0 -bottom-[2px] transition-all duration-200 ease-in-out border-b-[2px] border-primary-500"
      style={{
        left: `${leftPosition}px`,
        width: `${tabWidths[activeTab - 1] || 0}px`,
      }}
    ></div>
  );
};

interface TabContentProps {
  children: React.ReactNode;
  id: number;
  className?: string;
}

const TabContent: React.FC<TabContentProps> = ({ children, id, className }) => {
  const { activeTab } = useTab();

  return (
    <div className={cn(className, ` ${activeTab === id ? "block" : "hidden"}`)}>
      {children}
    </div>
  );
};

export { TabContainer, TabTitle, TabIndicatorLineAnimated, TabContent };
