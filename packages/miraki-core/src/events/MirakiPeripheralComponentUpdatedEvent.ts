/* eslint-disable @typescript-eslint/no-explicit-any */
import { Event } from "react-pluggable";

export default class MirakiPeripheralsComponentUpdatedEvent extends Event {

    constructor(name: string) {
        super(name);
    }
  }