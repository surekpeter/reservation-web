import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export type SupportedLanguage = 'sk'

const mergeRecordArray = (arr: Record<string, string>[]): Record<string, string> => {
    return Object.assign({}, ...arr)
}

export const initializeI18n = (textSource: Record<SupportedLanguage, Record<string, string>[]>) => {
    const merged: Partial<Record<SupportedLanguage, { translation: Record<string, string> }>> = {}

    for (const lang in textSource) {
        const langTyped = lang as SupportedLanguage
        merged[langTyped] = {translation: mergeRecordArray(textSource[langTyped])}
    }
    return i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            fallbackLng: 'sk',
            resources: merged,
        });
}