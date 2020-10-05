import React, { useEffect, useState } from 'react'

import * as Diff2Html from 'diff2html'
import 'diff2html/bundles/css/diff2html.min.css'

function generateDiff(file) {
  let diffLine = `diff a/${file.filename} b/${file.filename}`

  let diffDetails = ''

  switch (file.status) {
    case 'added':
      diffDetails = `new file mode 100644\n--- /dev/null\n+++ b/${file.filename}`
      break
    case 'deleted':
      diffDetails = `--- a/${file.filename}\n+++ /dev/null`
      break

    case 'modified':
      diffDetails = `--- a/${file.filename}\n+++ b/${file.filename}`
      break

    default:
      diffDetails = `--- a/${file.filename}\n+++ b/${file.filename}`
      break
  }

  return `${diffLine}\n${diffDetails}\n${file.patch}\n`
}

function githubUrl({ repo, commit }) {
  return `https://api.github.com/repos/${repo}/commits/${commit}`
}

export function GithubCommitViewer({ repo, commit }) {
  const [commitRevealed, setCommitRevealed] = useState(false)

  const [diffHtml, setDiffHtml] = useState('')

  useEffect(() => {
    async function fetchCommitDetails(commit) {
      const response = await fetch(githubUrl({ repo, commit }))
      const json = await response.json()

      const diff = (json.files || [])
        .map((file) => generateDiff(file))
        .join('\n')

      const html = Diff2Html.html(diff, {
        drawFileList: true,
        matching: 'words',
        outputFormat: 'side-by-side',
      })

      setDiffHtml(`${html}`)
    }

    fetchCommitDetails(commit)
  }, [commitRevealed, repo, commit])

  return (
    <div>
      <div className="rounded-md bg-yellow-50 p-4 mb-4 shadow text-yellow-800 print:hidden">
        <div className="flex flex-wrap justify-between items-center">
          <div className="ml-3">
            <div className="mt-2 text-sm leading-5 text-yellow-700">
              Commit{' '}
              <a href={`https://github.com/${repo}/commit/${commit}`}>
                <span className="font-mono">{commit}</span>
              </a>{' '}
              in{' '}
              <span className="font-mono">
                <a href={`https://github.com/${repo}/tree/${commit}`}>{repo}</a>
              </span>
            </div>
          </div>
          <div className="inline-flex">
            <button
              className="mx-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 hover:border-transparent rounded"
              onClick={() =>
                setCommitRevealed((commitRevealed) => !commitRevealed)
              }
            >
              <span className={commitRevealed ? 'hidden' : 'inline'}>
                <i className="fas fa-eye"></i>
              </span>
              <span className={commitRevealed ? 'inline' : 'hidden'}>
                <i className="fas fa-eye-slash"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
      <p></p>
      {commitRevealed && (
        <div dangerouslySetInnerHTML={{ __html: diffHtml }}></div>
      )}
    </div>
  )
}
