import React from "react";
import { deleteElement } from "../../Actions/ElementActions";
import DeleteDialog from "./DeleteDialog";

type DeleteElementDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
  elementId: number;
};

export default function DeleteElementDialog(props: DeleteElementDialogProps) {
  const title = "Czy na pewno chcesz usunąć ten element?";
  const description =
    "Ten element zostanie nieodwracalnie usunięty. Czy chcesz kontynuować?";
  return (
    <DeleteDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      confirmAction={() => deleteElement(props.collectionId, props.elementId)}
    />
  );
}
