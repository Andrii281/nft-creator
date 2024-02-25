export const getFileName = (file: File) => {
  const [name] = file.name.split(/\.(?=[^.]*$)/);

  return name;
};