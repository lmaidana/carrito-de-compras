import { useThemeContext } from "../../context/ThemeContext";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useThemeContext();

  const iconClass = `bi ${theme === "light" ? "bi-moon-fill" : "bi-sun-fill"}`;

  return (
    <button onClick={toggleTheme} className="theme-toggle-btn btn btn-outline-secondary">
      <i className={iconClass}></i>
    </button>
  );
}