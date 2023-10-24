import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.svg"
const navigationItems = [
    {
        label: "Home",
        path: "/"
    },
    {
        label: "TV Shows",
        path: "/series"
    },
    {
        label: "Movies",
        path: "/movies"
    }
]

export default function () {
    const navigate = useNavigate();
    return (
        <ul className="flex h-10 p-2">
            <img className="mr-5" src={logo} />
            {navigationItems.map(({ label, path }) =>
                <li className="flex-1 mr-2" style={{ maxWidth: '8rem' }}>
                    <a className="text-center block pt-1 font-bold" onClick={() => { navigate(path) }}>
                        {label}
                    </a>
                </li>
            )}
        </ul>
    )
}