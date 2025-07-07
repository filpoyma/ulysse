export const createIconEl = (icon: string) => {
  const el = document.createElement('div');
  el.innerHTML = icon;
  el.style.transform = 'translate(-50%, -50%)';
  el.style.width = '32px';
  el.style.height = '32px';
  return el;
};

export const getRouteType = (type: string) => {
  if (type === 'walking') return 'walking';
  return 'driving';
};

export const validateClipboardCoordinates = (str: string) => {
  const regex = /^-?\d+\.\d+\s+-?\d+\.\d+$/;
  // Проверяем соответствие формату
  if (!regex.test(str))
    throw new Error('Неверный формат координат. Используйте формат: "12.234 29.4545"');

  // Разбиваем строку на координаты
  const [lng, lat] = str.split(' ').map(Number).reverse();
  // Проверяем диапазоны координат
  if (lat < -90 || lat > 90) throw new Error('Широта должна быть в диапазоне от -90 до 90');

  if (lng < -180 || lng > 180) throw new Error('Долгота должна быть в диапазоне от -180 до 180');
};
