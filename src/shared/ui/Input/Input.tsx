import { InputHTMLAttributes, memo, useEffect, useRef, useState} from 'react';
import classNames, { Mods } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

//исключение типов для своего пользования
type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "readOnly">

interface InputProps extends  HTMLInputProps{
 className?: string
 value?: string
 onChange?: (value: string) => void 
 autofocus?: boolean,
 readonly?: boolean
}

export const Input = memo((props: InputProps) => {

    const [isFocused, setIsFocused] = useState(false)
    const [caretPosition, setCaretPosition] = useState(0);

    const ref = useRef<HTMLInputElement>(null)

    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder, 
        autofocus,
        readonly,
        ...otherProps
    } = props

    useEffect(() => {
        if (autofocus){
            setIsFocused(true);
            ref.current?.focus()
        }
    }, [autofocus])

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const onSelect = (e: any) => {
        setCaretPosition(e?.target?.selectionStart || 0);
    };

    const mods: Mods = {
        [cls.readonly] : readonly
    }

    return (
        <div className={classNames(cls.InputWrapper, mods, [className])}>
            {placeholder &&  <div className={cls.placeholder}>{`${placeholder}>`}</div>}
            <div className={cls.caretWrapper}>
                <input 
                    ref={ref}
                    className={cls.input} 
                    type={type} 
                    value={value} 
                    onChange={onChangeHandler} 
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    readOnly={readonly}
                    {...otherProps}
                />
                {isFocused && (
                    <span
                        className={cls.caret}
                        style={{ left: `${caretPosition * 9}px` }}
                    />
                )}
            </div>            
        </div>
    );
})