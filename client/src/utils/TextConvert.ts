export const TextConvert = (text: string): { type: string; text: string }[] => {
  const splitedText = text.split("``");
  const result: { type: string; text: string }[] = [];
  for (let i = 1; i < splitedText.length; i += 2) {
    const chunk = splitedText[i].trim();
    if (!chunk) continue;
    
    const part = chunk.split("\\/n\\/");

    if (part.length > 1) {
      const [type, text] = part;
      result.push({ type, text });
    } else {
      result.push({ type: "text", text: chunk });
    }
  }

  return result;
};