import React from 'react'

const CodePen = props => {
  const codePenData = props.children.filter(
    child => child.props.mdxType === 'pre'
  )
  const other = props.children.filter(child => child.props.mdxType !== 'pre')

  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <div style={{ width: '50%' }}>{other}</div>
      <div
        className="codepen"
        data-prefill
        data-height="500"
        data-editable
        data-default-tab="html,css,result"
      >
        {codePenData}
      </div>
    </div>
  )
}

export default CodePen
