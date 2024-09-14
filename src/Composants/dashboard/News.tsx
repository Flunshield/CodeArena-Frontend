// Path: src/Components/TableauNews.tsx

import { News } from "../../Interface/Interface.ts";
import Card from "../../ComposantsCommun/Card.tsx";
import CardContent from "../../ComposantsCommun/CardContent.tsx";
import { useTranslation } from "react-i18next";
import { FadeIn, FadeInStagger } from "../../ComposantsCommun/FadeIn.tsx";
import { Container } from "../../ComposantsCommun/Container.tsx";

interface TableauNewsProps {
    newsData?: News[]; 
    className?: string;
}

export const getNewsData = (t: (key: string) => string): News[] => [
    {
        title: t("title1"),
        date: "2024-08-15",
        description: t("description1"),
    },
    {
        title: t("title2"),
        date: "2024-08-10",
        description: t("description2"),
    },
    {
        title: t("title3"),
        date: "2024-07-25",
        description: t("description3"),
    },
];

function TableauNews({ newsData, className }: TableauNewsProps) {
    const { t } = useTranslation();  // Initialisation de la fonction de traduction

    // Si newsData n'est pas fourni, utilisez getNewsData pour obtenir les données par défaut
    const news = newsData || getNewsData(t);

    return (
        <Container className="px-4 md:px-8 lg:px-12">
            <Card className={`rounded-xl shadow-lg ${className}`}>
                <CardContent className="bg-secondary text-tertiari text-center pb-6">
                    <p className="font-bold text-xl sm:text-2xl lg:text-5xl" id="title-news">{t("news")}</p>
                </CardContent>
                {news && news.length > 0 ? (
                    <FadeInStagger className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:grid-cols-3">
                        {news.map((item, index) => (
                            <FadeIn key={index} className="flex flex-col items-center">
                                <Card className="bg-tertiari rounded-xl m-3 sm:m-5 border-tertiary shadow-md w-full">
                                    <CardContent className="text-secondary p-5">
                                        <div className="flex flex-col items-center">
                                            <p className="font-bold text-xl sm:text-2xl mb-3 sm:mb-5">{item.title}</p>
                                            <p className="mb-2 sm:mb-3">{item.date}</p>
                                            <p className="text-secondary text-justify text-sm sm:text-base">{item.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </FadeIn>
                        ))}
                    </FadeInStagger>
                ) : (
                    <CardContent className="bg-secondary text-tertiari border-2 rounded-lg m-5 flex justify-center items-center">
                        <p className="text-xl sm:text-2xl font-bold mb-5 sm:mb-10 mt-5 sm:mt-10">{t("noNews")}</p>
                    </CardContent>
                )}
            </Card>
        </Container>
    );
}

export default TableauNews;
