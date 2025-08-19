import React from 'react';

const Checkbox = ({
    id,
    label,
    checked,
    onChange,
    disabled = false,
    readonly = false,
    colSpan = 2 }) => {
    return (
        <div className={`sm:col-span-${colSpan}`}>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                readOnly={readonly}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            {label && (
                <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {label}
                </label>
            )}
        </div>
    );
};

export default Checkbox;