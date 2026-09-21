import "./IconButton.css";
import IonIcon from "@reacticons/ionicons";

export default function IconButton({
  icon,
  onClick,
  className = "",
  fontSize = "23px",
  ...props
}) {
  return (
    <button className={`icon-btn ${className}`} onClick={onClick} {...props}>
      <IonIcon name={icon} style={{ fontSize: fontSize }}></IonIcon>
    </button>
  );
}
