exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
  
    const poemPostTemplate = require.resolve(`./src/templates/poemPage.js`)
  
    const result = await graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `)
  
    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
  
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.slug,
        component: poemPostTemplate,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
          id: node.frontmatter.post_id,
        },
      })
    })
  }