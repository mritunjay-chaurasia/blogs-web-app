import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '../CircularProgress'
export default function BasicButtons(props) {
    const style = {width:props.width,color:props.color,background:props.background,height:props.height,fontSize:props.fontSize,fontWeight:props.fontWeight,borderRadius:props.borderRadius,borderColor:props.borderColor}
  return (
    <Stack spacing={2} direction="row">
      <Button onClick={props.onClick} type={props.type} style={style} variant={props.variant} disabled={props.disabled}>
        {props.loader 
        ?
        <CircularProgress/>
         :
         <>
         {props.btnName}
         </>
         }
        
      
        </Button>
    </Stack>
  );
}