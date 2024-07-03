// Modal.js

import { XMarkIcon } from '@heroicons/react/16/solid';
import React from 'react';
type TBsnModal = { isOpen: boolean,
  title?: string,
  description?: string,
  onClose:() => void,
  children: React.ReactNode
}
const BsnModal = ({ isOpen, onClose, children,description,title }:TBsnModal) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] overflow-auto">
          <div className='mb-4'>
            {title && <h2 className="text-xl font-semibold mb-0">{title}</h2>}
            {description && <p className='my-0 text-sm'>{description}</p>}
          </div>
          <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
            <XMarkIcon width={30}  />
          </button>
          <div className=''>
            {children}
          </div>
      </div>
    </div>
  );
};

export default BsnModal;
