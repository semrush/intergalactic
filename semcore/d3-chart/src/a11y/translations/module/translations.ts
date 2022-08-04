import de from './de.json';
import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import it from './it.json';
import ja from './ja.json';
import ko from './ko.json';
import pt from './pt.json';
import tr from './tr.json';
import vi from './vi.json';
import zh from './zh.json';

export const translations = {
  de,
  en,
  es,
  fr,
  it,
  ja,
  ko,
  pt,
  tr,
  vi,
  zh,
} as { [locale: string]: { [message: string]: string } };
