import React from 'react'
import { Link, graphql } from 'gatsby'
import { Layout } from '../components/site/Layout'

export default function WarningPage({
  data: {
    allWarning: { nodes: warnings },
  },
}) {
  return (
    <Layout title="Warnings">
      <div className="flex flex-col">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {warnings.map(({ id, type, message, ...meta }) => (
                  <tr key={id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-gray-500 uppercase">
                      {type}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">
                      {(() => {
                        switch (type) {
                          case 'lesson':
                            return (
                              <h3 className="font-bold text-blue-500">
                                <Link to={`/lessons/${meta.slug}`}>
                                  {meta.slug}
                                </Link>
                              </h3>
                            )
                          case 'file':
                            return meta.filePath
                        }
                      })()}
                      <p>{message}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allWarning {
      nodes {
        id
        type
        message
        slug
        filePath
      }
    }
  }
`
