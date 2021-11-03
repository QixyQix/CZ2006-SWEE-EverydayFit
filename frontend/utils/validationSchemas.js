import * as Yup from "yup";



const isNumeric = (value) => /^([0-9]\.[1-9]|[1-9][0-9]*\.[1-9]|[1-9][0-9]*)$/.test(value);
const isNumericDist = (value) => /^([0-9]\.[1-9]+|[1-9][0-9]*\.[1-9]|[1-9][0-9]*)$/.test(value);
const isNumericBmi = (value) => /^([0-9]\.[1-9]+|[1-9][0-9]*\.[0-9]+|[1-9][0-9]*)$/.test(value);
const isIntMoreThan1 = (value) => /^([1-9][0-9]{0,100}|100)$/.test(value);
const isTwoDigit = (value) => /^[1-9]?\d$/.test(value);
const isSeconds = (value) => /^[0-5]?[0-9]$/.test(value);


const quantitativeSchema = Yup.object().shape({
        quantity: Yup.string()
            .required("Required")
            .test("Number","Must be an integer greater than 0", isIntMoreThan1),
        sets: Yup.string()
            .nullable()
            .required("Required")
            .test("Number", "Must be an integer greater than 0", isIntMoreThan1),
      })

const timeSchema = Yup.object().shape({
        quantity: Yup.string()
        .required("Required")
        .test("Number", "Must be a valid number greater than 0", isNumeric),
      })

const distanceSchema = Yup.object().shape({
        quantity: Yup.string()
        .required("Required")
        .test("Number", "Must be an integer greater than 0", isNumericDist),
      })

const loginSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email!").required("Required"),
        password: Yup.string()
          .min(6, "minimum 6 characters")
          .max(50, "Maximum 50 characters")
          .required("Required"),
      });

const registerSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string().email("Must be a valid email!").required("Required"),
        password: Yup.string()
          .min(6, "minimum 6 characters")
          .max(50, "Maximum 50 characters")
          .required("Required"),
        passwordConfirmation: Yup.string()
          .required("Required")
          .oneOf([Yup.ref("password")]),
      });

const ipptSchema = Yup.object().shape({
        gender: Yup.string().required("Required"),
        serviceType: Yup.string().required("Required"),
        age: Yup.string()
          .required("Required")
          .test("Age", "Must be a positive integer", isTwoDigit),
        runTimeMinutes: Yup.string().test("Minutes", isTwoDigit).required("Required"),
        runTimeSeconds: Yup.string()
          .test("Seconds", isSeconds)
          .required("Required"),
        pushUpCount: Yup.string()
          .test("Push Up", "Must be a positive integer", isTwoDigit)
          .required("Required"),
        sitUpCount: Yup.string()
          .test("Sit Up", "Must be a positive integer", isTwoDigit)
          .required("Required"),
      });

const bmiSchema = Yup.object().shape({
        weight: Yup.string()
          .required("Required")
          .test("Number", "Must be a positive number", isNumericBmi),
        height: Yup.string()
          .required("Required")
          .test("Number", "Must be a positive number", isNumericBmi),
         
      });
    
export{isNumeric, quantitativeSchema, timeSchema, distanceSchema, loginSchema, registerSchema, ipptSchema, bmiSchema}
