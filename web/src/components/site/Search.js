import React from "react"
import {
  InstantSearch,
  SearchBox,
  Highlight,
  Hits
} from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"

function Hit(props) {
  return (
    <div>
      <Highlight attribute="title" hit={props.hit} />
      <Highlight attribute="excerpt" hit={props.hit} />
    </div>
  );
}

export function Search() {
  const searchClient = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY)
  return (
    // <>
    //   <label htmlFor="search_field" className="sr-only">Search</label>
    //   <div className="relative w-full text-gray-400 focus-within:text-gray-600">
    //     <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
    //       <i className="far fa-search"></i>
    //     </div>
    //     <input
    //       className="block w-full h-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
    //       placeholder="Search"
    //       aria-label="Search"
    //       type="search"
    //     />
    //   </div>
    // </>
    <InstantSearch searchClient={searchClient} indexName="PAGES">
      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  )
}