import { FC } from 'react';
import { Plus } from 'lucide-react';
import styles from '../AdminPanel.module.css';

interface SectionHeaderProps {
  title: string;
  onCreateClick: () => void;
  isCreating?: boolean;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ 
  title, 
  onCreateClick, 
  isCreating = false 
}) => {
  return (
    <div className={styles.header}>
      <h2>{title}</h2>
      <button
        className={styles.createButton}
        onClick={onCreateClick}
        disabled={isCreating}
      >
        <Plus size={20} />
        {title === 'Список программ путешествий' ? 'Создать программу' : 'Создать отель'}
      </button>
    </div>
  );
}; 