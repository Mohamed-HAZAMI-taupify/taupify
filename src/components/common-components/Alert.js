import React from "react";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";

export default function Alert() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("I love snacks.");
  };

  const handleClickVariant = (variant) => () => {
    enqueueSnackbar("This is a success message!", { variant });
  };

  return (
    <React.Fragment>
      <Button onClick={handleClick}>Show snackbar</Button>
      <Button onClick={handleClickVariant("success")}>
        Show success snackbar
      </Button>
    </React.Fragment>
  );
}
