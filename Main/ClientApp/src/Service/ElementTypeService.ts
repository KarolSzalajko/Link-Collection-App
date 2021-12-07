import { Element } from "../Model/Element";
import { ElementType } from "../Model/ElementType";

class ElementTypeService {
  getElementType(element: Element): ElementType {
    if (this.isImageElement(element)) return ElementType.IMAGE;
    if (this.isYoutubeElement(element)) return ElementType.YOUTUBE;
    return ElementType.BASIC;
  }

  isImageElement = (element: Element) => {
    return element.link.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  isYoutubeElement = (element: Element) => {
    return element.link.match(/(youtube.)(\w)+(\/watch?)\?(v=)/) != null;
  };
}

const service = new ElementTypeService();
export default service;
