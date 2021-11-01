import * as Yup from "yup";



const isNumeric = (value) => /^(?![0.]+$)\d+(\.\d*)?$/.test(value);

const schema = Yup.object().shape({
        weight: Yup.string()
          .required("Required")
          .test("Number", "Must be a positive number", isNumeric),
        height: Yup.string()
          .test("Number", "Must be a positive number", isNumeric)
          .required("Required"),
      })
    
export{isNumeric, schema}
