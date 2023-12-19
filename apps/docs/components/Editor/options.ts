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
  },
};
