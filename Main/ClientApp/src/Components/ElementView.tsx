import clsx from 'clsx';
import {
  Avatar, Card, CardContent, CardHeader, IconButton, ListItem,
  ListItemIcon,
  ListItemText, Menu, Typography, CardActionArea
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Delete, Edit, MoreVert } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { ReactNode, useEffect, useState } from "react";
import { parse } from "tldts";
import { getFaviconUrl } from "../Actions/FaviconActions";
import DeleteElementDialog from "../Components/Dialogs/DeleteElementDialog";
import EditElementDialog from "../Components/Dialogs/EditElementDialog";
import {
  GetHostnameLink,
  GetProperUrl,
  OpenInNewTab
} from "../Infrastructure/UrlUtilities";
import { Element as ElementModel } from "../Model/Element";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "10px",
      background: "rgba(34, 35, 78, 0.05)",
    },
    icon: {
      zoom: 2,
      maxHeight: "20px",
      maxWidth: "20px",
    },
    expand: {
      transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    descShort: {
      whiteSpace: "nowrap",
      width: "40vw",
      paddingTop: "12px",
      paddingBottom: "12px"
    },
    descExpanded: {
      whiteSpace: "pre-line",
      paddingTop: "12px",
      paddingBottom: "12px",
    }
  })
);

type ElementViewProps = {
  element: ElementModel;
  children?: ReactNode;
};

export default function ElementView(props: ElementViewProps) {
  const classes = useStyles();

  const [elementUrl, setElementUrl] = useState("");
  const [displayedName, setDisplayedName] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("_");
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [description, setDescription] = useState("");
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isDescriptionLong, setIsDescriptionLong] = useState<boolean | undefined>(undefined);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const onMenuOpen = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget as Element);
  };
  const onMenuClose = () => setAnchorEl(null);

  const setBetterFaviconUrl = async (hostname: string) => {
    let receivedFaviconUrl = await getFaviconUrl(hostname);
    if (receivedFaviconUrl !== undefined) setFaviconUrl(receivedFaviconUrl);
  };

  const handleExpandClick = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  }

  const checkDescriptionLength = (element: HTMLSpanElement | null) => {
    if (isDescriptionLong === undefined && element !== undefined && element !== null)
      setIsDescriptionLong(element.scrollWidth > element.offsetWidth);
  }

  useEffect(() => {
    let url = props.element.link;
    let name = props.element.name;
    let desc = props.element.description;
    setElementUrl(GetProperUrl(url));
    setDisplayedName(name.length === 0 ? url : name);
    setFaviconUrl(GetHostnameLink(url) + "/favicon.ico");
    if (desc !== description) {
      setIsDescriptionLong(undefined);
    }
    setDescription(desc);
    setIsDescriptionVisible(desc != null && desc.length !== 0);
    let hostname = parse(url).hostname;

    if (hostname !== null) {
      setBetterFaviconUrl(hostname);
    }
  }, [props.element]);

  return (
    <>
      <Card
        className={classes.root}
        style={{paddingBottom: props.children ? "0px" : "15px"}}
        elevation={3}
      >
        <CardActionArea disableTouchRipple={true}>
          <CardHeader
            avatar={<Avatar alt={displayedName.toUpperCase()} src={faviconUrl} />}
            title={displayedName}
            subheader={elementUrl}
            onClick={() => OpenInNewTab(elementUrl)}
            action={
              <IconButton
                style={{margin: "12px 12px 0px 0px"}}
                aria-label="Ustawienia"
                onClick={(e) => {
                  e.stopPropagation();
                  onMenuOpen(e);
                }}
              >
                <MoreVert />
              </IconButton>
            }
          />
        </CardActionArea>
        {isDescriptionVisible && <CardContent style={{padding: "0px 20px"}}>
          <div style={{display: "flex"}}>
            <Typography noWrap={true}
              ref={e => checkDescriptionLength(e)}
              className={clsx(classes.descShort, {
                [classes.descExpanded]: isDescriptionExpanded,
              })}>
              {description}
            </Typography>
            {isDescriptionLong && <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: isDescriptionExpanded,
              })}
              style={{alignItems: "flex-start", height: "fit-content"}}
              aria-expanded={isDescriptionExpanded}
              aria-label="show more">
              <ExpandMoreIcon onClick={handleExpandClick} />
            </IconButton>}
          </div>
        </CardContent>}
        {props.children ?
          <CardContent>
            {props.children}
          </CardContent> : <></>}
      </Card>
      <Menu
        open={anchorEl !== null}
        anchorEl={anchorEl}
        onClose={onMenuClose}
        PaperProps={{
          style: {
            maxHeight: 350,
          },
        }}
      >
        <div>
          <ListItem onClick={() => setDeleteDialogOpen(true)} button>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText primary="Usuń" />
          </ListItem>
          <ListItem onClick={() => setEditDialogOpen(true)} button>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary="Edytuj" />
          </ListItem>
        </div>
      </Menu>
      <EditElementDialog
        open={editDialogOpen}
        toggleDialogOpen={() => setEditDialogOpen(!editDialogOpen)}
        element={props.element}
      />
      <DeleteElementDialog
        open={deleteDialogOpen}
        toggleDialogOpen={() => setDeleteDialogOpen(!deleteDialogOpen)}
        collectionId={props.element.collectionId}
        elementId={props.element.id}
      />
    </>
  );
}
