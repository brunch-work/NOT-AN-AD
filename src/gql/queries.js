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
        projectDescription
        assets {
          id
          projectType
          asset {
            alt
            url
            height
            width
          }
        }
      }
    }
  }
}
`;