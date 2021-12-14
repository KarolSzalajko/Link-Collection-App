import {
  Button, CircularProgress, createStyles, makeStyles,
  Theme
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { DisplayMessageInSnackbar } from "../../Actions/UIActions";
import CollectionsApi from "../../Api/CollectionsApi";
import CollectionsStore from "../../Stores/CollectionsStore";
import SimpleDialog from "./SimpleDialog";

type MakePublicDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBlockEnd: "10px",
    },
    wrapper: {
      margin: theme.spacing(1),
      position: "relative",
    },
    buttonProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

export default function MakePublicDialog(props: MakePublicDialogProps) {
  const classes = useStyles();
  const title = "Kopiuj link do udostępniania";
  const description = `Możesz upublicznić tą kolekcję, aby każdy posiadający link mógł ją przeglądać. 
  Czy chcesz kontynuować?`;
  const successDescription =
    "Kolekcja upubliczniona! Możesz teraz wysłać ją innym, używając poniższego linku.";

  const [loading, setLoading] = React.useState(false);
  const [sharableLink, setSharableLink] = useState("");

  const onConfirmClick = async () => {
    setLoading(true);
    let ok = await CollectionsApi.makePublic(props.collectionId);
    if (ok) {
      setSharableLink(
        `https://${window.location.host}/public/${props.collectionId}`
      );
    } else {
      //TODO
    }
    setLoading(false);
  };

  useEffect(() => {
    let collection = CollectionsStore.getCollection(props.collectionId);
    if (collection?.isPublic === true)
      setSharableLink(
        `https://${window.location.host}/public/${props.collectionId}`
      );
    else setSharableLink("");
  }, [props.collectionId]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(sharableLink);
    DisplayMessageInSnackbar("Link skopiowany");
  };

  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={sharableLink === "" ? description : successDescription}
      content={
        <>
          {sharableLink}
          {sharableLink !== "" && (
            <Button color="primary" onClick={copyToClipboard}>
              Kopiuj
            </Button>
          )}
        </>
      }
      actions={
        <div className={classes.wrapper}>
          {sharableLink === "" && (
            <Button color="primary" disabled={loading} onClick={onConfirmClick}>
              Potwierdź
            </Button>
          )}
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      }
    />
  );
}
