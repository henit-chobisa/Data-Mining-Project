import React, { useState } from 'react';
import './Tabbar.css';

interface TabBarProps {
  defaultTabIndex?: number;
}

const TabBar: React.FC<TabBarProps> = ({ defaultTabIndex = 0 }) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(defaultTabIndex);

  const handleClick = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="tab-bar">
      <div className="tab-bar__tabs">
        <div
          className={`tab-bar__tab ${activeTabIndex === 0 && 'active'}`}
          onClick={() => handleClick(0)}
        >
          Listen Me
        </div>
        <div
          className={`tab-bar__tab ${activeTabIndex === 1 && 'active'}`}
          onClick={() => handleClick(1)}
        >
          Show Me
        </div>
      </div>
    </div>
  );
};

export default TabBar;
