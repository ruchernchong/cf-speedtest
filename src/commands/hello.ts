export const helloCommand = async (args: string[]) => {
  const name = args[0] || "World";
  console.log(`Hello, ${name}!`);
};
