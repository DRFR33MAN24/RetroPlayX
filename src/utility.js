export const getFileNameAndExtension = path => {
  const fileName = path?.substring(
    file.path?.lastIndexOf('/') + 1,
    file.path?.length,
  );
  const extention = fileName?.substring(
    fileName?.lastIndexOf('.') + 1,
    fileName?.length,
  );

  return {fileName, extention};
};
