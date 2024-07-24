import React from "react";

interface CardProps {
    className?: string;
    children?: React.ReactNode;
}

const Card = ({className = "card", children}: CardProps) => {
    return (
        <div
            className={`rounded-lg shadow-elevated overflow-hidden border border-gray-300 transition-all duration-300 transform  ${className}`}
        >
            {children}
        </div>
    )
}

export default Card
