import React from "react"
import { Helmet } from "react-helmet"
import Layout from '../components/Layout'


export default function Template(props ) {
  console.log('pages', props)
  const {article} = props.pageContext
  console.log(article.re)
  return (
      <Layout>
    <div className="">
      <Helmet title={`${article.title}`} />
      <div className="t">
        <h1>{article.title}</h1>
        <div className="">
          {/* {article.content} */}
        </div>
      </div>
    </div>
    </Layout>
  )
}
