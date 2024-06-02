import React from "react";

interface AdministrationProps {
    setIsInformationGeneraleCliked: (value: boolean) => void;
    setIsHistoriqueOrderClicked: (value: boolean) => void;
    setIsSubmitted: () => void;
}

const Administration: React.FC<AdministrationProps> = ({
                                                           setIsInformationGeneraleCliked,
                                                           setIsHistoriqueOrderClicked,
                                                           setIsSubmitted,
                                                       }) => {
    function handleChangeAbonnement() {
        setIsInformationGeneraleCliked(true);
        setIsHistoriqueOrderClicked(false);
        setIsSubmitted();
    }

    function handleChangeHistoriqueOrder() {
        setIsInformationGeneraleCliked(false);
        setIsHistoriqueOrderClicked(true);
        setIsSubmitted();
    }

    const stats = [
        {
            id: 1,
            value: "Informations générales",
            onclick: () => handleChangeAbonnement()
        },
        {
            id: 2,
            value: "Historique d'achat",
            onclick: () => handleChangeHistoriqueOrder()
        }
    ];

    return (
        <div className="m-5 mb-52">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto w-full">
                {stats.map(stat => (
                    <div
                        key={stat.id}
                        className="bg-tertiari overflow-hidden shadow-lg rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
                        onClick={stat.onclick}
                    >
                        <div className="px-4 py-5 sm:p-6">
                            <p
                                className="text-xl font-semibold text-gray-900 text-center"
                                id={stat.value.toString()}
                            >
                                {stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Administration;