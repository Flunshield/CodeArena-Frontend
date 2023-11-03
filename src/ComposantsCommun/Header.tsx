import { Link } from "react-router-dom";
import { useState } from "react";
import { NavRoute } from "../Interface/Interface";
// Assurez-vous que le chemin vers le logo est correct

const Header = () => {
    const [showPopup, setShowPopup] = useState(false);
    const navItems: NavRoute[] = [
        {
            route: "/",
            label: "Home",
            displayLink: true,
        },
        {
            route: "/",
            label: "PasHome",
            displayLink: true,
        },
    ];

    const NavList = () => (
        <ul className="flex flex-row">
            {navItems.map((item) => item.displayLink && (
                <li key={item.route} className="mr-2">
                    <Link to={item.route} onClick={() => setShowPopup(false)}>
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    );

    return (
        <header>
            <div>
                <p>header</p>
                {/* <div>
                    <Link to="/">
                        <img src={"logo"} alt="logo" />
                    </Link>
                </div> */}

                {showPopup ? (
                    <div className="fixed top-14 right-0 bg-black p-2 rounded shadow">
                        <NavList />
                    </div>
                ) : (
                    <NavList />
                )}
            </div>
        </header>
    );
};

export default Header;
