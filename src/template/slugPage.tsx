import type { NextPage } from 'next'

export interface IblockNameProps {
  slug: string;
}

const blockName: NextPage<IblockNameProps> = ({ slug }) =>{
  return (
    <section>
      blockName
    </section>
  );
}
blockName.getInitialProps = async ({ query }: any) => {
  const { slug } = query;
  return { slug };
}
export default blockName;