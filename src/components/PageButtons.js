import { Link } from "gatsby";
import React from "react";
import { SitePageContext } from "../../graphql-schema";

type Props = {
  pageContext: SitePageContext;
};

export default function PageButtons({ pageContext }: Props) {
  const { numPages, currentPage } = pageContext;
  if (!numPages || !currentPage) return null;

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prev = currentPage === 2 ? "/" : `/page/${currentPage - 1}`;
  const next = currentPage + 1;

  const start = getStart(currentPage, numPages);
  const nums = Array.from({ length: 5 }).map((_, i) => i + start);

  return (
    <div>
      <div>
        {!isFirst && (
          <span>
            <Link to={prev} rel="prev">
              Previous
            </Link>
          </span>
        )}
        <span>
          <ul>
            {nums.map((num) => (
              <li key={num} className={num === currentPage ? "num-active" : ""}>
                <Link to={num === 1 ? "/" : `/page/${num}`}>{num}</Link>
              </li>
            ))}
          </ul>
        </span>
        {!isLast && (
          <span>
            <Link to={`/page/${next}`} rel="next">
              Next
            </Link>
          </span>
        )}
      </div>
    </div>
  );
}
