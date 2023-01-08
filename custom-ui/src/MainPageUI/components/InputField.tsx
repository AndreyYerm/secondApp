/* eslint-disable */
// @ts-nocheck

/* eslint linebreak-style: ["error", "windows"] */

import Field from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import { isConditionalExpression } from 'typescript';

// export function InputField(name: string, label: string) {
//     return(
//         <Field
//         aria-required={true}
//         name={name}
//         defaultValue=""
//         label={label}
//         isRequired
//     >
//         {({fieldProps}) => <TextField {...fieldProps} />}
//     </Field>
//     )
// }

export const InputField = ({name, label}) => {
    console.log(name)
    console.log(label)
    return(
        <Field
        aria-required={true}
        name={name}
        defaultValue=""
        label={label}
        isRequired
    >
        {({fieldProps}) => <TextField {...fieldProps} />}
    </Field>
    )
}