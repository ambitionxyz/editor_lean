// import { IconPicture } from "@codexteam/icons";
import { IconPicture, IconCross } from "@codexteam/icons";
import { make } from "./utils/dom";

/**
 * Class for working with UI:
 *  - rendering base structure
 *  - show/hide preview
 *  - apply tune view
 */

enum Status {
  EMPTY = "EMPTY",
  UPLOADING = "UPLOADING",
  FILLED = "FILLED",
}

export default class Ui {
  api: any;
  config: any;
  numberBlocks: any;
  sendMessage: any;
  destroyEvent: any;
  onSelectFile: any;
  readOnly: any;
  nodes: {
    wrapper: any;
    imageContainer: any;
    fileButton: any;
    closeButton: any;
    imageEl: any;
    imagePreloader: any;
    // caption: any;
  };
  /**
   * @param {object} ui - image tool Ui module
   * @param {object} ui.api - Editor.js API
   * @param {ImageConfig} ui.config - user config
   * @param {Function} ui.onSelectFile - callback for clicks on Select file button
   * @param {boolean} ui.readOnly - read-only mode flag
   */
  constructor({
    api,
    config,
    numberBlocks,
    sendMessage,
    onSelectFile,
  }: {
    api: any;
    config: any;
    numberBlocks: any;
    sendMessage: any;
    onSelectFile: any;
  }) {
    this.api = api;
    this.config = config;
    this.numberBlocks = numberBlocks;
    this.sendMessage = sendMessage;
    this.onSelectFile = onSelectFile;
    this.nodes = {
      wrapper: make("div", [
        this.CSS.baseClass,
        this.CSS.wrapper,
        "--------->wrapper---itemm",
      ]),
      imageContainer: make("div", [this.CSS.imageContainer]),
      fileButton: this.createFileButton(),
      closeButton: this.createCloseButton(),
      imageEl: undefined,
      imagePreloader: make("div", this.CSS.imagePreloader),
      // caption: make("div", [this.CSS.input, this.CSS.caption], {
      //   contentEditable: !this.readOnly,
      // }),
    };

    /**
     * Create base structure
     *  <wrapper>
     *    <image-container>
     *      <image-preloader />
     *    </image-container>
     *    <caption />
     *    <select-file-button />
     *  </wrapper>
     */
    this.nodes.imageContainer.appendChild(this.nodes.imagePreloader);
    this.nodes.imageContainer.appendChild(this.nodes.closeButton);
    this.nodes.wrapper.appendChild(this.nodes.imageContainer);
    this.nodes.wrapper.appendChild(this.nodes.fileButton);
  }

  /**
   * CSS classes
   *
   * @returns {object}
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      loading: this.api.styles.loader,
      input: this.api.styles.input,
      button: this.api.styles.button,

      /**
       * Tool's classes
       */
      wrapper: "image-tool",
      imageContainer: "image-tool__image",
      imagePreloader: "image-tool__image-preloader",
      imageEl: "image-tool__image-picture",
      caption: "image-tool__caption",
      buttonClose: "button-close",
    };
  }

  /**
   * Ui statuses:
   * - empty
   * - uploading
   * - filled
   *
   * @returns {{EMPTY: string, UPLOADING: string, FILLED: string}}
   */
  static get status() {
    return {
      EMPTY: "empty",
      UPLOADING: "loading",
      FILLED: "filled",
    };
  }

  /**
   * Renders tool UI
   *
   * @param {ImageToolData} toolData - saved tool data
   * @returns {Element}
   */
  render(toolData: any) {
    if (!toolData.file || Object.keys(toolData.file).length === 0) {
      this.toggleStatus(Ui.status.EMPTY);
    } else {
      this.toggleStatus(Ui.status.UPLOADING);
    }
    return this.nodes.wrapper;
  }

  /**
   * Creates upload-file button
   *
   * @returns {Element}
   */
  createFileButton() {
    const button = make("div", [this.CSS.button]);

    button.innerHTML =
      this.config.buttonContent ||
      `${IconPicture} ${this.api.i18n.t("Thêm ảnh/video")}`;

    button.addEventListener("click", () => {
      this.onSelectFile();
    });
    return button;
  }

  createCloseButton() {
    const button = make("div", [this.CSS.buttonClose]);
    button.innerHTML = IconCross;
    button.addEventListener("click", () => {
      const indexCurrentBlock = this.api.blocks.getCurrentBlockIndex();
      this.api.blocks.delete(indexCurrentBlock);
      this.sendMessage("showImage", false);
    });

    return button;
  }

  /**
   * Shows uploading preloader
   *
   * @param {string} src - preview source
   * @returns {void}
   */
  showPreloader(src: any) {
    this.nodes.imagePreloader.style.backgroundImage = `url(${src})`;

    this.toggleStatus(Ui.status.UPLOADING);
  }

  /**
   * Hide uploading preloader
   *
   * @returns {void}
   */
  hidePreloader() {
    this.nodes.imagePreloader.style.backgroundImage = "";
    this.toggleStatus(Ui.status.EMPTY);
  }

  /**
   * Shows an image
   *
   * @param {string} url - image source
   * @returns {void}
   */
  fillImage(url: any) {
    /**
     * Check for a source extension to compose element correctly: video tag for mp4, img — for others
     */
    const tag = /\.mp4$/.test(url) ? "VIDEO" : "IMG";

    const attributes: any = {
      src: url,
    };

    /**
     * We use eventName variable because IMG and VIDEO tags have different event to be called on source load
     * - IMG: load
     * - VIDEO: loadeddata
     *
     * @type {string}
     */
    let eventName = "load";

    /**
     * Update attributes and eventName if source is a mp4 video
     */
    if (tag === "VIDEO") {
      /**
       * Add attributes for playing muted mp4 as a gif
       *
       * @type {boolean}
       */
      attributes.autoplay = true;
      attributes.loop = true;
      attributes.muted = true;
      attributes.playsinline = true;

      /**
       * Change event to be listened
       *
       * @type {string}
       */
      eventName = "loadeddata";
    }

    /**
     * Compose tag with defined attributes
     *
     * @type {Element}
     */
    this.nodes.imageEl = make(tag, this.CSS.imageEl, attributes);

    /**
     * Add load event listener
     */
    this.nodes.imageEl.addEventListener(eventName, () => {
      this.toggleStatus(Ui.status.FILLED);

      /**
       * Preloader does not exists on first rendering with presaved data
       */
      if (this.nodes.imagePreloader) {
        this.nodes.imagePreloader.style.backgroundImage = "";
      }
    });

    this.nodes.imageContainer.appendChild(this.nodes.imageEl);
  }

  /**
   * Shows caption input
   *
   * @param {string} text - caption text
   * @returns {void}
   */
  // fillCaption(text: any) {
  //   if (this.nodes.caption) {
  //     this.nodes.caption.innerHTML = text;
  //   }
  // }

  /**
   * Changes UI status
   *
   * @param {string} status - see {@link Ui.status} constants
   * @returns {void}
   */

  toggleStatus(status: string) {
    for (const statusType in Ui.status) {
      if (Object.prototype.hasOwnProperty.call(Ui.status, statusType)) {
        const uiStatus: Status = Status[statusType as keyof typeof Status];

        if (status === Ui.status[uiStatus]) {
          this.nodes.wrapper.classList.toggle(
            `${this.CSS.wrapper}--${Ui.status[uiStatus]}`,
            true
          );
        } else {
          this.nodes.wrapper.classList.remove(
            `${this.CSS.wrapper}--${Ui.status[uiStatus]}`
          );
        }
      }
    }
  }

  /**
   * Apply visual representation of activated tune
   *
   * @param {string} tuneName - one of available tunes {@link Tunes.tunes}
   * @param {boolean} status - true for enable, false for disable
   * @returns {void}
   */
  applyTune(tuneName: any, status: any) {
    this.nodes.wrapper.classList.toggle(
      `${this.CSS.wrapper}--${tuneName}`,
      status
    );
  }
}
