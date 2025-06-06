import React, {useCallback} from 'react';
import languageFilterStyles from '@styles/components/Table/LanguageFilter.module.css';
import clsx from 'clsx';
import { languages } from '@helpers/constant';
import {useAppDispatch, useAppSelector} from '@hooks/ReduxCall';
import {setLanguage} from '@store/query/querySlice';
import {LanguageFilterProps} from '@helpers/types';

/**
 * A filter component that allows selecting a language from a list of radio buttons.
 *
 * @param {Object} props - The selected language.
 * @param {boolean} props.isFetching Loading state for disabling inputs.
 *
 * @returns {React.JSX.Element} The rendered LanguageFilter component.
 */
const LanguageFilter = ({isFetching}: LanguageFilterProps): React.JSX.Element => {
    const dispatch = useAppDispatch();
    const {language : selectedLanguage} = useAppSelector(state => state?.query);
    
    const onLanguageChange = useCallback((lang: string) => {
        dispatch(setLanguage(lang));
    }, [dispatch])
    
    return (
        <div className={languageFilterStyles.languageFilter}>
            {languages.map((lang) => (
                <label
                    key={lang}
                    aria-disabled={isFetching}
                    className={clsx(languageFilterStyles.searchLabel, {
                        [languageFilterStyles.activeLabel]: lang === selectedLanguage,
                        [languageFilterStyles.labelDisabled]: isFetching,
                    })}
                >
                    <input
                        data-testid={`language-filter-${lang}`}
                        type="radio"
                        value={lang}
                        checked={selectedLanguage === lang}
                        disabled={isFetching}
                        onChange={() => onLanguageChange(lang)}
                    />
                    {lang}
                </label>
            ))}
        </div>
    );
};

export default LanguageFilter;