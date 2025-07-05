
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../store/selectors.ts';
import { NavItem } from '../../../types/adminPanel.types.ts';

const EditButton = ({
  restaurantListId,
  restaurantId,
}: {
  restaurantListId?: string;
  restaurantId?: string;
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const tab: NavItem = restaurantId ? 'restaurants-collections' : 'restaurants-pages';
  const id = restaurantId || restaurantListId;
  return (
    <div>
      {isLoggedIn ? (
        <Link to={`/admin/?tab=${tab}&id=${id}`} className={styles.editButton}>
          ✎
        </Link>
      ) : null}
    </div>
  );
};

export default EditButton;
