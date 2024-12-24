export interface Repository {
  name: string;
  url: string;
  description: string;
  categories: string[];
}

export interface Release {
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  assets: Asset[];
}

export interface Asset {
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
}