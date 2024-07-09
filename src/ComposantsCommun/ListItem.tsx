import React from "react";

interface ListItemProps {
    icon: string;
    id: string;
    text: string;
}

const ListItem: React.FC<ListItemProps> = ({ icon, id, text }) => {
    return (
        <li className="flex flex-row mb-2 lg:mr-0 items-center">
            <img src={icon} alt={id} className="w-6 h-6 mr-2" />
            <p id={id} className="bg-quaternary text-primary p-2 rounded-md w-60 break-words ml-2 mr-10 shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                {text}
            </p>
        </li>
    );
};

export default ListItem;
