import { move, rect, rotate, ellipsis } from "./utils";
import { theme } from "./theme";
import { wrapper } from "./wrapper";
import { potionClick, potionRelease } from "./events";

type Column = 1 | 2 | 3;

const ingredientNames = [
  "Frog Paw",
  "Salamander Tail",
  "Cat Paw",
  "Rat Tooth",
  "Devil's Herb",
  "Barracuda Eyes",
];

const centerDeltaY = 15;

export function createPotions(rate: number) {
  const x1 = 115;
  const x2 = 320;
  const x3 = 530;
  const y1 = 162;
  const y2 = 395;
  return [
    createPotion(0, theme.potions[0], rate, x1, y1, 1),
    createPotion(1, theme.potions[1], rate, x1, y2, 1),
    createPotion(2, theme.potions[2], rate, x2, y1 + centerDeltaY, 2),
    createPotion(3, theme.potions[3], rate, x2, y2 + centerDeltaY, 2),
    createPotion(4, theme.potions[4], rate, x3, y1, 3),
    createPotion(5, theme.potions[5], rate, x3, y2, 3),
  ].join("");
}

function createPotion(
  index: number,
  color: string,
  rate: number,
  x: number,
  y: number,
  column: Column,
) {
  const id = `p-${index}`;
  setTimeout(() => {
    configEvents(id, color, rate);
  });
  return [potion(id, color, x, y, column), label(index, x, y, column)].join("");
}

function potion(
  id: string,
  color: string,
  x: number,
  y: number,
  column: Column,
) {
  const position = column === 3 ? 0 : 6;
  const capY = 25;
  return wrapper(
    move(
      rotate(
        [
          move(shape(theme.black50, 66, 66, true), 3, 3 + capY), // shadow
          move(shape(color, 66, 66), position, capY), // body
          move(rotate(rect(24, 30, color), -10), 21 + position, 12), // extension
          move(
            rotate(ellipsis(11.9, 6, 11.9, 6, color), -10),
            20 + position,
            6,
          ), // extension curvature
          move(rotate(rect(14, 17, theme.potionCap), -10), 24 + position, 0), // cap
          move(
            rotate(ellipsis(7, 3, 7, 3, theme.potionCap), -10),
            26.5 + position,
            14,
          ), // cap bottom
          move(
            rotate(
              ellipsis(6.5, 3, 6.5, 3, theme.potionCork, theme.potionCap, 1),
              -10,
            ),
            24 + position,
            -3,
          ), // cap top
          move(shape(theme.black30, 50, 50), position + 8, 8 + capY), // internal shadow
        ].join(""),
        10,
      ),
      3,
      0,
    ),
    75,
    75 + capY,
    { id, style: `top: ${y}px; left: ${x}px; z-index: ${theme.layers.potion}` },
  );
}

function shape(color: string, width: number, height: number, blur?: boolean) {
  let filter = "";
  if (blur === true) {
    filter = "filter:blur(4px)";
  }
  return wrapper(
    `
<g transform="translate(-510 143)">
<path d="m557-96c-4.6 4.6-26 8.1-32 5.1-5.8-3-16-23-15-29 1-6.4 17-22 23-23 6.4-1 26 9 29 15s-0.49 28-5.1 32z" fill="${color}" fill-opacity="1"/>
</g>`,
    width,
    height,
    { style: `cursor: move; ${filter}`, viewBoxWidth: 53, viewBoxHeight: 53 },
  );
}

export function configEvents(id: string, color: string, rate: number) {
  let clicked = false;
  let initialX = 0;
  let initialY = 0;
  let deltaX = 0;
  let deltaY = 0;

  const element = document.getElementById(id);
  if (element === null) {
    return;
  }
  function begin({ clientX, clientY }: { clientX: number; clientY: number }) {
    if (element === null) {
      return;
    }
    clicked = true;
    initialX = clientX;
    initialY = clientY;
    element.dispatchEvent(potionClick(color));
    element.style.zIndex = theme.layers.activePotion;
  }
  function move({ clientX, clientY }: { clientX: number; clientY: number }) {
    if (!clicked || element === null) {
      return;
    }
    deltaX = (clientX - initialX) / rate;
    deltaY = (clientY - initialY) / rate;
    element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    element.style.pointerEvents = "none";
  }
  function end() {
    if (!clicked || element === null) {
      return;
    }
    clicked = false;
    deltaX = 0;
    deltaY = 0;
    element.style.transform = "";
    element.style.pointerEvents = "";
    element.style.zIndex = theme.layers.potion;
    element.dispatchEvent(potionRelease(color));
  }
  element.addEventListener("mousedown", (event) => {
    begin(event);
  });
  element.addEventListener("touchstart", (event) => {
    begin(event.changedTouches[0]);
  });
  window.addEventListener("mousemove", (event) => {
    move(event);
  });
  window.addEventListener("touchmove", (event) => {
    move(event.changedTouches[0]);
  });
  window.addEventListener("mouseup", end);
  window.addEventListener("touchend", end);
}

function label(index: number, x: number, y: number, column: Column) {
  let rotation = 0;
  let width = 120;
  if (column === 1) {
    rotation = 12;
    width = 110;
  } else if (column === 3) {
    rotation = -12;
    width = 110;
  }
  const left = x - 20;
  let top = y - 60;
  if (column === 2) {
    top += 5;
  }
  const label = ingredientNames[index];
  return `<p style="left: ${left}px; top: ${top}px; width: ${width}px; transform: rotate(${rotation}deg)">${label}</p>`;
}
