'use client'
type IconProps = React.SVGProps<SVGSVGElement>;
import { useTheme } from "next-themes";

const ThemeToggle = () => {
    const { setTheme } = useTheme()
    const currentTheme = localStorage.getItem('theme')
    if (!currentTheme) {
        setTheme('system');
    }
    return (
        <div className="ml-3 cursor-pointer">
            {currentTheme === "light" ? <MoonIcon
                onClick={() => setTheme('dark')}
                className="" /> : <SunIcon
                onClick={() => setTheme('light')}
                className="" />}
        </div>
    );
};

export default ThemeToggle;
function MoonIcon(props: IconProps) {
    console.log(props)
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
    )
}

function SunIcon(props: IconProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
        </svg>
    )
}
