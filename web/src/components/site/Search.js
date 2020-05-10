import React, { useState } from 'react'
import { Link, navigateTo } from 'gatsby'
import cx from 'classnames'
import {
  InstantSearch,
  connectCurrentRefinements,
  connectHits,
  connectSearchBox,
  Highlight,
  Snippet,
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'

const Hits = connectHits(({ hits, query }) => {
  if (query.length > 0) {
    return (
      <div className="shadow-lg">
        <header className="p-2 bg-purple-100 text-purple-700 flex justify-between border-b border-gray-200">
          <h3 className="font-bold">Search Results</h3>
          <ClearRefinements clearsQuery />
        </header>
        <main
          className="bg-gray-50 rounded-b-md max-h-96 overflow-y-scroll"
          role="grid"
          tabIndex={-1}
        >
          {hits.length === 0 && (
            <div className="p-2 text-orange-700 font-semibold">
              Nothing found for &ldquo;{query}.&rdquo;
            </div>
          )}
          {hits.map((hit) => (
            <article
              key={hit.objectID}
              tabIndex={0}
              role="gridcell"
              onClick={() => navigateTo(hit.path)}
              onKeyDown={({ key }) => {
                if (key === 'Enter' || key === ' ') {
                  navigateTo(hit.path)
                }
              }}
              className="border-t border-gray-200 p-2 hover:bg-white focus:bg-white focus:outline-none focus:placeholder-gray-400 hover:shadow-outline-blue focus:shadow-outline-blue cursor-pointer"
            >
              <h4 class="font-bold text-gray-700">
                <Link to={hit.path}>
                  <Highlight attribute="title" hit={hit} />
                </Link>
              </h4>
              {hit.excerpt.length > 0 && (
                <blockquote className="p-1 mt-1 bg-blue-50 border border-blue-100 rounded">
                  <Snippet attribute="excerpt" hit={hit} tagName="mark" />
                </blockquote>
              )}
            </article>
          ))}
        </main>
      </div>
    )
  } else {
    return null
  }
})

const ClearRefinements = connectCurrentRefinements(({ items, refine }) => (
  <div className="flex items-center text-gray-600">
    <button onClick={() => refine(items)} disabled={!items.length}>
      <i className="far fa-times"></i>
    </button>
  </div>
))

const SearchBox = connectSearchBox(
  ({ currentRefinement, isSearchStalled, refine }) => {
    return (
      <>
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
          <i className="far fa-search"></i>
        </div>
        <input
          className={cx(
            isSearchStalled ? 'text-red-600' : 'text-gray-900',
            'block w-full h-full pl-8 pr-3 py-2 rounded-md placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm'
          )}
          placeholder="Search"
          aria-label="Search"
          type="search"
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
        />
      </>
    )
  }
)

const searchClient = {
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          processingTimeMS: 0,
        })),
      })
    }
    return algoliasearch(
      process.env.GATSBY_ALGOLIA_APP_ID,
      process.env.GATSBY_ALGOLIA_SEARCH_KEY
    ).search(requests)
  },
}

export function Search() {
  const [query, setQuery] = useState('')
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="PAGES"
      onSearchStateChange={({ query }) => setQuery(query)}
    >
      <label htmlFor="search_field" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <SearchBox />
        <Hits query={query} />
      </div>
    </InstantSearch>
  )
}
