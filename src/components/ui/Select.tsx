import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options: string[];
  placeholder?: string;
  multiple?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  multiple = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const handleToggle = (option: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(option)
        ? currentValues.filter(v => v !== option)
        : [...currentValues, option];
      onChange(newValues);
    } else {
      onChange(option);
      setIsOpen(false);
    }
  };

  const displayValue = () => {
    if (multiple && Array.isArray(value)) {
      return value.length > 0 ? `${value.length} selected` : placeholder;
    }
    return value || placeholder;
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent flex items-center justify-between"
      >
        <span className="text-sm text-gray-900">{displayValue()}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map(option => (
            <div
              key={option}
              onClick={() => handleToggle(option)}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 ${
                (multiple && Array.isArray(value) && value.includes(option)) || 
                (!multiple && value === option)
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-700'
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};