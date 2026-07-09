/// <reference types="vite/client" />

declare module "docxtemplater-image-module-free" {
  type ImageModuleOptions = {
    centered?: boolean;
    getImage: (tagValue: string, tagName: string) => ArrayBuffer | Promise<ArrayBuffer>;
    getSize: (
      image: ArrayBuffer,
      tagValue: string,
      tagName: string
    ) => [number, number] | Promise<[number, number]>;
  };

  export default class ImageModule {
    constructor(options: ImageModuleOptions);
  }
}
