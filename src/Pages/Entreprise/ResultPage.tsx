import Layout from "../../ComposantsCommun/Layout.tsx";
import {useLocation} from "react-router-dom";
import playerNotHappy from "/assets/playerNotHappy.jpeg";
import partieTerminer from "/assets/partieTermine.jpeg";
import {useTranslation} from "react-i18next";

function ResultPage () {
    const location = useLocation();
    const {t} = useTranslation();
    const resultat = location.state.success;

    return (
        <Layout>
            <div className="flex items-center justify-center m-10">
                <div className="max-w-2xl w-full bg-secondary shadow-xl rounded-lg overflow-hidden">
                    {resultat ? (
                        <div className="text-center p-8 text-tertiari">
                            <h1 className="text-3xl md:text-4xl font-bold">{t('testFinish')}</h1>
                            <p className="mt-2 text-lg">{t('companyRecontact')}</p>
                            <img src={partieTerminer} alt="Test terminé"
                                 className="w-full mt-6 rounded-lg shadow-sm shadow-tertiari"/>
                        </div>
                    ) : (
                        <div className="text-center p-8 text-tertiari">
                            <h1 className="text-3xl md:text-4xl font-bold">{t('testPassedYet')}</h1>
                            <img src={playerNotHappy} alt="Test déjà passé" className="w-full mt-6 rounded-lg"/>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default ResultPage;
