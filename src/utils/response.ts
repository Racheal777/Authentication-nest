export const responseData = (
  data: any,
  message: string,
  statusCode: number,
) => {
  return {
    data,
    message,
    statusCode,
  };
};
