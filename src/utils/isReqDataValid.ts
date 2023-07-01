export const isReqDataValid = (data: string) => {
  const parsedData = JSON.parse(data);

  if (
    typeof parsedData?.username !== 'string' ||
    typeof parsedData?.age !== 'number' ||
    !Array.isArray(parsedData?.hobbies)
  ) {
    return false;
  }

  const hobbies = parsedData.hobbies;

  if (Array.isArray(hobbies) && hobbies.length) {
    return hobbies.every((hobby) => typeof hobby === 'string');
  }

  return true;
};
