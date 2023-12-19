import { createElement } from "react";

export function make(
  tagName: any,
  classNames: any = null,
  attributes: any = {}
) {
  const el = document.createElement(tagName);

  if (Array.isArray(classNames)) {
    el.classList.add(...classNames);
  } else if (classNames) {
    el.classList.add(classNames);
  }

  for (const attrName in attributes) {
    el[attrName] = attributes[attrName];
  }
  return el;
}

export function makeByReact(
  tagName: any,
  classNames: any = null,
  attributes: any = {}
) {
  const el = createElement(
    tagName,
    { className: classNames, ...attributes },
    null
  );

  return el;
}
