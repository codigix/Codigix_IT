import React, { useState } from 'react';
import { Search, Sparkles, ChevronRight, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SolutionSidebar = ({
  title = "Solutions",
  searchPlaceholder = "Search modules...",
  items = [],
  groups = null,
  activeTab,
  setActiveTab,
  ctaTitle = "Need a Custom Solution?",
  ctaText = "Our engineers build tailored enterprise systems designed for your operational needs.",
  ctaButtonText = "Schedule Demo",
  onCtaClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Normalize groups & items data
  let normalizedGroups = [];

  if (groups && Array.isArray(groups)) {
    normalizedGroups = groups;
  } else if (items && Array.isArray(items)) {
    // If items have category field, group them; otherwise put into single group
    const hasCategories = items.some(item => item.category);
    if (hasCategories) {
      const categoryMap = {};
      items.forEach(item => {
        const cat = item.category || 'SOLUTIONS';
        if (!categoryMap[cat]) categoryMap[cat] = [];
        categoryMap[cat].push(item);
      });
      normalizedGroups = Object.keys(categoryMap).map(cat => ({
        category: cat,
        items: categoryMap[cat]
      }));
    } else {
      normalizedGroups = [
        {
          category: 'ALL MODULES',
          items: items
        }
      ];
    }
  }

  // Filter items based on search query
  const filteredGroups = normalizedGroups.map(group => ({
    ...group,
    items: group.items.filter(item => {
      const nameMatch = item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const subtitleMatch = item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      const idMatch = item.id && String(item.id).toLowerCase().includes(searchQuery.toLowerCase());
      return nameMatch || subtitleMatch || idMatch;
    })
  })).filter(group => group.items.length > 0);

  const totalCount = normalizedGroups.reduce((acc, g) => acc + g.items.length, 0);

  const handleSelectTab = (item) => {
    const tabIdentifier = item.id !== undefined ? item.id : item.name;
    setActiveTab(tabIdentifier);
  };

  const handleCta = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      navigate('/contact');
    }
  };

  const allFlatItems = normalizedGroups.flatMap(g => g.items);

  return (
    <>
      {/* Mobile Sticky Horizontal Switcher (< lg) */}
      <div className="lg:hidden sticky top-16 z-30 bg-white/95 dark:bg-[#07041a]/95 backdrop-blur-md border-b border-slate-200 dark:border-gray-800 py-3 px-4 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
          {allFlatItems.map((item, idx) => {
            const tabId = item.id !== undefined ? item.id : item.name;
            const isSelected = activeTab === tabId || activeTab === item.name;
            const ItemIcon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSelectTab(item)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-rose-600 text-white shadow-md shadow-purple-500/20'
                    : 'bg-slate-100 dark:bg-[#0f0a2e] text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-gray-800 hover:bg-slate-200 dark:hover:bg-purple-900/20'
                }`}
              >
                {ItemIcon && <ItemIcon size={14} className={isSelected ? 'text-white' : 'text-purple-500'} />}
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Sticky Sidebar (>= lg) */}
      <aside className="hidden lg:flex flex-col sticky top-24 h-[calc(100vh-6.5rem)] overflow-y-auto hide-scrollbar self-start border-l border-slate-200 dark:border-gray-800/50 bg-slate-50/70 dark:bg-[#07041a]/80 backdrop-blur-xl p-5 w-full text-left transition-colors duration-300">
        
        {/* Header Title & Count Chip */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-rose-500 animate-pulse" />
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">{title}</h3>
          </div>
          <span className="text-[9px] font-mono font-bold bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-800/40">
            {totalCount} Modules
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative mb-5">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-8 py-2 bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/40 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 hover:text-slate-700 dark:hover:text-white"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Grouped Sidebar Items */}
        <div className="space-y-6 flex-1">
          {filteredGroups.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500 dark:text-gray-500">
              No matching items found.
            </div>
          ) : (
            filteredGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1.5">
                <div className="px-2 mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold tracking-widest text-slate-400 dark:text-gray-500 uppercase">
                    {group.category}
                  </span>
                  <span className="text-[9px] text-slate-400 dark:text-gray-600 font-mono">
                    {group.items.length}
                  </span>
                </div>

                <div className="space-y-1">
                  {group.items.map((item, idx) => {
                    const tabId = item.id !== undefined ? item.id : item.name;
                    const isSelected = activeTab === tabId || activeTab === item.name;
                    const ItemIcon = item.icon;

                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectTab(item)}
                        className={`group relative flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-200 border ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-600 to-rose-600 text-white border-purple-400/50 shadow-md shadow-purple-500/20'
                            : 'bg-white dark:bg-[#0c0828]/50 border-slate-200/80 dark:border-gray-800/60 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-500/40 shadow-xs'
                        }`}
                      >
                        {/* Icon Box */}
                        {ItemIcon && (
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 group-hover:scale-110'
                          }`}>
                            <ItemIcon size={16} />
                          </div>
                        )}

                        {/* Title & Subtitle */}
                        <div className="flex-1 min-w-0 pr-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-xs font-bold leading-tight truncate transition-colors ${
                              isSelected ? 'text-white' : 'text-slate-900 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-300'
                            }`}>
                              {item.name}
                            </h4>
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0 ml-1"></span>
                            )}
                          </div>
                          {item.subtitle && (
                            <p className={`text-[10px] leading-tight truncate mt-0.5 transition-colors ${
                              isSelected ? 'text-white/85 font-medium' : 'text-slate-500 dark:text-gray-400'
                            }`}>
                              {item.subtitle}
                            </p>
                          )}
                        </div>

                        {/* Hover Chevron */}
                        <ChevronRight 
                          size={14} 
                          className={`shrink-0 self-center transition-transform duration-200 ${
                            isSelected 
                              ? 'text-white opacity-100 translate-x-0.5' 
                              : 'text-slate-400 dark:text-gray-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                          }`} 
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom CTA Widget Box */}
        {ctaTitle && (
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-gray-800/80">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/90 via-[#0d0730] to-rose-950/90 border border-purple-500/40 shadow-xl text-left text-white keep-dark">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-rose-400 animate-pulse" />
                <h4 className="text-xs font-bold text-white">{ctaTitle}</h4>
              </div>
              <p className="text-[10px] text-gray-300 leading-relaxed mb-3">
                {ctaText}
              </p>
              <button
                onClick={handleCta}
                className="w-full py-2 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>{ctaButtonText}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}

      </aside>
    </>
  );
};

export default SolutionSidebar;
