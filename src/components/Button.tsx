import React from 'react';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'large' | 'medium';
};

/**
 * Button Component.
 *
 * A reusable button component that supports
 * multiple variants and sizes. It follows the
 * Tailwind CSS design system, allowing easy
 * integration and customization in your project.
 *
 * @param {string} label - The text displayed on
 *   the button.
 * @param {() => void} [onClick] - Optional
 *   callback function triggered on button click.
 * @param {boolean} [disabled=false] - If true,
 *   the button is disabled and styled
 *   accordingly. Default is `false`
 * @param {'primary'
 *   | 'secondary'
 *   | 'tertiary'} [variant="primary"]
 *   - Defines the button style variant. Default is
 *       `"primary"` Default is `"primary"`
 *       Default is `"primary"` Default is
 *       `"primary"` Default is `"primary"`
 *       Default is `"primary"`
 *
 * @param {'large' | 'medium'} [size="medium"] -
 *   Specifies the size of the button. Default is
 *   `"medium"`
 * @returns {JSX.Element} A styled button element.
 */
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'medium',
}) => {
  // Base styles for maintaining consistency across all buttons.
  const baseStyles =
    'flex items-center justify-center font-bold rounded-lg text-center focus:outline-none';

  // Adjust padding and text size based on the size prop (large or medium).
  const sizeStyles =
    size === 'large' ?
      'py-4 px-8 text-lg'
    : 'py-2 px-4 text-sm';

  // Define styles for each button variant (primary, secondary, tertiary) and handle the disabled state.
  const variantStyles = {
    primary: `bg-button text-buttonText hover:bg-buttonHover focus-visible:ring-2 focus-visible:ring-highlight ${disabled ? 'bg-gray-400' : ''}`,
    secondary: `bg-white border border-buttonText text-buttonText hover:bg-secondary focus-visible:ring-2 focus-visible:ring-highlight ${disabled ? 'border-gray-400 text-gray-400' : ''}`,
    tertiary: `text-buttonText underline hover:text-headlineHover ${disabled ? 'text-gray-400' : ''}`,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles} ${variantStyles[variant]}`}
    >
      {label}
    </button>
  );
};

export default Button;
