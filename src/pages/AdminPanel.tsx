import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn } from '../store/selectors';
import { travelProgramService } from '../services/travelProgram.service';
import AdminLogin from './AdminLogin/AdminLogin';
import CreateTemplateModal from '../components/CreateTemplateModal/CreateTemplateModal';
import { travelProgramActions } from '../store/reducers/travelProgram';

const AdminPanel = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      travelProgramService.getAll()
        .then((data) => setPrograms((data as any).data || []))
        .finally(() => setLoading(false));
    }
  }, [isLoggedIn]);

  const handleCreateTemplate = () => setIsModalOpen(true);

  const handleCreateTemplateSubmit = async (name: string) => {
    try {
      await travelProgramService.createTemplate(name);
      setIsModalOpen(false);
      const data = await travelProgramService.getAll();
      setPrograms((data as any).data || []);
    } catch {
      alert('Ошибка создания шаблона');
    }
  };

  const handleProgramClick = async (id: string) => {
    try {
      const res = await travelProgramService.getById(id);
      if (res && res.data) {
        dispatch(travelProgramActions.setProgram(res.data));
      }
    } catch {
      alert('Ошибка загрузки программы');
    }
  };

  if (!isLoggedIn) {
    return <AdminLogin />;
  }

  return (
    <div style={{ padding: 32 }}>
      <CreateTemplateModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTemplateSubmit}
      />
      <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Список программ
        <button onClick={handleCreateTemplate}>Создать travel-program-template</button>
      </h2>
      {loading ? (
        <div>Загрузка...</div>
      ) : (
        <table border={1} cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <th>Имя программы</th>
              <th>Дата создания</th>
              <th>Дата обновления</th>
              <th>Кол-во фоновых картинок</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((p) => (
              <tr key={p._id}>
                <td>
                  <span
                    style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => handleProgramClick(p._id)}
                  >
                    {p.name}
                  </span>
                </td>
                <td>{new Date(p.createdAt).toLocaleString()}</td>
                <td>{new Date(p.updatedAt).toLocaleString()}</td>
                <td>{p.bgImages?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel; 