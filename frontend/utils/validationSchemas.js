import * as Yup from "yup";



const isNumeric = (value) => /^(?![0.]+$)\d+(\.\d*)?$/.test(value);

const quantitativeSchema = Yup.object().shape({
    //to-do: fix when input empty
        quantity: Yup.string()
            .required("Required")
            .test("isMoreThan0", "Minimum 1 rep", (val) => {return parseInt(val)>0;})
            .test("Integer", "reps must be whole number", (val) => {return !(val.includes("."));}),
        sets: Yup.string()
            .required("Required")
            .test("isMoreThan0", "Minimum 1 set", (val) => {return parseInt(val)>0;})
            .test("Integer", "reps must be whole number", (val) => {return !(val.includes("."));}),
      })

const timeSchema = Yup.object().shape({
        quantity: Yup.string()
        .required("Required")
        .test("Number", "Must be a positive number", isNumeric),
      })

const distanceSchema = Yup.object().shape({
        quantity: Yup.string()
        .required("Required")
        .test("Number", "Must be a positive number", isNumeric),
      })
    
export{isNumeric, quantitativeSchema, timeSchema, distanceSchema}
