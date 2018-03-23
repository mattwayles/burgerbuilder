export const updateObject = (oldObject, updatedProps) => {
    return {
        ...oldObject,
        ...updatedProps
    }
};

//Check the validation rules to validate the user input. Without the '&& isValid' check, only the last validation rule
//conditional has the power to determine the final validity. By adding a check for the isValid value on every check, this
//ensures that ANY failed check has the ability to determine the final validity.
export const checkValidity = (value,rules) => {
    let isValid = true;
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength  && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.minLength  && isValid;
    }

    return isValid;
};