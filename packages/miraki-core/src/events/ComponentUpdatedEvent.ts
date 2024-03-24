import { Event } from "react-pluggable";

export default class ComponentUpdatedEvent extends Event {
    position: string;
    constructor(name: string, position: "sidebar" | "view_container" | "peripheral") {
      super(name);
      this.position = position;
    }
  }