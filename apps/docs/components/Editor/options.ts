// Editor options
export const options = {
  placeholder: "Đang nghĩ gì vậy fence",
  autofocus: true,

  /**
   * onReady callback
   */
  onReady: () => {
    console.count("READY callback");
  },

  /**
   * onChange callback
   */
  onChange: (api: any, event: any) => {
    if (event.length > 1 && event[1].type === "block-added") {
      const idBlockRemove = event[1].detail.index;
      console.log({ idBlockRemove });
      api.blocks.delete(idBlockRemove);
    }
  },
};
