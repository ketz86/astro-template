export default `
query allPages {
  pages {
    nodes {
      id
      slug
      language {
        code
      }
      template {
        templateName
        ...on Template_Homepage {
          homepageFields {
            hero {
              title
              subtitle
            }
          }
        }
      }
      translations {
        slug
        language {
          code
        }
      }
    }
  }
}`