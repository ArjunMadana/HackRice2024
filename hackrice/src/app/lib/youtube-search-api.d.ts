declare module 'youtube-search-api' {
    export function GetListByKeyword(
      keyword: string,
      includeVideos: boolean,
      maxResults: number,
      filters: Array<{ type: string }>
    ): Promise<{ items: Array<{ id: string }> }>;
  }