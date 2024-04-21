import clsx from "clsx";
import {User, userRangList, UserRanking} from "../../Interface/Interface.ts";
import React, {useEffect, useState} from "react";
import {useAuthContext} from "../../AuthContext.tsx";
import {useTranslation} from "react-i18next";
import {getElementByEndpoint} from "../../Helpers/apiHelper.ts";
import {NO_PHOTO} from "../../constantes/constantes.ts";
import Card from "../../ComposantsCommun/Card.tsx";

function Tableau(): JSX.Element {
    const authContext = useAuthContext();
    const {t} = useTranslation();
    const [username, setUsername] = useState<string>("");
    const [isFindWithUserName, setIsFindWithUserName] = useState<boolean>(false);
    const [infosUserRankWithUserName, setInfosUserRankWithUserName] = useState<userRangList>();
    const [infosUserRankWithoutUserName, setInfosUserRankWithoutUserName] = useState<User[]>();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const data = {username: username, token: authContext.accessToken ?? ""};
    let responsePromise;
    const user: User = infosUserRankWithUserName?.user ?? {};
    const usersBelow: UserRanking[] = infosUserRankWithUserName?.usersBelow ?? [];

    function searchUser(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            responsePromise = getElementByEndpoint("user/getUserRanking?userName=" + data.username, {
                token: data.token,
                data: data.username
            });
            if (username) {
                responsePromise.then(async (response) => {
                    const result = await response.json();
                    if (result?.usersBelow) {
                        setIsFindWithUserName(true);
                        setErrorMessage("")
                        setInfosUserRankWithUserName(result);
                    } else {
                        setIsFindWithUserName(false);
                        setErrorMessage(t("noUserWithUsername"))
                    }
                });
            } else if (!username) {
                setErrorMessage("")
                setIsFindWithUserName(false);
            }
        }
    }

    useEffect(() => {
        if (!infosUserRankWithoutUserName) {
            responsePromise = getElementByEndpoint("user/getUserRanking?userName=" + data.username, {
                token: data.token,
                data: data.username
            });
            responsePromise.then(async (response) => {
                const result = await response.json();
                setInfosUserRankWithoutUserName(result);
            });
        }
    }, []);
    return (
        <div className="m-5">
            <Card className="bg-secondary rounded-lg m-5">
                <div className="flex flex-col md:flex-row md:justify-between">
                    <p className="text-tertiari font-bold text-3xl m-10">{t("ranking")}</p>
                    <input
                        placeholder="Rechercher"
                        value={username}
                        onChange={(event) => searchUser(event)}
                        onKeyDown={(event) => handleKeyPress(event)} // Gérer l'événement onKeyDown
                        className="rounded-lg right-0 h-10 m-10 p-5"
                    />
                </div>
                <ul className="flex flex-col p-12">
                    <li className={clsx(errorMessage ? "border-b-2 mb-5" : "", "flex flex-row justify-between w-full border-tertiari p-5 text-tertiari uppercase mb-5 font-bold")}>
                        <p className="ml-5 hidden md:block">{t("avatar")}</p>
                        <p className="text-center">{t("userName")}</p>
                        <p className="text-center">{t("points")}</p>
                        <p className="mr-5 hidden lg:block">{t("rank")}</p>
                    </li>
                    {errorMessage &&
                        <div className="bg-zinc-400 text-black px-4 py-3 text-center rounded mb-5" role="alert">
                            <span className="block sm:inline"> {errorMessage}</span>
                        </div>
                    }
                    {isFindWithUserName ? (
                            <div>
                                <li className="flex flex-row justify-between border-t-2 border-tertiari text-center font-bold p-5 text-tertiari uppercase mb-5 lg:justify-between">
                                    <div className="hidden md:flex md:justify-center">
                                        <img src={user?.avatar ?? NO_PHOTO}
                                             className="rounded-full w-20 h-20" alt="avatar"></img>
                                    </div>
                                    <p className="mt-6 overflow-hidden text-center overflow-ellipsis w-1/2 md:w-1/3 lg:w-1/6">{user?.userName}</p>
                                    <p className="mt-6 overflow-hidden overflow-ellipsis text-center">{user?.userRanking?.map((elem) => elem.points)}</p>
                                    <p className="mt-4 md:1/6 lg:w-1/6 xl:w-1/12 hidden lg:block overflow-hidden overflow-ellipsis">{user?.userRanking?.map((elem) => elem.rankings?.title)}</p>
                                </li>
                                {usersBelow.map((elem: UserRanking, index: number) => (
                                    <li key={index}
                                        className="flex flex-row justify-between border-t-2 border-tertiari p-5 text-tertiari uppercase mb-5 lg:justify-between">
                                        <div className="hidden md:flex md:justify-center">
                                            <img src={elem.user?.avatar || NO_PHOTO}
                                                 className="rounded-full w-20 h-20" alt="avatar"></img>
                                        </div>
                                        <p className="mt-6 overflow-hidden text-center overflow-ellipsis w-1/2 md:w-1/3 lg:w-1/6">{elem.user?.userName}</p>
                                        <p className="mt-6 overflow-hidden overflow-ellipsis text-center">{elem.points}</p>
                                        <p className="mt-6 md:1/6 lg:w-1/6 xl:w-1/12 hidden lg:block overflow-hidden overflow-ellipsis">{elem.rankings?.title}</p>
                                    </li>
                                ))}
                            </div>)
                        : (
                            <div>
                                {infosUserRankWithoutUserName?.map((elem: UserRanking, index: number) => (
                                    <li key={index}
                                        className="flex flex-row justify-between border-t-2 border-tertiari p-5 text-tertiari uppercase mb-5 lg:justify-between">
                                        <div className="hidden md:flex md:justify-center">
                                            <img src={elem.user?.avatar || NO_PHOTO}
                                                 className="rounded-full w-20 h-20" alt="avatar"></img>
                                        </div>
                                        <p className="mt-6 overflow-hidden text-center overflow-ellipsis w-1/2 md:w-1/3 lg:w-1/6">{elem.user?.userName}</p>
                                        <p className="mt-6 overflow-hidden overflow-ellipsis text-center">{elem.points}</p>
                                        <p className="mt-6 md:1/6 lg:w-1/6 xl:w-1/12 hidden lg:block overflow-hidden overflow-ellipsis">{elem.rankings?.title}</p>
                                    </li>
                                ))}
                            </div>
                        )}
                </ul>
            </Card>
        </div>
    )
}

export default Tableau;