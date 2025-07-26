import { useParams } from 'react-router-dom';

const Info = () => {
  const { name } = useParams();
  return <div>Info Page {name}</div>;
};

export default Info;
