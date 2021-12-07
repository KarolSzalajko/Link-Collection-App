import { List } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import React from "react";
import DrawerItem from "./DrawerItem";

export default function SavedSection() {
  return (
    <DrawerItem
      title="Zapisane"
      icon={<Save />}
      nestedList={<List component="div" disablePadding></List>}
    />
  );
}
