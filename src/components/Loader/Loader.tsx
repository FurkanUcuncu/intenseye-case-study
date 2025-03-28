import React from 'react';
import clsx from 'clsx';
import loaderStyles from '@styles/components/Loader/Loader.module.css';
import {LoaderProps} from '../../helpers/types.ts';
import {FILL_COLORS} from '../../helpers/constant.ts';

/**
 * Loader component renders a circular spinner to indicate loading state.
 * The spinner's size and color can be customized via props.
 *
 * @param {Object} props - Component props.
 * @param {number} props.width - The width of the loader in pixels.
 * @param {number} props.height - The height of the loader in pixels.
 * @param {keyof typeof FILL_COLORS} props.fill - The color of the loader, based on predefined color options.
 *
 * @returns {JSX.Element} The loader spinner with specified width, height, and fill color.
 */
const Loader = ({ width, height, fill }: LoaderProps): React.JSX.Element => (
    <div data-testid='loader' className={loaderStyles.spinner} role="status">
        <svg
            aria-hidden="true"
            className={clsx(loaderStyles.animateSpin, loaderStyles[`fill-${FILL_COLORS[fill]}`])}
            fill="none"
            height={height}
            viewBox="0 0 40 40"
            width={width}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                clipRule="evenodd"
                d="M19.9997 33.3335C27.3635 33.3335 33.333 27.364 33.333 20.0002C33.333 12.6364 27.3635 6.66683 19.9997 6.66683C12.6359 6.66683 6.66634 12.6364 6.66634 20.0002C6.66634 27.364 12.6359 33.3335 19.9997 33.3335ZM19.9997 36.6668C29.2044 36.6668 36.6663 29.2049 36.6663 20.0002C36.6663 10.7954 29.2044 3.3335 19.9997 3.3335C10.7949 3.3335 3.33301 10.7954 3.33301 20.0002C3.33301 29.2049 10.7949 36.6668 19.9997 36.6668Z"
                fill="#676B7E"
                fillRule="evenodd"
                opacity="0.15"
            />
            <path
                clipRule="evenodd"
                d="M19.9997 6.66683C12.6359 6.66683 6.66634 12.6364 6.66634 20.0002C6.66634 27.364 12.6359 33.3335 19.9997 33.3335C20.9201 33.3335 21.6663 34.0797 21.6663 35.0002C21.6663 35.9206 20.9201 36.6668 19.9997 36.6668C10.7949 36.6668 3.33301 29.2049 3.33301 20.0002C3.33301 10.7954 10.7949 3.3335 19.9997 3.3335C29.2044 3.3335 36.6663 10.7954 36.6663 20.0002C36.6663 20.9206 35.9201 21.6668 34.9997 21.6668C34.0792 21.6668 33.333 20.9206 33.333 20.0002C33.333 12.6364 27.3635 6.66683 19.9997 6.66683Z"
                fill="currentFill"
                fillRule="evenodd"
            />
        </svg>
    </div>
);

export default Loader;