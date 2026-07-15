// TODO, попробовать реализовать infer.

/**
 * Получение случайного элемента из массива.
 * @param array Массив из значений.
 * @returns Случайный элемент массива array.
 */
function getRandomElement<T>(array: readonly T[]): T | undefined {
  if (!array.length) {
    return undefined;
  }
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Типобезопасно фильтрует массив объектов по значению свойства массив объектов
 * по значению указанного свойства.
 * @param collection Массив объектов одного типа.
 * @param property Ключ свойства объекта из массива collection.
 * @param value Значение свойства, по которому выполняется фильтрация.
 * @returns Массив объектов, у которых значение свойства совпадает с value.
 */
function filterByProperty<T, K extends keyof T>(
  collection: T[],
  property: K,
  value: T[K],
): T[] {
  return collection.filter((item) => item[property] === value);
}

/**
 * Делает первую букву строки заглавной.
 * @param value Исходная строка.
 * @returns Строка с заглавной первой буквой, либо исходная строка, если она пустая.
 */
function capitalizeFirstLetter(value: string): string {
  if (!value) {
    return value;
  }
  return value[0].toUpperCase() + value.slice(1);
}

export { getRandomElement, filterByProperty, capitalizeFirstLetter };
