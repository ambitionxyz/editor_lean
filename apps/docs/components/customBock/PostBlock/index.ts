import "./index.css";

import Ui from "./ui";
import Uploader from "./uploader";

import { IconPicture } from "@codexteam/icons";

/**
 * @typedef {object} ImageConfig
 * @description Config supported by Tool
 * @property {object} endpoints - upload endpoints
 * @property {string} endpoints.byFile - upload by file
 * @property {string} endpoints.byUrl - upload by URL
 * @property {string} field - field name for uploaded image
 * @property {string} types - available mime-types
 * @property {string} captionPlaceholder - placeholder for Caption field
 * @property {object} additionalRequestData - any data to send with requests
 * @property {object} additionalRequestHeaders - allows to pass custom headers with Request
 * @property {string} buttonContent - overrides for Select File button
 * @property {object} [uploader] - optional custom uploader
 * @property {function(File): Promise.<UploadResponseFormat>} [uploader.uploadByFile] - method that upload image by File
 * @property {function(string): Promise.<UploadResponseFormat>} [uploader.uploadByUrl] - method that upload image by URL
 */

/**
 * @typedef {object} UploadResponseFormat
 * @description This format expected from backend on file uploading
 * @property {number} success - 1 for successful uploading, 0 for failure
 * @property {object} file - Object with file data.
 *                           'url' is required,
 *                           also can contain any additional data that will be saved and passed back
 * @property {string} file.url - [Required] image source URL
 */

export default class PostTool {
  uploadedImageURLs: any[] = [];
  api: any;
  block: any;
  config: {
    endpoints: any;
    additionalRequestData: any;
    additionalRequestHeaders: any;
    field: any;
    types: any;
    captionPlaceholder: any;
    buttonContent: any;
    uploader: any;
    actions: any;
  };
  uploader: Uploader;
  ui: Ui;
  private _data: any;
  eventShowImage: any;
  events: any;

  static get toolbox() {
    return {
      icon: IconPicture,
      title: "Image",
    };
  }

  static get tunes() {
    return [];
  }

  getNumberBlocks() {
    return this.api.blocks.getBlocksCount();
  }

  constructor({
    data,
    config,
    api,
    block,
  }: {
    data: any;
    config: any;
    api: any;
    block: any;
  }) {
    this.api = api;
    this.block = block;

    /**
     * Tool's initial config
     */
    this.config = {
      endpoints: config.endpoints || "",
      additionalRequestData: config.additionalRequestData || {},
      additionalRequestHeaders: config.additionalRequestHeaders || {},
      field: config.field || "image",
      types: config.types || "image/*",
      captionPlaceholder: this.api.i18n.t(
        config.captionPlaceholder || "Caption"
      ),
      buttonContent: config.buttonContent || "",
      uploader: config.uploader || undefined,
      actions: config.actions || [],
    };

    /**
     * Module for file uploading
     */
    this.uploader = new Uploader({
      config: this.config,
      onUpload: (response: any) => this.onUpload(response),
      onError: (error: any) => this.uploadingFailed(error),
    });

    this.ui = new Ui({
      api,
      config: this.config,
      numberBlocks: this.getNumberBlocks(),
      onSelectFile: () => {
        this.uploader.uploadSelectedFile({
          onPreview: (src: any) => {
            this.ui.showPreloader(src);
          },
        });
      },
    });

    /**
     * Set saved state
     */
    this._data = {};
    this.data = data;

    this.events = this.handleExternalMessage.bind(this);

    this.api.listeners.on(window, "showBtn", this.events);
  }

  handleExternalMessage(event: any) {
    this.api.blocks.insert("postTool");
    const currenBlockIsEmpty = this.getCurentBlock();
    window.removeEventListener("showBtn", this.events);
  }

  /**
   * Renders Block content
   *
   * @public
   *
   * @returns {HTMLDivElement}
   */
  render() {
    return this.ui.render(this.data);
  }

  /**
   * Validate data: check if Image exists
   *
   * @param {ImageToolData} savedData — data received after saving
   * @returns {boolean} false if saved data is not correct, otherwise true
   * @public
   */
  // validate(savedData: any) {
  //   return savedData.file && savedData.file.url;
  // }

  /**
   * Return Block data
   *
   * @public
   *
   * @returns {ImageToolData}
   */
  save() {
    return this.data;
  }

  renderSettings() {
    // Merge default tunes with the ones that might be added by user
    // @see https://github.com/editor-js/image/pull/49
    const tunes = PostTool.tunes.concat(this.config.actions);

    return tunes.map((tune: any) => ({
      icon: tune.icon,
      label: this.api.i18n.t(tune.title),
      name: tune.name,
      toggle: tune.toggle,
      isActive: this.data[tune.name],
      onActivate: () => {
        /* If it'a user defined tune, execute it's callback stored in action property */
        if (typeof tune.action === "function") {
          tune.action(tune.name);

          return;
        }
        this.tuneToggled(tune.name);
      },
    }));
  }

  static get pasteConfig() {
    return {
      /**
       * Paste HTML into Editor
       */
      tags: [
        {
          img: { src: true },
        },
      ],
      /**
       * Paste URL of image into the Editor
       */
      patterns: {
        image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png|svg|webp)(\?[a-z0-9=]*)?$/i,
      },

      /**
       * Drag n drop file from into the Editor
       */
      files: {
        mimeTypes: ["image/*"],
      },
    };
  }

  isFirstBlock() {
    return this.getCurentBlock() === 0;
  }
  getCurentBlock() {
    return this.api.blocks.getCurrentBlockIndex();
  }

  // rendered() {
  //   this.ui.nodes.fileButton.click();
  // }

  async onPaste(event: any) {
    event.preventDefault();
    if (this.isFirstBlock()) {
      // this.api.blocks.insertNewBlock();
    }

    switch (event.type) {
      case "tag": {
        const image = event.detail.data;

        /** Images from PDF */
        if (/^blob:/.test(image.src)) {
          const response = await fetch(image.src);
          const file = await response.blob();

          this.uploadFile(file);
          break;
        }

        this.uploadUrl(image.src);
        break;
      }
      case "pattern": {
        const url = event.detail.data;

        this.uploadUrl(url);
        break;
      }
      case "file": {
        const file = event.detail.file;
        this.uploadFile(file);
        break;
      }
    }
  }

  set data(data: any) {
    this.image = data.file;

    // this._data.caption = data.caption || "";
    // this.ui.fillCaption(this._data.caption);
  }

  get data() {
    return this._data;
  }

  set image(file: any) {
    // this._data.file = file || {};
    if (file) {
      this.uploadedImageURLs.push(file);
    }
    this._data.file = this.uploadedImageURLs;

    if (file && file.url) {
      this.ui.fillImage(file.url);
    }
  }

  tuneToggled(tuneName: any) {
    // inverse tune state
    this.setTune(tuneName, !this._data[tuneName]);
  }

  /**
   * Set one tune
   *
   * @param {string} tuneName - {@link Tunes.tunes}
   * @param {boolean} value - tune state
   * @returns {void}
   */
  setTune(tuneName: string, value: any) {
    this._data[tuneName] = value;

    this.ui.applyTune(tuneName, value);

    if (tuneName === "stretched") {
      /**
       * Wait until the API is ready
       */
      Promise.resolve()
        .then(() => {
          this.block.stretched = value;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  uploadUrl(url: any) {
    this.ui.showPreloader(url);
    this.uploader.uploadByUrl(url);
  }

  uploadFile(file: any) {
    this.uploader.uploadByFile(file, {
      onPreview: (src: any) => {
        this.ui.showPreloader(src);
        this.api.blocks.insertNewBlock();
      },
    });
  }

  uploadingFailed(errorText: any) {
    console.log("Image Tool: uploading failed because of", errorText);

    this.api.notifier.show({
      message: this.api.i18n.t("Couldn’t upload image. Please try another."),
      style: "error",
    });
    this.ui.hidePreloader();
  }

  onUpload(response: any) {
    console.log("onUpload");
    if (response.success && response.file) {
      this.image = response.file;
    } else {
      this.uploadingFailed("incorrect response: " + JSON.stringify(response));
    }
  }
}
