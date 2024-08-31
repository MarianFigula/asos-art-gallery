import React from "react";


export function FormInput({
                              label,
                              type = "text",
                              value,
                              onChange,
                              options = [],
                              required = false,
                              ...props
                          }) {

    return (
        <div className="mb-0-25">
            <label className="label">{label}</label>
            {type === 'select'} ? (
            <select
                value={value}
                onChange={onChange}
                className="input"
                required={required}
                {...props}>

                {options.map((option, index) => (
                    <option
                        key={index}
                        value={index === 0 ? "" : option}>
                        {option}
                    </option>
                ))}
            </select>
            )
        </div>
    )
}