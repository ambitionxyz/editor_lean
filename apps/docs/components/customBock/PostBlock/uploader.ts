import ajax from "@codexteam/ajax";
import isPromise from "./utils/isPromise";

export default class Uploader {
  config: any;
  onUpload: any;
  onError: any;
  /**
   * @param {object} params - uploader module params
   * @param {ImageConfig} params.config - image tool config
   * @param {Function} params.onUpload - one callback for all uploading (file, url, d-n-d, pasting)
   * @param {Function} params.onError - callback for uploading errors
   */
  constructor({
    config,
    onUpload,
    onError,
  }: {
    config: any;
    onUpload: any;
    onError: any;
  }) {
    this.config = config;
    this.onUpload = onUpload;
    this.onError = onError;
  }

  /**
   * Handle clicks on the upload file button
   * Fires ajax.transport()
   *
   * @param {Function} onPreview - callback fired when preview is ready
   */
  uploadSelectedFile({ onPreview }: { onPreview: any }) {
    const preparePreview = function (file: File) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        onPreview(e.target.result);
      };
    };

    /**
     * Custom uploading
     * or default uploading
     */
    let upload;

    // custom uploading
    if (
      this.config.uploader &&
      typeof this.config.uploader.uploadByFile === "function"
    ) {
      upload = ajax
        .selectFiles({ accept: this.config.types })
        .then((files: any) => {
          preparePreview(files[0]);

          const customUpload = this.config.uploader.uploadByFile(files[0]);

          if (!isPromise(customUpload)) {
            console.warn(
              "Custom uploader method uploadByFile should return a Promise"
            );
          }

          return customUpload;
        });

      // default uploading
    } else {
      upload = ajax
        .transport({
          url: this.config.endpoints.byFile,
          data: this.config.additionalRequestData,
          accept: this.config.types,
          headers: this.config.additionalRequestHeaders,
          beforeSend: (files: any) => {
            preparePreview(files[0]);
          },
          fieldName: this.config.field,
        })
        .then((response: any) => response.body);
    }

    upload
      .then((response: any) => {
        this.onUpload(response);
      })
      .catch((error: any) => {
        this.onError(error);
      });
  }

  /**
   * Handle clicks on the upload file button
   * Fires ajax.post()
   *
   * @param {string} url - image source url
   */
  uploadByUrl(url: any) {
    let upload;

    /**
     * Custom uploading
     */
    if (
      this.config.uploader &&
      typeof this.config.uploader.uploadByUrl === "function"
    ) {
      upload = this.config.uploader.uploadByUrl(url);

      if (!isPromise(upload)) {
        console.warn(
          "Custom uploader method uploadByUrl should return a Promise"
        );
      }
    } else {
      /**
       * Default uploading
       */
      upload = ajax
        .post({
          url: this.config.endpoints.byUrl,
          data: Object.assign(
            {
              url: url,
            },
            this.config.additionalRequestData
          ),
          type: ajax.contentType.JSON,
          headers: this.config.additionalRequestHeaders,
        })
        .then((response: any) => response.body);
    }

    upload
      .then((response: any) => {
        this.onUpload(response);
      })
      .catch((error: any) => {
        this.onError(error);
      });
  }

  /**
   * Handle clicks on the upload file button
   * Fires ajax.post()
   *
   * @param {File} file - file pasted by drag-n-drop
   * @param {Function} onPreview - file pasted by drag-n-drop
   */
  uploadByFile(file: any, { onPreview }: { onPreview: any }) {
    /**
     * Load file for preview
     *
     * @type {FileReader}
     */
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      onPreview(e.target.result);
    };

    let upload;

    /**
     * Custom uploading
     */
    if (
      this.config.uploader &&
      typeof this.config.uploader.uploadByFile === "function"
    ) {
      upload = this.config.uploader.uploadByFile(file);

      if (!isPromise(upload)) {
        console.warn(
          "Custom uploader method uploadByFile should return a Promise"
        );
      }
    } else {
      /**
       * Default uploading
       */
      const formData = new FormData();

      formData.append(this.config.field, file);

      if (
        this.config.additionalRequestData &&
        Object.keys(this.config.additionalRequestData).length
      ) {
        Object.entries(this.config.additionalRequestData).forEach(
          ([name, value]) => {
            formData.append(name, value as any);
          }
        );
      }

      upload = ajax
        .post({
          url: this.config.endpoints.byFile,
          data: formData,
          type: ajax.contentType.JSON,
          headers: this.config.additionalRequestHeaders,
        })
        .then((response: any) => {
          return response.body;
        });
    }

    upload
      .then((response: any) => {
        this.onUpload(response);
      })
      .catch((error: Error) => {
        this.onError(error);
      });
  }
}
