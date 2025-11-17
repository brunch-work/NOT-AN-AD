export type HomepageData = {
  home: HomeData;
  allHomepageProjects: HomepageProject[];
};

type HomepageProject = {
  title: string;
  media: {
    url: string;
    alt: string;
    title?: string;
    width: number;
    height: number;
  };
  id: string;
  projectType: string;
  publishedDate: string;
};

type HomeData = {
  intro: string;
  contact: string;
  id: string;
  reel: {
    url: string;
    alt: string;
  };
};

export const homepageQuery = `
query Homepage {
  home {
    reel {
      video {
        alt
        mp4Url
        width
        title
        duration
      }
    }
  }
}`;

export type DeckPageSections = {
  deck: {
    reel: {
      url: string;
      alt: string;
    };
    sections: Section[];
  };
};

export type Section = {
  id: string;
  slug: string;
  sectionTitle: string;
  projects: Project[];
};

export type Project = {
  id: string;
  slug: string;
  url: string;
  publicationDate: Date;
  clientName: string;
  projectDescription: string;
  assets: Asset[];
};

export type Asset = {
  id: string;
  projectType: string;
  asset: {
    format?: "mp4" | "webm" | "jpg" | "png" | "gif";
    alt: string;
    url: string;
    height: number;
    width: number;
    format: string;
  };
};

export const deckPageQuery = `
query DeckPage {
  deck {
    reel {
      url
      alt
    }
    sections {
      id
      slug
      sectionTitle
      projects {
        id
        clientName
        slug
        publicationDate
        url
        projectDescription
        assets {
          id
          projectType
          asset {
            alt
            url
            format
            height
            width
          }
        }
      }
    }
  }
}
`;

export const aboutQuery = `
  query about {
  about {
      about
      inquiries
      manifesto
      services
    }
  }
  `;

export const archiveQuery = `
query Archive {
  archive {
    assets {
      ... on ImageAssetRecord {
        id
        asset {
          alt
          url
          format
          height
          width
        }
      }
      ... on VideoAssetRecord {
        id
        preview {
          video {
            height
            width
            alt
            duration
            streamingUrl
          }
        }
        asset {
        format
          video {
            height
            width
            alt
            duration
            streamingUrl
          }
        }
      }
    }
  }
}
`;
