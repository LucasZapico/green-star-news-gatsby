require("dotenv/config")
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const axios = require("axios")
const querystring = require('querystring');

const makeNewsAPIURL = (country, category) => {
  return `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
}

const getTopHeadlines = async (country, category) =>
  await axios.get(makeNewsAPIURL(country, category)).then(({ data }) => {
    data.articles.forEach(a => a['category'] = category)
    return data.articles
  }).catch(err => {console.log(err)})
    



// Promise API
exports.createPages = async ({ actions: { createPage }, reporter }) => {
  console.log("create api pages ran")
  
  const [articlesOne, articlesTwo   ] = await Promise.all( [getTopHeadlines('us', 'business'), getTopHeadlines('us', 'technology')] )
  const Articles = articlesOne.concat(articlesTwo)
  // Handle errors
  if (Articles.errors) {
    reporter.panicOnBuild(`Error while running API query.`)
    return
  }

  Articles.forEach((article, index) => {
    let slug = article.title
    slug = slug.replace(/[^a-z0-9+]+/gi, "-")
    console.log(slug)
    createPage({
      path: `/${article.category}/${slug}/`,
      component: require.resolve("./src/templates/articleTemplate.js"),
      context: { article },
    })
  })
  
}
