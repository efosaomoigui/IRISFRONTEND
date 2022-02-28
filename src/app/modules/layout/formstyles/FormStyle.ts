import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme =>({

    root:{
        '& .MuiInputBase-root':{
            width:'90%',
            margin: '2px',
            marginTop:'28px',
            fontSize:'15px'
        }, 
        '& .MuiInputLabel-formControl' : {
            top:'10px',
            left:'5px',
            fontSize:'12px'
        },
        '& .MuiFormHelperText-contained Mui-error':{
            marginBottom: '10px'
        }, 
        '& .MuiFormGroup-row':{
            margin: '12px',
        }, 
        '& .MuiOutlinedInput-input':{
            paddingTop:'12px',
            paddingBottom:'14px'
        },
        '& ..MuiTypography-body1':{
            fontWeight:'500'
        }
    }

}));

export default useStyles;