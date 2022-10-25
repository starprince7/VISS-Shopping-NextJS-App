import type { NextPage } from "next";
import { Layout } from "../../components/molecule";

export interface IdashboardProps {}

const dashboard: NextPage<IdashboardProps> = () => {
    return (
        <section>
            <Layout>dashboard</Layout>
        </section>
    );
};
export default dashboard;
