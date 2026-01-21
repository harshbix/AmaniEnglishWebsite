interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverable = false,
  onClick,
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 ${
        hoverable ? "hover:shadow-lg transition-shadow cursor-pointer" : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
