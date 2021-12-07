import React from "react";
import { deleteCollection } from "../../Actions/CollectionActions";
import DeleteDialog from "./DeleteDialog";

type DeleteCollectionDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
};

export default function DeleteCollectionDialog(
  props: DeleteCollectionDialogProps
) {
  const title = "Czy na pewno chcesz usunąć tą kolekcję?";
  const description =
    "Kolekcja i wszystkie znajdujące się w niej elementy zostaną nieodwracalnie usunięte. Czy chcesz kontynuować?";
  return (
    <DeleteDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      confirmAction={() => deleteCollection(props.collectionId)}
    />
  );
}
