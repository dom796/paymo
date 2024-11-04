import React, { forwardRef } from 'react';
import InputMask from 'react-input-mask';

const InputMaskWithRef = forwardRef<HTMLInputElement, React.ComponentProps<typeof InputMask>>((props, ref) => (
    <InputMask {...props} inputRef={ref} />
));

export default InputMaskWithRef;
