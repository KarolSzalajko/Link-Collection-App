import { List } from "@material-ui/core";
import { Edit, People, Visibility } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import SharedCollectionsStore from "../../Stores/SharedCollectionsStore";
import DrawerItem from "./DrawerItem";
import DrawerItemNested from "./DrawerItemNested";

export default function SharedSection() {
  const [sharedCollections, setSharedCollections] = useState(
    SharedCollectionsStore.getSharedCollections()
  );

  useEffect(() => {
    const changeHandler = () => {
      setSharedCollections(SharedCollectionsStore.getSharedCollections());
    };
    SharedCollectionsStore.addChangeListener(changeHandler);

    return () => {
      SharedCollectionsStore.removeChangeListener(changeHandler);
    };
  });

  return (
    <DrawerItem
      title="Udostępnione dla mnie"
      icon={<People />}
      nestedList={
        <List component="div" disablePadding>
          {sharedCollections.map((sharedCollection) => (
            <DrawerItemNested
              title={sharedCollection.collection.name}
              link={`/collections/shared/${sharedCollection.collection.id}`}
              key={sharedCollection.collection.id}
              icon={<Visibility />}
              canBeModified={sharedCollection.editRights}
            />
          ))}
        </List>
      }
    />
  );
}
