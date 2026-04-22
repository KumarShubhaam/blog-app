import React, { useState } from 'react';

const OutlinedInput: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <div className="p-8 bg-white"> {/* Container background must match label background */}
      <div className="relative w-72">
        <input
          type="text"
          id="username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="peer w-full px-3 py-3 border border-gray-300 rounded-md outline-none focus:border-blue-600 transition-colors"
          placeholder="Username" // Required for the peer-placeholder-shown logic if adding animation
        />
        <label
          htmlFor="username"
          className="absolute left-2 -top-2.5 px-1 bg-white text-sm font-medium text-gray-600 transition-all 
                     peer-focus:text-blue-600 peer-focus:text-xs"
        >
          Username
        </label>
      </div>
    </div>
  );
};

export default OutlinedInput;
