import Layout from "../ComposantsCommun/Layout.tsx";
import { Event, userRangList, News } from "../Interface/Interface.ts";
import { useAuthContext } from "../AuthContext.tsx";
import { JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";
import { getElementByEndpoint } from "../Helpers/apiHelper.ts";
import TableauEvent from "../Composants/dashboard/TableauEvent.tsx";
import UserRank from "../Composants/dashboard/UserRank.tsx";
import { FadeIn, FadeInStagger } from "../ComposantsCommun/FadeIn.tsx";
import { Container } from "../ComposantsCommun/Container.tsx";
import { SectionIntro } from "../ComposantsCommun/SectionIntro";
import Button from "../ComposantsCommun/Button.tsx";
import { useNavigate } from "react-router-dom";
import TableauNews, { getNewsData } from "../Composants/dashboard/News.tsx";
import { useTranslation } from "react-i18next";  // Import de useTranslation


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
                <SectionIntro title="Dashboard">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <p className="mb-4 md:mb-0">Bienvenue sur votre tableau de bord, où vous pouvez voir vos événements, classements et tournois.</p>
                        <Button className="bg-primary text-secondary rounded-lg py-3 px-6 shadow-lg hover:bg-yellow-500" type="button" id="game" onClick={() => { navigate("/ranked") }}>
                            Jouez Maintenant
                        </Button>
                    </div>
                </SectionIntro>
                <FadeInStagger className="mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 w-full">
                    <FadeIn className="lg:col-span-2 xl:col-span-2">
                        <TableauNews newsData={newsData} />
                    </FadeIn>
                    <FadeIn className="lg:col-span-2 xl:col-span-1">
                        <UserRank infosUserRank={infosUserRank} />
                    </FadeIn>
                    <FadeIn className="col-span-1 lg:col-span-2 xl:col-span-3 mb-4">
                        <TableauEvent infosEvents={infosEvents} isImg={false} />
                    </FadeIn>
                </FadeInStagger>
            </Container>
        </Layout>
    );
}

export default Dashboard;
