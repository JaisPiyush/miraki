import { Event } from "react-pluggable";

//"sidebar" | "view_container" | "peripheral"
export default class ComponentUpdatedEvent extends Event {
    position: string;
    constructor(name: string, position: string) {
      super(name);
      this.position = position;
    }
  }