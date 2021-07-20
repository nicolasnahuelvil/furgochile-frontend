import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const CircularCheckbox = ({filled, label, ...rest}) => {

    return (
        <FormControlLabel
            control={
                <Checkbox
                    icon={<CircleUnchecked/>}
                    checkedIcon={filled ? <CircleCheckedFilled/> : <CircleChecked/>}
                    {...rest}
                />
            }
            label={label}
        />
    )
}

export default CircularCheckbox;