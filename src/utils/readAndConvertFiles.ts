type Converter<TConverted> = (event: ProgressEvent<FileReader>, file: File) => TConverted;
type OnLoadEnd<TConverted> = (convertedFile: TConverted, file: File) => void;

export const readAndConvertFiles = <TConverted>(
  files: File[],
  converter: Converter<TConverted>,
  onLoadEnd: OnLoadEnd<TConverted>,
) => {
  files.forEach((file) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onloadend = (event) => {
      const convertedFile = converter(event, file);

      onLoadEnd(convertedFile, file);
    };
  });
};
