import { useParams } from 'react-router-dom';

const InfoSection = () => {
  const { name } = useParams();
  return <div>AdminInfoSection {name}</div>;
};

export default InfoSection;
