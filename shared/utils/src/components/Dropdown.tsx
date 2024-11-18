import React, { useEffect, useRef, useState } from 'react';

export interface DropdownItem {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
  divider?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  trigger: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  trigger,
  align = 'right',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const handleItemClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute z-50 mt-2 ${
            align === 'right' ? 'right-0' : 'left-0'
          } bg-white dark:bg-dark-primary rounded-lg shadow-lg border border-gray-200 dark:border-dark-modalColor min-w-[200px] py-1`}
          role="menu"
        >
          {items.map((item: any, index: number) => (
            <React.Fragment key={index}>
              <div
                className="px-4 py-2 text-sm text-gray-700 dark:text-dark-lavender hover:bg-gray-100 dark:hover:bg-dark-modalColor cursor-pointer flex items-center"
                onClick={() => handleItemClick(item.onClick)}
                role="menuitem"
                tabIndex={-1}
              >
                {item.icon && <span className="mr-2 w-4 h-4">{item.icon}</span>}
                {item.label}
              </div>
              {item.divider && index < items.length - 1 && (
                <div className="h-px bg-gray-700" />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
