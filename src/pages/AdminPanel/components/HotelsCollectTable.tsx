import { FC, RefObject } from "react";
import { Edit, Trash2, Check, X, ChevronDown, ChevronUp } from "lucide-react";
import styles from "../AdminPanel.module.css";
import { HotelApiModel } from "../../../api/hotel.api.ts";
import dayjs from "dayjs";
import { CountryAutocomplete } from "../../../components/CountryAutocomplete/CountryAutocomplete";

interface HotelsTableProps {
  hotels: HotelApiModel[];
  onHotelClick: (id: string) => void;
  onDeleteHotel: (id: string) => void;
  isCreatingHotel?: boolean;
  newHotel?: Partial<HotelApiModel>;
  onNewHotelChange?: (field: keyof HotelApiModel, value: string) => void;
  onSaveNewHotel?: () => void;
  onCancelNewHotel?: () => void;
  nameInputRef?: RefObject<HTMLInputElement>;
  editingHotelId?: string | null;
  editingHotelData?: Partial<HotelApiModel>;
  onEditHotelChange?: (field: keyof HotelApiModel, value: string) => void;
  onSaveEditHotel?: () => void;
  onCancelEditHotel?: () => void;
  sortField?: keyof HotelApiModel;
  sortOrder?: "asc" | "desc";
  onSort?: (field: keyof HotelApiModel) => void;
}

const HotelsTable: FC<HotelsTableProps> = ({
  hotels,
  onHotelClick,
  onDeleteHotel,
  isCreatingHotel = false,
  newHotel = {},
  onNewHotelChange,
  onSaveNewHotel,
  onCancelNewHotel,
  nameInputRef,
  editingHotelId,
  editingHotelData = {},
  onEditHotelChange,
  onSaveEditHotel,
  onCancelEditHotel,
  sortField,
  sortOrder,
  onSort,
}) => {
  const renderSortIcon = (field: keyof HotelApiModel) => {
    if (!sortField || sortField !== field) return null;
    return sortOrder === "asc" ? (
      <ChevronUp size={16} className={styles.sortArrow} />
    ) : (
      <ChevronDown size={16} className={styles.sortArrow} />
    );
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th
              onClick={() => onSort && onSort("name")}
              style={{ cursor: "pointer", minWidth: 120 }}
            >
              Название
              <span className={styles.sortArrow}>{renderSortIcon("name")}</span>
            </th>
            <th
              onClick={() => onSort && onSort("country")}
              style={{ cursor: "pointer", minWidth: 100 }}
            >
              Страна
              <span className={styles.sortArrow}>
                {renderSortIcon("country")}
              </span>
            </th>
            <th
              onClick={() => onSort && onSort("type")}
              style={{ cursor: "pointer", minWidth: 100 }}
            >
              Тип
              <span className={styles.sortArrow}>{renderSortIcon("type")}</span>
            </th>
            <th
              onClick={() => onSort && onSort("region")}
              style={{ cursor: "pointer", minWidth: 100 }}
            >
              Регион
              <span className={styles.sortArrow}>
                {renderSortIcon("region")}
              </span>
            </th>
            <th
              onClick={() => onSort && onSort("createdAt")}
              style={{ cursor: "pointer", minWidth: 120 }}
            >
              Дата создания
              <span className={styles.sortArrow}>
                {renderSortIcon("createdAt")}
              </span>
            </th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {isCreatingHotel && (
            <tr className={styles.hotelCreateRow}>
              <td>
                <input
                  ref={nameInputRef}
                  className={styles.hotelCreateInput}
                  type="text"
                  value={newHotel.name || ""}
                  onChange={(e) =>
                    onNewHotelChange && onNewHotelChange("name", e.target.value)
                  }
                  placeholder="Название"
                />
              </td>
              <td>
                <CountryAutocomplete
                  value={newHotel.country || ""}
                  onChange={(value) => onNewHotelChange && onNewHotelChange("country", value)}
                  className={styles.hotelCreateInput}
                />
              </td>
              <td>
                <input
                  className={styles.hotelCreateInput}
                  type="text"
                  value={newHotel.type || ""}
                  onChange={(e) =>
                    onNewHotelChange && onNewHotelChange("type", e.target.value)
                  }
                  placeholder="Тип"
                />
              </td>
              <td>
                <input
                  className={styles.hotelCreateInput}
                  type="text"
                  value={newHotel.region || ""}
                  onChange={(e) =>
                    onNewHotelChange &&
                    onNewHotelChange("region", e.target.value)
                  }
                  placeholder="Регион"
                />
              </td>
              <td colSpan={1}></td>
              <td>
                <div className={styles.actions}>
                  <button
                    className={styles.actionButton}
                    onClick={onSaveNewHotel}
                    title="Сохранить"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={onCancelNewHotel}
                    title="Отмена"
                  >
                    <X size={16} />
                  </button>
                </div>
              </td>
            </tr>
          )}
          {hotels.map((hotel) =>
            editingHotelId === hotel._id ? (
              <tr key={hotel._id} className={styles.hotelCreateRow}>
                <td>
                  <input
                    ref={nameInputRef}
                    className={styles.hotelCreateInput}
                    type="text"
                    value={editingHotelData.name || ""}
                    onChange={(e) =>
                      onEditHotelChange &&
                      onEditHotelChange("name", e.target.value)
                    }
                    placeholder="Название"
                  />
                </td>
                <td>
                  <CountryAutocomplete
                    value={editingHotelData.country || ""}
                    onChange={(value) => onEditHotelChange && onEditHotelChange("country", value)}
                    className={styles.hotelCreateInput}
                  />
                </td>
                <td>
                  <input
                    className={styles.hotelCreateInput}
                    type="text"
                    value={editingHotelData.type || ""}
                    onChange={(e) =>
                      onEditHotelChange &&
                      onEditHotelChange("type", e.target.value)
                    }
                    placeholder="Тип"
                  />
                </td>
                <td>
                  <input
                    className={styles.hotelCreateInput}
                    type="text"
                    value={editingHotelData.region || ""}
                    onChange={(e) =>
                      onEditHotelChange &&
                      onEditHotelChange("region", e.target.value)
                    }
                    placeholder="Регион"
                  />
                </td>
                <td>
                  {hotel.createdAt
                    ? dayjs(hotel.createdAt).format("DD.MM.YYYY")
                    : ""}
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionButton}
                      onClick={onSaveEditHotel}
                      title="Сохранить"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={onCancelEditHotel}
                      title="Отмена"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              <tr key={hotel._id}>
                <td>{hotel.name}</td>
                <td>{hotel.country}</td>
                <td>{hotel.type}</td>
                <td>{hotel.region}</td>
                <td>
                  {hotel.createdAt
                    ? dayjs(hotel.createdAt).format("DD.MM.YYYY")
                    : ""}
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => hotel._id && onHotelClick(hotel._id)}
                      title="Редактировать"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={() => hotel._id && onDeleteHotel(hotel._id)}
                      title="Удалить"
                    >
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

export default HotelsTable;
