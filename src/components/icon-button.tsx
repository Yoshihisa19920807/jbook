interface IconButtonProps {
  icon: string;
  onClick: () => void;
  className?: string;
}
const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className,
}) => {
  return (
    <button
      className={`button is-primary is-small ${className}`}
      onClick={onClick}
    >
      <span className="icon">
        <i className={icon}></i>
      </span>
    </button>
  );
};
export default IconButton;
