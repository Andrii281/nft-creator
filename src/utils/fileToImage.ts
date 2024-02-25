const IMAGE_FILE_TYPE = 'image';

export const fileToImage = (event: ProgressEvent<FileReader>, file: File): HTMLImageElement | null => {
    const [fileType] = file.type.split('/');

    if (fileType !== IMAGE_FILE_TYPE) return null;

    const image = new Image();
    image.src = String(event.target?.result);

    return image;
}