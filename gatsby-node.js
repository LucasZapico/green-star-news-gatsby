require('dotenv/config');
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const axios = require('axios');


const makeURL = (country, category) => {
  return `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.NEWS_API_KEY}`;
}

const getTopHeadlines = () =>
  axios.get(makeURL('us', 'business')).then(({data}) => {
      return data.articles
  });


// Promise API
exports.createPages = async ({actions: {createPage}, reporter}) => {
  console.log('create api pages ran')
  const Articles = await getTopHeadlines()
  // todo: create all article pages
  // createPage({
  //   path: `/`,
  //   component: path.resolve(`src/templates/default.js`),
  //   context: {Articles}
  // })

  // Handle errors
  if (Articles.errors) {
    reporter.panicOnBuild(`Error while running API query.`)
    return
  }

  console.log('article data', Articles)
  Articles.forEach((article, index) => {
    createPage({
      path: `/business/${index}/`,
      component: require.resolve('./src/templates/articleTemplate.js'),
      context: { article }
    });
  })
}


// // Log out information after a build is done
// exports.onPostBuild = ({ reporter }) => {
//   reporter.info(`Your Gatsby site has been built!`)
// }

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions
//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       name: `path`,
//       node,
//       value,
//     })
//   }
// }



// exports.createPages = async ({ actions, graphql, reporter }) => {
//   const { createPage } = actions

//   const Template = path.resolve(`src/templates/default.js`)

//   const result = await graphql(`
//     {
//       allMarkdownRemark(
//         filter: { frontmatter: { draft: { eq: false } } }
//         sort: { order: DESC, fields: [frontmatter___date] }
//         limit: 1000
//       ) {
//         edges {
//           node {
//             id
//             html
//             frontmatter {
//               path
//             }
//           }
//         }
//       }
//     }
//   `)

//   // Handle errors
//   if (result.errors) {
//     reporter.panicOnBuild(`Error while running GraphQL query.`)
//     return
//   }
//   const posts = result.data.allMarkdownRemark.edges

//   posts.forEach(({ node }, index) => {
//     createPage({
//       path: node.frontmatter.path,
//       component: Template,
//       context: {
//         prev: index === 0 ? null : posts[index - 1].node,
//         next: index === posts.length - 1 ? null : posts[index + 1].node,
//       }, // additional data can be passed via context
//     })
//   })
// }
