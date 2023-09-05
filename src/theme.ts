export const theme = {
  bg: "rgb(36,28,28)",
  bg0: "rgba(36,28,28,0)",
  bg5: "rgba(36,28,28,0.02)",
  wall: "rgb(108,83,83)",
  brick: "rgba(0,0,0,0.1)",
  l: "rgba(255,0,255,0.3)",
  shelfFront: "rgb(53,39,39)",
  shelfSide: "rgb(39,29,29)",
  shelfBottom: "rgb(24,18,18)",
  potionCap: "#520",
  potionCork: "#a40",
  black50: "rgba(0,0,0,0.5)",
  black30: "rgba(0,0,0,0.3)",
  ids: {
    potion: (id: number) => `potion-${id}`,
  },
  layers: {
    potion: "2",
    shelf: "3",
    activePotion: "4",
    cauldronLight: "5",
  },
};
