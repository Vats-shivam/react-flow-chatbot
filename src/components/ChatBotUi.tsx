import React from "react";

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  className = "",
  ...props
}) => {
  const baseStyles =
    "font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary: "bg-gray-800 hover:bg-gray-700 text-white focus:ring-gray-600",
    secondary:
      "bg-gray-300 hover:bg-gray-400 text-gray-800 focus:ring-gray-500",
    outline:
      "bg-transparent border border-gray-300 hover:bg-gray-200 text-gray-800 focus:ring-gray-500",
  };

  const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

// Message Component
interface MessageProps {
  content: string;
  isUser?: boolean;
}

export const Message: React.FC<MessageProps> = ({ content }) => (
  <div className="h-fit bg-gray-700 text-white rounded-lg shadow-md py-2 px-4">
    {content}
  </div>
);

// Action Button Component
interface ActionButtonProps {
  label: string;
  onClick: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick }) => (
  <Button onClick={onClick} className="mt-2 w-2/3 min-w-[3rem] p-2">
    {label}
  </Button>
);

// Media Component
export const Media = ({ content }: { content: string }) => (
  <img src={content} alt="media-content" className="rounded-lg shadow-md size-48" />
);

// Link Component
export const Link = ({ content }: { content: string }) => (
  <a href={content}>
    <Button size={"small"} variant="outline">
      Click Here
    </Button>
  </a>
);

// Question with Options Component
interface QuestionProps {
  question: string;
  options: Array<{
    label: string;
    onClick: () => void;
  }>;
}

export const Question: React.FC<QuestionProps> = ({ question, options }) => (
  <div className="mt-4">
    <Message content={question} />
    <div className="mt-2 space-y-2">
      {options.map((option, index) => (
        <ActionButton
          key={index}
          label={option.label}
          onClick={option.onClick}
        />
      ))}
    </div>
  </div>
);
