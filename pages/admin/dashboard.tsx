import type { NextPage } from "next";
import { Layout } from "../../components/molecule";

export interface IdashboardProps {}

const dashboard: NextPage<IdashboardProps> = () => {
    return (
        <Layout className="bg-gray">
            dashboard
        </Layout>
    );
};
export default dashboard;
