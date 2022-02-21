import { Button } from "@material-ui/core";
import { FormikConfig, FormikValues } from "formik";
import React from "react";
import { boolean } from "yup/lib/locale";

interface Props {
  hasPrevious?: boolean;
  onBackClick: (values: FormikValues) => void;
  isLastStep: boolean;
}

const StepFormNavigation = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "space-between",
      }}
    >
      {props.hasPrevious && (
        <Button variant="contained" size="large" type="button" onClick={props.onBackClick}>
          Back
        </Button>
      )}
      
      <Button type="submit" size="large" color="primary" variant="contained" >{props.isLastStep ? "Submit" : "Next"}</Button>
    </div>
  );
};

export default StepFormNavigation;
