import React from "react";
import { Element } from "../Model/Element";
import { ElementType } from "../Model/ElementType";
import ElementTypeService from "../Service/ElementTypeService";
import ElementView from "./ElementView";
import ImageElement from "./ImageElement";
import YoutubeElement from "./YoutubeElement";

type ElementWrapperProps = {
  element: Element;
};

export default function ElementWrapper(props: ElementWrapperProps) {
  const element = props.element;
  const elementType = ElementTypeService.getElementType(element);

  switch (elementType) {
    case ElementType.BASIC:
      return <ElementView element={element} />;
    case ElementType.IMAGE:
      return <ImageElement element={element} />;
    case ElementType.YOUTUBE:
      return <YoutubeElement element={element} />;
  }
}
