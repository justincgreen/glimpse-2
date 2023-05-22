// Generate Unique ID
export const generateID = () => {
  const dateString = Date.now().toString(36); // convert num to base 36 and stringify
  const randomString = Math.random().toString(36).substring(2, 8); // start at index 2 to skip decimal point
  return `${dateString}-${randomString}`;
}