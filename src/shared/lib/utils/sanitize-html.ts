export const sanitizeHtml = (html: string): string => {
    return html
      .replace(/(\r\n|\n|\r){3,}/g, '\n\n') // 3개 이상 줄바꿈 → 2개
      .replace(/(\r\n|\n|\r)/g, '\n') // 나머지는 통일성 있게 줄바꿈
      .trim();   
};