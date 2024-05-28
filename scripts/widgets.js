import React from 'react';
import ReactDOM from 'react-dom';
import WidgetRenderer from './widgets/WidgetRenderer.js';
import { useAllWidgetsDependencies } from './widgets/widgetList.js';
import { getPageElements } from './widgets/PageElements.js';

/**
 * Retrieve a component to be rendered for the widget configs given
 *
 * @param props
 * @returns {Array<JSX.Element>} An array of JSX elements representing the rendered widgets
 */
async function getWidgetsBuilder() {
  const elements = getPageElements();
  const widgetsList = useAllWidgetsDependencies(); // Fetch the widgets list once outside the loop
  await elements.map(async (element) => {
    const Component = widgetsList[element](); // Assuming widgetsList is an object mapping widget names to components
    await waitForElement(`#${element}`);
    const container = document.getElementById(element).parentNode.appendChild(document.createElement('div'));
    ReactDOM.render(await <WidgetRenderer {...{
      key: element, // Ensure each rendered component has a unique key
      Component,
    }} />, container);
  });
}

async function waitForElement(selector, interval = 100, maxAttempts = 10) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const intervalId = setInterval(() => {
      attempts++;
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(intervalId);
        resolve(element);
      } else if (attempts >= maxAttempts) {
        clearInterval(intervalId);
        reject(new Error(`Element with selector '${selector}' not found after ${maxAttempts} attempts`));
      }
    }, interval);
  });
}

getWidgetsBuilder();
