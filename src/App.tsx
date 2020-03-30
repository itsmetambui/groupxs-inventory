import React, { Suspense, lazy } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Spin } from "antd"

const Home = lazy(() => import("./pages/Home/Home"))
function App() {
  return (
    <div>
      <Router>
        <Suspense
          fallback={
            <div className="pt-12 text-center">
              <Spin></Spin>
            </div>
          }
        >
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  )
}

export default App
