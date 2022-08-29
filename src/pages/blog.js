import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../components/Layout";

export const query = graphql`
  query graphAllBlogs {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          title
          date
          time
          description
          category
          imgurl
        }
        fields {
          slug
        }
      }
    }
  }
`;

export default function Blog({ data }) {
  return (
    <>
      <title>Blog | Tuhin</title>
      <Layout />
      <div className="blog_header">
        <h1>Blog</h1>
        <p>I am not a good blogger, but I love to share my experiences.</p>
      </div>
      <div className="blog_container">
        {data.allMdx.nodes.map((data, no) => (
          <div className="blog_card" key={no}>
            <div className="blog_card-header">
              <img src={data.frontmatter.imgurl} alt={data.frontmatter.title} />
            </div>
            <div className="blog_card-body">
              <p className="tag">
                <span className="">{data.frontmatter.category}</span>{" "}
                <span className="">{data.frontmatter.time} min read</span>
              </p>
              <Link to={"../.." + data.fields.slug} ><h4>{data.frontmatter.title}</h4></Link>
              <p className="small_content">{data.frontmatter.description}</p>
              <Link to={"../.." + data.fields.slug} className="btn">
                Read More ➡
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// pages/index.tsx

export const query = graphql`
  query BlogList($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        ...NodeForBlogList
      }
    }
    allSitePage {
      nodes {
        path
      }
    }
  }
`;

// gatsby-node.js

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const posts = result.data.allMarkdownRemark.edges;
  // [Create each blog post page]

  // Create paginated blog list pages
  const postsPerPage = 20;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    const firstPage = i === 0;
    const currentPage = i + 1;
    createPage({
      path: firstPage ? "/" : `/page/${currentPage}`,
      component: path.resolve("./src/templates/BlogList.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage,
      },
    });
  });
};
