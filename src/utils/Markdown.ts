import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export default (text: string): string => {
  return md.render(text);
};
