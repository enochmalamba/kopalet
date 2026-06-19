import { useTheme } from "../context/themeContext";
import logoDark from "../assets/images/logo_dark.png";
import logoLight from "../assets/images/logo_light.png";

export default function Logo({
  variant = "symbol",
  size = 32,
  style,
  className,
}) {
  const { resolvedTheme } = useTheme();

  const src = resolvedTheme === "dark" ? logoLight : logoDark;

  return (
    <img
      src={src}
      alt="CAB logo"
      height={size}
      style={{ display: "block", objectFit: "contain", ...style }}
      className={className}
    />
  );
}
