import React, { Fragment, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useStore } from 'react-redux';


const ProtectedRoute = ({token, children}) => {
    const [state, setState] = useState(useStore().getState())
  return (
      <Fragment>
          {!token ? (
            <Navigate to={'/'} />
          ): (
              children
          )}
      </Fragment>
  )
}

export default ProtectedRoute
