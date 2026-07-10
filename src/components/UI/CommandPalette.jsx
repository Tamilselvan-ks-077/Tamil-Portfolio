import React from 'react';
import { Search, Sparkles } from '../Common/Icons';

export default function CommandPalette({ 
  showCmdPalette, 
  setShowCmdPalette, 
  cmdSearch, 
  setCmdSearch, 
  cmdItems 
}) {
  if (!showCmdPalette) return null;

  const filteredItems = cmdItems.filter(i => 
    i.name.toLowerCase().includes(cmdSearch.toLowerCase())
  );

  return (
    <div 
      className={`cmd-palette-overlay ${showCmdPalette ? 'open' : ''}`}
      onClick={() => setShowCmdPalette(false)}
    >
      <div className="cmd-palette-box" onClick={e => e.stopPropagation()}>
        <div className="cmd-palette-search">
          <Search size={18} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search command palette..." 
            className="cmd-search-input"
            value={cmdSearch}
            onChange={e => setCmdSearch(e.target.value)}
          />
        </div>
        <div className="cmd-palette-list">
          {filteredItems.map((item, idx) => (
            <div 
              key={idx} 
              className="cmd-palette-item"
              onClick={item.action}
            >
              <div className="cmd-item-left">
                <Sparkles size={16} style={{ color: '#0071e3' }} />
                <span>{item.name}</span>
              </div>
              <div className="cmd-shortcut">{item.shortcut}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
