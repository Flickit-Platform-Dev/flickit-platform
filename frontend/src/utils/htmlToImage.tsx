import { toPng } from "html-to-image";

export const htmlToImage = async (element: any) => {
  try {
    const dataUrl = await toPng(element);
    return dataUrl;
  } catch (error) {
    console.error("Error converting HTML to image:", error);
    return null;
  }
};
