/**
 * Получение случайного элемента из массива.
 * @param array Массив из значений.
 * @returns Случайный элемент массива array.
 */
const getRandomElement = <T>(array: readonly T[]): T | undefined => {
  if (!array.length) {
    return undefined;
  }
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Безопасно для типов фильтрует массив объектов по значению свойства массив объектов
 * по значению указанного свойства.
 * @param collection Массив объектов одного типа.
 * @param property Ключ свойства объекта из массива collection.
 * @param value Значение свойства, по которому выполняется фильтрация.
 * @returns Массив объектов, у которых значение свойства совпадает с value.
 */
const filterByProperty = <T, K extends keyof T>(
  collection: T[],
  property: K,
  value: T[K],
): T[] => collection.filter((item) => item[property] === value);

/**
 * Делает первую букву строки заглавной.
 * @param value Исходная строка.
 * @returns Строка с заглавной первой буквой, либо исходная строка, если она пустая.
 */
const capitalizeFirstLetter = (value: string): string => {
  if (!value) {
    return value;
  }
  return value[0].toUpperCase() + value.slice(1);
};

/**
 * Принимает строку пути текущей страницы и возвращает строку пути основания,
 * для дальнейшего сопоставления с AppRoute.
 * Например /offer/something преобразует в /offer.
 * @param path - путь текущей страницы, получаемый через useLocation().pathname.
 * @returns Обрезанный до основания путь в виде строки.
 */
const makeBasePath = (path: string): string => `/${path.split('/')[1]}`;

/**
 * Ключ параметра, который React Router использует для catch-all маршрута (`*`).
 *
 * Например, для пути `/users/*` при переходе на `/users/unknown/page`
 * в `params` появится свойство `"*"`.
 */
const NOT_FOUND_PATH_KEY = '*';
/**
 * Описание параметров текущего маршрута, полученных через `useParams()`.
 *
 * Ключом может быть имя динамического сегмента маршрута
 * (например, `id`, `slug`) или `*` для catch-all сегмента.
 * Значение может отсутствовать, поэтому имеет тип `string | undefined`.
 */
type Params = {
  [key: string]: string | undefined;
};
/**
 * Проверяет, что текущий маршрут не найден.
 *
 * Функция считает маршрут ненайденным, если среди параметров есть
 * ключ catch-all маршрута (`*`). Такой ключ появляется, когда URL
 * не совпал ни с одним конкретным маршрутом и был обработан
 * fallback-маршрутом.
 *
 * @param params - Объект параметров маршрута из `useParams()`.
 * @returns `true`, если маршрут не найден; иначе `false`.
 *
 * @example
 * const params = useParams();
 *
 * if (isNotFoundParams(params)) {
 *   return <NotFoundPage />;
 * }
 */
const isNotFoundParams = (params: Params): boolean =>
  NOT_FOUND_PATH_KEY in params;

type EnglishPluralForms = {
  one: string;
  other: string;
};
/**
 * Подставляет слово в единственном числе или во монжественном.
 * @param count - число, на основе которого подставляется слово.
 * @param forms - возможные формы слов.
 * @returns Возвращает число и слово.
 */
const pluralizeEn = (count: number, forms: EnglishPluralForms): string => {
  const category = new Intl.PluralRules('en').select(count);
  const word = category === 'one' ? forms.one : forms.other;

  return `${count} ${word}`;
};

export {
  getRandomElement,
  filterByProperty,
  capitalizeFirstLetter,
  makeBasePath,
  isNotFoundParams,
  pluralizeEn,
};
