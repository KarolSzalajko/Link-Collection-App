import React, { ReactNode, useState, useEffect } from "react";
import { Collection } from "../Model/Collection";
import { Element } from "../Model/Element";
import ElementWrapper from "./ElementWrapper";
import { GridList, GridListTile, Divider, Paper } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { GetUserFriendlyHostname } from "../Infrastructure/UrlUtilities";
import { ElementControlMenu, sortDefault } from "./ElementControlMenu";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "25px 30px 25px 30px",
      height: "100%",
    },
  })
);

type BaseCollectionViewProps = {
  collection: Collection | null;
  children?: ReactNode;
  hasEditRights?: boolean;
};

export default function BaseCollectionView(props: BaseCollectionViewProps) {
  const classes = useStyles();

  let elements = props.collection?.elements ?? [];
  let allHosts = Array.from(
    new Set(elements.map((el) => GetUserFriendlyHostname(el.link) ?? ""))
  );

  let [sortedAscending, setSortedAscending] = useState(true);
  let [selectedHosts, setSelectedHosts] = useState(allHosts);
  let [elementOrderFunction, setElementOrderFunction] = useState(sortDefault);

  useEffect(() => {
    let elems = props.collection?.elements ?? [];
    let hosts = Array.from(
      new Set(elems.map((el) => GetUserFriendlyHostname(el.link) ?? ""))
    );
    setSelectedHosts(hosts);
  }, [props.collection]);

  let displayedElements = elements
    .filter((el) =>
      selectedHosts.includes(GetUserFriendlyHostname(el.link) ?? "")
    )
    .sort(elementOrderFunction.orderFunc);
  if (sortedAscending === false) {
    displayedElements.reverse();
  }

  return (
    <Paper elevation={0} className={classes.root}>
      <ElementControlMenu
        hosts={allHosts}
        onHostFilterChange={(hosts) => setSelectedHosts(hosts)}
        onSortingOptionChange={(orderFunc) =>
          setElementOrderFunction(orderFunc)
        }
        onSortingDirectionChange={(isAsc) => setSortedAscending(isAsc)}
      />
      <Divider />
      <GridList cols={2} cellHeight="auto" spacing={30}>
        <GridListTile key={0}>
          <GridList cols={1} cellHeight="auto" spacing={20}>
            {displayedElements.filter((el, idx) => idx % 2 === 0).map((element) => {
              return (
                <GridListTile key={element.id}>
                  <ElementWrapper element={element} canBeModified={props.hasEditRights} />
                </GridListTile>
              );
            })}
          </GridList>
        </GridListTile>
        <GridListTile key={1}>
          <GridList cols={1} cellHeight="auto" spacing={20}>
            {displayedElements.filter((el, idx) => idx % 2 === 1).map((element) => {
              return (
                <GridListTile key={element.id}>
                  <ElementWrapper element={element} canBeModified={props.hasEditRights} />
                </GridListTile>
              );
            })}
          </GridList>
        </GridListTile>
      </GridList>
      {props.children}
    </Paper>
  );
}
