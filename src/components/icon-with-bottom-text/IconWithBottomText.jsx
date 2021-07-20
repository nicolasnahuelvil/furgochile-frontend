import {Grid, Typography} from "@material-ui/core";

const IconWithBottomText = (props) => {
    return (
        <Grid container justify={'center'}>
            <Grid item xs={12} align="center">
                <props.icon />
            </Grid>
            <Grid item xs={12} align="center">
                <Typography style={{fontSize: 12}} variant='subtitle1'>{props.text}</Typography>
            </Grid>
        </Grid>
    )
}

export default IconWithBottomText;