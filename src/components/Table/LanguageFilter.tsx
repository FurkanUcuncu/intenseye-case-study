import React from 'react';
import languageFilterStyles from '../../assets/styles/components/Table/LanguageFilter.module.css';
import clsx from 'clsx';
import { languages } from '../../helpers/constant';
import {LanguageFilterProps} from '../../helpers/types.ts';

/**
 * A filter component that allows selecting a language from a list of radio buttons.
 *
 * @param {Object} props - The selected language.
 * @param {string} props.selectedLanguage The selected language.
 * @param {boolean} props.isFetching Loading state for disabling inputs.
 * @param {function} props.onLanguageChange Callback when language is changed.
 *
 * @returns {React.JSX.Element} The rendered LanguageFilter component.
 */
const LanguageFilter = ({ selectedLanguage, isFetching, onLanguageChange }: LanguageFilterProps): React.JSX.Element => {
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