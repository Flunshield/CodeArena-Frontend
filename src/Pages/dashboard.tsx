import Layout from "../ComposantsCommun/Layout.tsx";
import { Event, userRangList, News } from "../Interface/Interface.ts";
import { useAuthContext } from "../AuthContext.tsx";
import { JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";
import { getElementByEndpoint } from "../Helpers/apiHelper.ts";
import UserRank from "../Composants/dashboard/UserRank.tsx";
import { FadeIn, FadeInStagger } from "../ComposantsCommun/FadeIn.tsx";
import { Container } from "../ComposantsCommun/Container.tsx";
import { SectionIntro } from "../ComposantsCommun/SectionIntro";
import Button from "../ComposantsCommun/Button.tsx";
import { useNavigate } from "react-router-dom";
import TableauNews, { getNewsData } from "../Composants/dashboard/News.tsx";
import { useTranslation } from "react-i18next";  // Import de useTranslation
import TableauEvent from "../Composants/event/TableauEvent.tsx";


function Dashboard() {
    const { t } = useTranslation();  // Récupération de la fonction t pour la traduction
    const authContext = useAuthContext();
    const [infosUserRank, setInfosUserRank] = useState<userRangList>();
    const [infosEvents, setInfosEvents] = useState<Event[]>([]);
    const [newsData, setNewsData] = useState<News[]>([]);
    const infosUser = authContext?.infosUser as JwtPayload;
    const userId = infosUser?.sub as unknown as number;
    const data = { id: userId, token: authContext.accessToken ?? "" };
    const responsePromise = getElementByEndpoint('dashboard/checkDashboard?id=' + data.id, { token: data.token, data: "" });
    const navigate = useNavigate();

    useEffect(() => {
        if (!infosUserRank) {
            responsePromise.then(async (response) => {
                const result = await response.json();
                setInfosUserRank(result.userRanking);
                setInfosEvents(result.events);
                setNewsData(getNewsData(t));  // Appel de getNewsData avec la fonction t pour obtenir les données traduites
            });
        }
    }, [infosUserRank]);

    return (
        <Layout>
            <Container className="mt-12">
                <SectionIntro title={t("Dashboard")}>
                    <div className="flex flex-col items-center justify-between mb-8 md:flex-row">
                        <p className="mb-4 md:mb-0">{t("Welcome")}</p>
                        <Button className="px-6 py-3 rounded-lg shadow-lg bg-primary text-secondary hover:bg-yellow-500" type="button" id="game" onClick={() => { navigate("/ranked") }}>
                            {t("Jouez")}
                        </Button>
                    </div>
                </SectionIntro>
                <FadeInStagger className="grid w-full grid-cols-1 gap-10 mt-10 lg:grid-cols-2 xl:grid-cols-3">
                    <FadeIn className="lg:col-span-2 xl:col-span-2">
                        <TableauNews newsData={newsData} />
                    </FadeIn>
                    <FadeIn className="lg:col-span-2 xl:col-span-1">
                        <UserRank infosUserRank={infosUserRank} />
                    </FadeIn>
                    <FadeIn className="col-span-1 mb-4 lg:col-span-2 xl:col-span-3">
                        <TableauEvent infosEvents={infosEvents} isImg={false} />
                    </FadeIn>
                </FadeInStagger>
            </Container>
        </Layout>
    );
}

export default Dashboard;
