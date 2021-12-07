import { Button } from "@material-ui/core";
import React from "react";
import SimpleDialog from "./SimpleDialog";

type DeleteDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  confirmAction: () => void;
  title: string;
  description?: string;
  additionalCancelAction?: () => void;
};

export default function DeleteDialog(props: DeleteDialogProps) {
  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={props.title}
      description={props.description}
      additionalCancelAction={props.additionalCancelAction}
      actions={
        <Button
          onClick={() => {
            props.confirmAction();
            props.toggleDialogOpen();
          }}
          color="secondary"
          autoFocus
        >
          Potwierdź
        </Button>
      }
    />
  );
}
