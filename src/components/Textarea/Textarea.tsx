import {
    type ChangeEvent,
    type ReactNode,
    FocusEvent,
    useCallback,
    useState,
    FormEvent,
    useRef,
    useLayoutEffect,
    useEffect
} from 'react';

import { cn } from '../../component';
import { useComposedRef } from '../../hooks/ref';
import type { ComponentProps, Shape, Size } from '../../types';

import Textbox from '../Textbox';

import styles from './Textarea.module.scss';

export type TextareaProps = {
    label?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    size?: Size;
    shape?: Shape;
    variant?: 'outlined' | 'tinted' | 'outlined-tinted';
    onChange?: TextareaChangeHandler;
};

export type TextareaChangeHandler = (
    data: {
        name?: string;
        value?: string;
    },
    event: ChangeEvent<HTMLTextAreaElement>
) => void;

Textarea.displayName = 'Textarea';

export default function Textarea({
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

    ref,
    className,
    ...props
}: ComponentProps<TextareaProps, 'textarea'>) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const forkedRef = useComposedRef(textareaRef, ref);

    const [internalValue, setInternalValue] = useState(value || defaultValue || '');
    const [validationMessage, setValidationMessage] = useState('');
    const [isFocused, setFocused] = useState(false);
    const [isInvalid, setInvalid] = useState(false);

    useLayoutEffect(() => {
        if (!textareaRef.current) return;

        const textarea = textareaRef.current;

        function handleInput() {
            autosizeTextarea(textarea);
        }
        
        textarea.addEventListener('input', handleInput);

        return () => {
            textarea?.removeEventListener('input', handleInput);
        };
    }, []);

    useEffect(() => {
        if (!textareaRef.current) return;

        const textarea = textareaRef.current;

        autosizeTextarea(textarea);
    }, [isFocused]);

    const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setInvalid(false);
        setValidationMessage('');
        setInternalValue(event.target.value);
        onChange?.({
            name: event.target.name,
            value: event.target.value
        }, event);
    }, [onChange]);

    const handleFocus = useCallback((event: FocusEvent<HTMLTextAreaElement>) => {
        setFocused(true);
        onFocus?.(event);
    }, [onFocus]);
    
    const handleBlur = useCallback((event: FocusEvent<HTMLTextAreaElement>) => {
        setFocused(false);
        onBlur?.(event);
    }, [onBlur]);

    const handleInvalid = useCallback((event: FormEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        setInvalid(true);
        setValidationMessage((event.target as HTMLTextAreaElement).validationMessage);
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
            <textarea
                ref={forkedRef}
                className={classNames}
                value={value}
                defaultValue={defaultValue}
                onChange={handleChange}
                onInvalid={handleInvalid}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props}
            />
        </Textbox>
    );
}

function autosizeTextarea(textarea: HTMLTextAreaElement) {
    textarea.style.height = '0px';
    textarea.style.height = textarea.scrollHeight + 'px';
}