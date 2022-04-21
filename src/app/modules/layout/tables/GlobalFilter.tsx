import React from 'react'

interface Props {
  filter: any
  setFilter: any
}

const GlobalFilter = ({filter, setFilter}: Props): JSX.Element => {
  return (
    <span className='col-xl-6'>
      {/* Search: {''} */}
      <input
        className='form-control form-control-lg'
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search: "
        style={{ border: '#cccccc solid 1px' }}
      />
      <br />
    </span>
  )
}

export default GlobalFilter
