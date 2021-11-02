import * as Yup from "yup";



const isNumeric = (value) => /^([0-9]\.[1-9]|[1-9][0-9]*\.[1-9]|[1-9][0-9]*)$/.test(value);
const isIntMoreThan1 = (value) => /^([1-9][0-9]{0,100}|100)$/.test(value);


const quantitativeSchema = Yup.object().shape({
    //to-do: fix when input empty
        quantity: Yup.string()
            .required("Required")
            //.test("isMoreThan0", "Minimum 1 rep", (val) => {return parseInt(val)>0;})
            .test("Number", "Must be a positive whole number starting with 1-9", isIntMoreThan1),
            //.test("Integer", "reps must be whole number", (val) => {return !(val.includes("."));}),
        sets: Yup.string()
            .nullable()
            .required("Required")
            .test("Number", "Must be a positive whole number starting with 1-9", isIntMoreThan1),
            //.test("isMoreThan0", "Minimum 1 set", (val) => {return parseInt(val)>0;})
            //.test("Integer", "reps must be whole number", (val) => {return !(val.includes("."));}),
      })

const timeSchema = Yup.object().shape({
        quantity: Yup.string()
        .required("Required")
        .test("Number", "Must be a number more than 0, only 1 decimal place", isNumeric),
      })

const distanceSchema = Yup.object().shape({
        quantity: Yup.string()
        .required("Required")
        .test("Number", "Must be a number more than 0, only 1 decimal place", isNumeric),
      })
    
export{isNumeric, quantitativeSchema, timeSchema, distanceSchema}
