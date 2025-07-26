import { useParams } from 'react-router-dom';

const References = () => {
  const { name } = useParams();
  return <div>References Page {name}</div>;
};

export default References;
