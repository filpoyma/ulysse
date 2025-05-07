import { FC } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { TravelProgram } from '../../types/travelProgram.types';
import styles from './AdminPanel.module.css';

interface ProgramsTableProps {
  programs: TravelProgram[];
  onProgramClick: (id: string) => void;
  onDeleteProgram: (id: string) => void;
}

const ProgramsTable: FC<ProgramsTableProps> = ({ 
  programs, 
  onProgramClick, 
  onDeleteProgram 
}) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Имя программы</th>
            <th>Дата создания</th>
            <th>Дата обновления</th>
            <th>Кол-во фоновых картинок</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program) => (
            <tr key={program._id}>
              <td>
                <span
                  className={styles.programName}
                  onClick={() => onProgramClick(program.name_eng)}
                >
                  {program.name}
                </span>
              </td>
              <td>{new Date(program.createdAt).toLocaleString()}</td>
              <td>{new Date(program.updatedAt).toLocaleString()}</td>
              <td>{program.bgImages?.length || 0}</td>
              <td>
                <div className={styles.actions}>
                  <button
                    className={styles.actionButton}
                    onClick={() => onProgramClick(program._id)}
                    title="Редактировать"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => onDeleteProgram(program._id)}
                    title="Удалить"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgramsTable; 