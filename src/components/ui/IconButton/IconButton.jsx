import "./IconButton.css";

export default function IconButton({
  icon,
  onClick,
  className = "",
  ...props
}) {
  return (
    <button className={`icon-btn ${className}`} onClick={onClick} {...props}>
      <ion-icon name={icon}></ion-icon>
    </button>
  );
}
