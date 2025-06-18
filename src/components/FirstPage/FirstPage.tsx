import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronDown, Check, X, Edit } from 'lucide-react';
import { IFirstPageData } from '../../types/travelProgram.types.ts';
import { travelProgramService } from '../../services/travelProgram.service.ts';
import styles from './FirstPage.module.css';

interface FirstPageProps {
  firstPage: IFirstPageData;
  isLoggedIn: boolean;
  onScrollToDetails: () => void;
  programName: string | undefined;
}

const FirstPage: React.FC<FirstPageProps> = ({
  firstPage,
  isLoggedIn,
  onScrollToDetails,
  programName,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState<IFirstPageData>(firstPage);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditedValues(firstPage);
  }, [firstPage]);

  useEffect(() => {
    if (isEditing && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditing]);

  const handleFieldChange = useCallback((field: keyof IFirstPageData, value: string) => {
    setEditedValues(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleSave = useCallback(async () => {
    try {
      if (!programName) return;
      await travelProgramService.updateFirstPage(programName, editedValues);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating first page:', error);
    }
  }, [editedValues, programName]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setEditedValues(firstPage);
  }, [firstPage]);

  const renderEditableField = useCallback(
    (field: keyof IFirstPageData, className: string) => {
      if (!isLoggedIn) {
        return <div className={styles[className]}>{firstPage[field]}</div>;
      }

      if (isEditing) {
        return (
          <input
            ref={field === 'title' ? titleInputRef : null}
            type="text"
            value={editedValues[field]}
            onChange={e => handleFieldChange(field, e.target.value)}
            className={`${styles[className]} ${styles.editable}`}
          />
        );
      }

      return <div className={styles[className]}>{firstPage[field]}</div>;
    },
    [isLoggedIn, isEditing, editedValues, handleFieldChange, firstPage],
  );

  return (
    <section id="hero" className={styles.contentSection}>
      {isLoggedIn && (
        <div className={styles.editButtons}>
          <button
            onClick={() => {
              if (isLoggedIn) setIsEditing(true);
            }}
            title="Сохранить">
            <Edit size={16} />
          </button>
        </div>
      )}
      <div className={`${styles.contentWrapper} ${styles.heroContent}`}>
        <div className={styles.heroText}>
          {renderEditableField('title', 'heroTitle')}
          {renderEditableField('subtitle', 'heroSubtitle')}
        </div>
      </div>
      <div className={styles.scrollContainer}>
        {renderEditableField('footer', 'ctaText')}
        {isEditing && (
          <div className={styles.editButtons}>
            <button onClick={handleSave} className={styles.saveButton} title="Сохранить">
              <Check size={16} />
            </button>
            <button onClick={handleCancel} className={styles.cancelButton} title="Отмена">
              <X size={16} />
            </button>
          </div>
        )}
        <button onClick={onScrollToDetails} className={styles.scrollButton}>
          <ChevronDown className={styles.arrowDown} size={32} />
        </button>
      </div>
    </section>
  );
};

export default FirstPage;
