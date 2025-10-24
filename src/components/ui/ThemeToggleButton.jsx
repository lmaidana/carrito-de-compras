import { useThemeContext } from "../../context/ThemeContext";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useThemeContext();

  const buttonStyle = {
    padding: '0.4em 0.8em',
    fontSize: '0.8em',
    borderRadius: '6px',
    backgroundColor: theme === 'dark' ? '#ffffff' : '#222222',
    color: theme === 'dark' ? '#222222' : '#ffffff',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const iconClass = `bi ${theme === 'light' ? 'bi-moon-fill' : 'bi-sun-fill'}`;

  return (
    <button onClick={toggleTheme} style={buttonStyle}>
      <i className={iconClass}></i>
    </button>
  );
}