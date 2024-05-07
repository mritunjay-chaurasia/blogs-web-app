import Form from 'react-bootstrap/Form';

function Select({lineHeight,boxShadow,border,fontWeight,fontSize,color,name,value,onChange}) {
  const style = {lineHeight:lineHeight,boxShadow:boxShadow,border:border,fontWeight:fontWeight,fontSize:fontSize,color:color}
  return (
    <Form.Select aria-label="Default select example" name={name} value={value} onChange={onChange} style={style}>
      <option>Please Select</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </Form.Select>
  );
}

export default Select;