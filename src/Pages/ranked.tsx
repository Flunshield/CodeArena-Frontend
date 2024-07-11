
import Layout from "../ComposantsCommun/Layout";
import { Container } from '../ComposantsCommun/Container';
import Card from '../ComposantsCommun/Card';
import clsx from "clsx";
import Explanation from '../Composants/ranked/Explanation';

const Ranked = () => {

    return (
        <Layout>

            <Container className="py-20">
                <Card className={clsx("rounded-xl shadow-lg p-6")}>

                    <Explanation />
                </Card>

            </Container>
        </Layout>
    );
};

export default Ranked;
