import React, { Fragment, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useStore } from 'react-redux';


const ProtectedRoute = ({ children}) => {
    const [state, setState] = useState(useStore().getState())
  return (
      <Fragment>
          {!state.token ? (
            <Navigate to={'/'} />
          ): (
              children
          )}
      </Fragment>
  )
}

export default ProtectedRoute