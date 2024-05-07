import * as React from 'react';
import TextField from '@mui/material/TextField';
import './index.css'
export default function TextFields(props) {
  const style = {background:props.background,padding:props.padding}
  return (
      <TextField name={props.name} onChange={props.onChange} value={props.value} type={props.type} style={style} id="standard-basic" placeholder={props.placeholder} variant={props.variant} />
  );
}