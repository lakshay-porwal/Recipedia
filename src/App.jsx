import { RouterProvider, Router, Route, Outlet } from '@tanstack/react-router';
import { createRootRoute } from '@tanstack/react-router';
import Header from './components/Header';
import { RouteIndex } from './routes/index';
import { RouteRecipe } from './routes/recipe';
import './index.css'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
});

const routeTree = rootRoute.addChildren([
  new Route({ ...RouteIndex, getParentRoute: () => rootRoute }),
  new Route({ ...RouteRecipe, getParentRoute: () => rootRoute }), 
]);


const router = new Router({ routeTree });


function App() {
  return <RouterProvider router={router} />;
}

export default App;
