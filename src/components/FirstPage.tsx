import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';
import { IFirstPageData } from '../types/travelProgram.types';
import './FirstPage.css';
import { travelProgramService } from '../services/travelProgram.service.ts';

type EditableField = keyof IFirstPageData;

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
  const [editingField, setEditingField] = useState<EditableField | null>(null);
  const [editedValues, setEditedValues] = useState<IFirstPageData>(firstPage);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditedValues(firstPage);
  }, [firstPage]);

  useEffect(() => {
    if (editingField && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingField]);

  const handleFieldChange = useCallback((field: EditableField, value: string) => {
    setEditedValues(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleSave = useCallback(async () => {
    try {
      if (!programName) return;
      await travelProgramService.updateFirstPage(programName, editedValues);
      setEditingField(null);
    } catch (error) {
      console.error('Error updating first page:', error);
    }
  }, [editedValues]);

  const handleCancel = useCallback(() => {
    setEditingField(null);
    setEditedValues(firstPage);
  }, [firstPage]);

  const renderEditableField = useCallback(
    (field: EditableField, className: string) => {
      if (!isLoggedIn) {
        return <div className={className}>{firstPage[field]}</div>;
      }

      if (editingField === field) {
        return (
          <div className={`${className}-edit`}>
            <input
              ref={inputRef}
              type="text"
              value={editedValues[field]}
              onChange={e => handleFieldChange(field, e.target.value)}
              className={`${className} editable`}
            />
            <div className="edit-buttons">
              <button onClick={handleSave} className="save-button" title="Сохранить">
                <Check size={36} />
              </button>
              <button onClick={handleCancel} className="cancel-button" title="Отмена">
                <X size={36} />
              </button>
            </div>
          </div>
        );
      }

      return (
        <div className={className} onClick={() => setEditingField(field)}>
          {firstPage[field]}
        </div>
      );
    },
    [
      isLoggedIn,
      editingField,
      editedValues,
      handleFieldChange,
      handleSave,
      handleCancel,
      firstPage,
    ],
  );

  return (
    <section id="hero" className="content-section">
      <div className="content-wrapper hero-content">
        <div className="hero-text">
          {renderEditableField('title', 'hero-title')}
          {renderEditableField('subtitle', 'hero-subtitle')}
        </div>
      </div>
      <div className="scroll-container">
        {renderEditableField('footer', 'cta-text')}
        <button onClick={onScrollToDetails} className="scroll-button">
          <ChevronDown className="arrow-down" size={32} />
        </button>
      </div>
    </section>
  );
};

export default FirstPage;
