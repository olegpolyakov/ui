import {
    type ChangeEvent,
    type FocusEvent,
    type InvalidEvent,
    type ReactNode,
    useCallback,
    useState
} from 'react';

import { cn } from '../../component';
import type { ComponentProps, Shape, Size } from '../../types';

import Textbox from '../Textbox';

import styles from './Input.module.scss';

export type InputProps = {
    label?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    size?: Size;
    shape?: Shape;
    variant?: 'outlined' | 'tinted' | 'outlined-tinted';
    onChange?: InputChangeHandler;
};

export type InputChangeHandler = (
    data: {
        name?: string;
        value: string;
    },
    event: React.ChangeEvent<HTMLInputElement>
) => void;

Input.displayName = 'Input';

export default function Input({
    className,

    value,
    defaultValue,
    label,
    start,
    end,
    size = 'm',
    shape,
    variant = 'outlined',
    disabled,
    onChange,
    onFocus,
    onBlur,
    onInvalid,
    ...props
}: ComponentProps<InputProps, 'input'>) {
    const isControlled = value !== undefined;

    const [internalValue, setInternalValue] = useState(value || defaultValue || '');
    const [isFocused, setFocused] = useState(false);
    const [isInvalid, setInvalid] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
            setInternalValue(event.target.value);
        }

        setInvalid(!event.target.validity.valid);
        setValidationMessage('');
        onChange?.({
            name: event.target.name,
            value: event.target.value
        }, event);
    }, [isControlled, onChange]);

    const handleFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(event);
    }, [onFocus]);

    const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        onBlur?.(event);
    }, [onBlur]);

    const handleInvalid = useCallback((event: InvalidEvent<HTMLInputElement>) => {
        event.preventDefault();
        setInvalid(true);
        setValidationMessage((event.target as HTMLInputElement).validationMessage);
        onInvalid?.(event);
    }, [onInvalid]);

    const isActive = Boolean(value || defaultValue || internalValue);

    const classNames = cn(
        className,
        {},
        styles
    );

    return (
        <Textbox
            label={label}
            start={start}
            end={end}
            shape={shape}
            size={size}
            variant={variant}
            active={isActive}
            disabled={disabled}
            focused={isFocused}
            invalid={isInvalid}
            validationMessage={validationMessage}
        >
            <input
                className={classNames}
                value={value}
                defaultValue={defaultValue}
                disabled={disabled}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                {...props}
            />
        </Textbox>
    );
}