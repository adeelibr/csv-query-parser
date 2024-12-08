import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const possibleFormats = [
  'DD-MM-YYYY HH:mm:ss',
  'MM-DD-YYYY HH:mm:ss',
  'YYYY-MM-DD HH:mm:ss',
  'DD/MM/YYYY HH:mm:ss',
  'MM/DD/YYYY HH:mm:ss',
  'YYYY/MM/DD HH:mm:ss',
  'YYYY-MM-DD',
  'MM/DD/YYYY',
  'DD/MM/YYYY',
];

/**
 * Checks if the given value can be interpreted as a date in any of the known formats.
 * @param value - The value to test.
 * @returns True if the value matches at least one of the known date formats, false otherwise.
 */
export function isDate(value: any): boolean {
  if (value === null || value === undefined || value === '') {
    return false; // or return true if you consider empty values as neutral
  }

  return possibleFormats.some((format) => dayjs(value, format, true).isValid());
}
