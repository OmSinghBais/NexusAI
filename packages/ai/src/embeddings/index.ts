export function embedText(text: string): number[] {
  return text.split('').map((char) => char.charCodeAt(0) % 97);
}
