import { TextField } from "@mui/material";

export default function Inputs({
  names,
  types,
  lables,
  values,
  handleBlur,
  handleChange,
  touched,
  errors,
})
 {

  return (
    <div>
      <TextField
        type={types}
        margin="normal"
        size="small"
        required
        fullWidth
        id={names}
        label={lables}
        name={names}
        value={values}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {touched && errors? (
        <p className="error-p">{errors}</p>
      ) : (
        ""
      )}
    </div>
  );
}
