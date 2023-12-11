import { createElement } from "react";
import { render } from "react-dom";
import { isEmpty } from "lodash";

import TimelineItemE from "../TimelineItemE";

export class TimeLineBlock {
  api: any;
  data: { dataItem: string; itemCreated: string };
  CSS: { wrapper: string };
  nodes: { holder: HTMLElement | null };
  config: any;

  static get toolbox() {
    return {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 15v4H5v-4h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 18.5c-.82 0-1.5-.67-1.5-1.5s.68-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM19 5v4H5V5h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 8.5c-.82 0-1.5-.67-1.5-1.5S6.18 5.5 7 5.5s1.5.68 1.5 1.5S7.83 8.5 7 8.5z"/></svg>`,
      title: "Timeline",
    };
  }

  constructor({ data, config, api }: { data: any; config: any; api: any }) {
    this.api = api;
    this.config = config;
    this.data = data || {};

    this.CSS = {
      wrapper: "demo-timeline",
    };

    this.nodes = {
      holder: null,
    };
  }

  render() {
    const rootNode = document.createElement("div");
    this.nodes.holder = rootNode;

    const onDataChange = (event: any) => {
      const newData = {
        dataItem: event?.target?.value,
        itemCreated: new Date().toLocaleTimeString(),
        readOnly: false,
      };
      this.data = {
        ...newData,
      };
    };

    const onKeyDown = (event: any) => {
      const index = this.api.blocks.getCurrentBlockIndex();

      if (event.target.value === "" && event.key === "Backspace") {
        this.api.blocks.delete(index);
      }
    };

    const element = createElement(TimelineItemE, {
      onDataChange,
      onKeyDown,
      data: this.data,
    });

    render(element, rootNode);
    return this.nodes.holder;
  }

  validate(savedData: any) {
    if (isEmpty(savedData) || savedData.dataItem === "") {
      return false;
    } else {
      return true;
    }
  }

  save() {
    return this.data;
  }
}
