import React from "react";

interface ListItemProps {
    icon: string;
    id: string;
    text: string;
}

const ListItem: React.FC<ListItemProps> = ({ icon, id, text }) => {
    return (
        <li className="flex flex-row mb-2 md:mr-14 lg:mr-0">
            <img src={icon} alt={id} className="w-6 h-6 mr-2" />
            <p id={id} className="bg-primary text-tertiary p-2 rounded-md">{text}</p>
        </li>
    );
};

export default ListItem;
