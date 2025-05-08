import { FC, RefObject } from "react";
import { Edit, Trash2, Check, X } from "lucide-react";
import styles from "../AdminPanel.module.css";
import { RestaurantApiModel } from "../../../api/restaurant.api";

interface Props {
  restaraunts: RestaurantApiModel[];
  isCreatingRestaraunt?: boolean;
  newRestaraunt?: Partial<RestaurantApiModel>;
  onNewRestarauntChange?: (field: keyof RestaurantApiModel, value: string | number) => void;
  onSaveNewRestaraunt?: () => void;
  onCancelNewRestaraunt?: () => void;
  nameInputRef?: RefObject<HTMLInputElement>;
  editingRestarauntId?: string | null;
  editingRestarauntData?: Partial<RestaurantApiModel>;
  onRestarauntClick?: (id: string) => void;
  onEditRestarauntChange?: (field: keyof RestaurantApiModel, value: string | number) => void;
  onSaveEditRestaraunt?: () => void;
  onCancelEditRestaraunt?: () => void;
  onDeleteRestaraunt?: (id: string) => void;
}

const RestarauntsCollectTable: FC<Props> = ({
  restaraunts,
  isCreatingRestaraunt = false,
  newRestaraunt = {},
  onNewRestarauntChange,
  onSaveNewRestaraunt,
  onCancelNewRestaraunt,
  nameInputRef,
  editingRestarauntId,
  editingRestarauntData = {},
  onRestarauntClick,
  onEditRestarauntChange,
  onSaveEditRestaraunt,
  onCancelEditRestaraunt,
  onDeleteRestaraunt,
}) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Название</th>
            <th>Страна</th>
            <th>Город</th>
            <th>Регион</th>
            <th>Менеджер</th>
            <th>Звёзды</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {isCreatingRestaraunt && (
            <tr className={styles.hotelCreateRow}>
              <td>
                <input
                  ref={nameInputRef}
                  className={styles.hotelCreateInput}
                  type="text"
                  value={newRestaraunt.name || ""}
                  onChange={e => onNewRestarauntChange && onNewRestarauntChange("name", e.target.value)}
                  placeholder="Название"
                />
              </td>
              <td>
                <input
                  className={styles.hotelCreateInput}
                  type="text"
                  value={newRestaraunt.country || ""}
                  onChange={e => onNewRestarauntChange && onNewRestarauntChange("country", e.target.value)}
                  placeholder="Страна"
                />
              </td>
              <td>
                <input
                  className={styles.hotelCreateInput}
                  type="text"
                  value={newRestaraunt.city || ""}
                  onChange={e => onNewRestarauntChange && onNewRestarauntChange("city", e.target.value)}
                  placeholder="Город"
                />
              </td>
              <td>
                <input
                  className={styles.hotelCreateInput}
                  type="text"
                  value={newRestaraunt.region || ""}
                  onChange={e => onNewRestarauntChange && onNewRestarauntChange("region", e.target.value)}
                  placeholder="Регион"
                />
              </td>
              <td>
                <input
                  className={styles.hotelCreateInput}
                  type="text"
                  value={newRestaraunt.manager || ""}
                  onChange={e => onNewRestarauntChange && onNewRestarauntChange("manager", e.target.value)}
                  placeholder="Менеджер"
                />
              </td>
              <td>
                <input
                  className={styles.hotelCreateInput}
                  type="number"
                  min={1}
                  max={5}
                  value={newRestaraunt.stars || 1}
                  onChange={e => onNewRestarauntChange && onNewRestarauntChange("stars", Number(e.target.value))}
                  placeholder="Звёзды"
                />
              </td>
              <td>
                <div className={styles.actions}>
                  <button className={styles.actionButton} onClick={onSaveNewRestaraunt} title="Сохранить">
                    <Check size={16} />
                  </button>
                  <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={onCancelNewRestaraunt} title="Отмена">
                    <X size={16} />
                  </button>
                </div>
              </td>
            </tr>
          )}
          {restaraunts.map(r =>
            editingRestarauntId === r._id ? (
              <tr key={r._id} className={styles.hotelCreateRow}>
                <td>
                  <input
                    ref={nameInputRef}
                    className={styles.hotelCreateInput}
                    type="text"
                    value={editingRestarauntData.name || ""}
                    onChange={e => onEditRestarauntChange && onEditRestarauntChange("name", e.target.value)}
                    placeholder="Название"
                  />
                </td>
                <td>
                  <input
                    className={styles.hotelCreateInput}
                    type="text"
                    value={editingRestarauntData.country || ""}
                    onChange={e => onEditRestarauntChange && onEditRestarauntChange("country", e.target.value)}
                    placeholder="Страна"
                  />
                </td>
                <td>
                  <input
                    className={styles.hotelCreateInput}
                    type="text"
                    value={editingRestarauntData.city || ""}
                    onChange={e => onEditRestarauntChange && onEditRestarauntChange("city", e.target.value)}
                    placeholder="Город"
                  />
                </td>
                <td>
                  <input
                    className={styles.hotelCreateInput}
                    type="text"
                    value={editingRestarauntData.region || ""}
                    onChange={e => onEditRestarauntChange && onEditRestarauntChange("region", e.target.value)}
                    placeholder="Регион"
                  />
                </td>
                <td>
                  <input
                    className={styles.hotelCreateInput}
                    type="text"
                    value={editingRestarauntData.manager || ""}
                    onChange={e => onEditRestarauntChange && onEditRestarauntChange("manager", e.target.value)}
                    placeholder="Менеджер"
                  />
                </td>
                <td>
                  <input
                    className={styles.hotelCreateInput}
                    type="number"
                    min={1}
                    max={5}
                    value={editingRestarauntData.stars || 1}
                    onChange={e => onEditRestarauntChange && onEditRestarauntChange("stars", Number(e.target.value))}
                    placeholder="Звёзды"
                  />
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionButton} onClick={onSaveEditRestaraunt} title="Сохранить">
                      <Check size={16} />
                    </button>
                    <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={onCancelEditRestaraunt} title="Отмена">
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              <tr key={r._id}>
                <td>{r.name}</td>
                <td>{r.country}</td>
                <td>{r.city}</td>
                <td>{r.region}</td>
                <td>{r.manager}</td>
                <td>{r.stars}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionButton} onClick={() => onRestarauntClick && onRestarauntClick(r._id)} title="Редактировать">
                      <Edit size={16} />
                    </button>
                    <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={() => onDeleteRestaraunt && onDeleteRestaraunt(r._id)} title="Удалить">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RestarauntsCollectTable; 