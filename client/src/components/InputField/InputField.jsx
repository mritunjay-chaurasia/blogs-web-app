
import Form from "react-bootstrap/Form";

function InputField({ label,value,id, type, placeholder,lineHeight,boxShadow,border,fontWeight,fontSize,color,onChange ,name,onBlur}) {
  const style = {lineHeight:lineHeight,boxShadow:boxShadow,border:border,fontWeight:fontWeight,fontSize:fontSize,color:color}
  return (
    <>
      <Form.Label style={{color:color}}>{label}</Form.Label>
      <Form.Control value={value} onChange={onChange} onBlur={onBlur} id={id} name={name} style={style} type={type} placeholder={placeholder} />
    </>
  );
}

export default InputField;
