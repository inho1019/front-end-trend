export const sanitizeHtml = (html: string): string => {
    return html
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<link[^>]*>/gi, '');
};