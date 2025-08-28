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
    intro
    contact
    id
    reel {
      url
      alt
    }
  }
  allHomepageProjects {
    title
    media {
      url
      alt
      title
      width
      height
    }
    id
    projectType
    publishedDate
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
