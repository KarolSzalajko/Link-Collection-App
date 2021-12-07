import React from "react";
import { deleteContributorOfCollection } from "../../Actions/CollectionActions";
import DeleteDialog from "./DeleteDialog";

type DeleteContributorDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
  userId: string;
  additionalCancelAction?: () => void;
};

export default function DeleteContributorDialog(
  props: DeleteContributorDialogProps
) {
  const title = "Czy chesz usunąć tego współtwórcę?";
  const description =
    "Ten współtwórca straci uprawnienia do tej kolekcji. Czy chcesz kontynuować?";
  return (
    <DeleteDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      //TODO: confirm action
      confirmAction={() =>
        deleteContributorOfCollection(props.collectionId, props.userId)
      }
      additionalCancelAction={props.additionalCancelAction}
      title={title}
      description={description}
    />
  );
}
