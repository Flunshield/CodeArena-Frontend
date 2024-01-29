import Card from "../../ComposantsCommun/Card.tsx";
import {userRangList} from "../../Interface/Interface.ts";
import {useTranslation} from "react-i18next";

interface UserRankProps {
    infosUserRank: userRangList | undefined;
}

function UserRank(value: UserRankProps): JSX.Element {
    const {t} = useTranslation();

    const infosUserRank = value.infosUserRank;
    return (
        <Card className="rounded-xl border-white h-auto mb-16">
            <div className=" bg-secondary text-white pt-3 pb-3">
                <p className="font-bold text-5xl text-center" id="title-yourRank">{t("yourRank")}</p>
                <div className="pr-10 pl-10 mt-10">
                    <div>
                        {infosUserRank?.usersAbove && infosUserRank?.usersAbove.map((element) => (
                            <div key={element.id} className="flex justify-between border-b-2 pt-6 pb-6">
                                <div className="flex ">
                                    <img src={element.user?.avatar ?? "src/assets/drapeaux/gb.png"}
                                         className="rounded-3xl w-10 h-10 mr-4"
                                         alt="photo de Profile"></img>
                                    <p className="truncate overflow-ellipsis w-64 mt-1">{element.user?.userName}</p>
                                </div>
                                <p className=" text-gray-500 font-bold">{element.points}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="flex justify-between pt-6 pb-6">
                            <div className="flex">
                                <img src={infosUserRank?.user?.user?.avatar ?? "src/assets/drapeaux/gb.png"}
                                     className="rounded-3xl w-10 h-10 mr-4" alt="photo de Profile"></img>
                                <p className=" truncate overflow-ellipsis w-64 font-bold mt-1">{infosUserRank?.user?.user?.userName}</p>
                            </div>
                            <p className="font-bold">{infosUserRank?.user.points}</p>
                        </div>
                    </div>
                    <div>
                        {infosUserRank?.usersBelow && infosUserRank?.usersBelow.map((element) => (
                            <div key={element.id} className="flex justify-between border-t-2 pt-6 pb-6">
                                <div className="mr-5 flex">
                                    <img src={element.user?.avatar ?? "src/assets/drapeaux/gb.png"}
                                         className="rounded-3xl w-10 h-10 mr-4"
                                         alt="photo de Profile"></img>
                                    <p className=" truncate overflow-ellipsis w-64 mt-1">{element.user?.userName}</p>
                                </div>
                                <p className=" text-gray-500 font-bold">{element.points}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </Card>
    )
}

export default UserRank