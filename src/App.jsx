<<<<<<< HEAD
import { RouterProvider, Router, Route, Outlet } from '@tanstack/react-router';
import { createRootRoute } from '@tanstack/react-router';
import Header from './components/Header';
import { RouteIndex } from './routes/index';
import { RouteRecipe } from './routes/recipe';
import './index.css'
=======
import { RouterProvider, Router, Route, Outlet, useRouterState } from '@tanstack/react-router';
import { createRootRoute } from '@tanstack/react-router';
import Navbar from './components/Navbar';
import { RouteIndex } from './routes/index';
import { RouteRecipe } from './routes/recipe';
import { RouteFavorites } from './routes/favorites';
import { RoutePantry } from './routes/pantry';
import { RouteShoppingList } from './routes/shopping-list';
import './index.css';
import { AnimatePresence, motion } from 'framer-motion';

// Component to handle animations
function AnimatedOutlet() {
  const state = useRouterState();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={state.location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
>>>>>>> 93149ce (enahnce features)

const rootRoute = createRootRoute({
  component: () => (
    <>
<<<<<<< HEAD
      <Header />
      <Outlet />
=======
      <Navbar />
      <div className="pt-16 min-h-screen bg-stone-50">
        <AnimatedOutlet />
      </div>
>>>>>>> 93149ce (enahnce features)
    </>
  ),
});

<<<<<<< HEAD
const routeTree = rootRoute.addChildren([
  new Route({ ...RouteIndex, getParentRoute: () => rootRoute }),
  new Route({ ...RouteRecipe, getParentRoute: () => rootRoute }), 
=======

const routeTree = rootRoute.addChildren([
  new Route({ ...RouteIndex, getParentRoute: () => rootRoute }),
  new Route({ ...RouteRecipe, getParentRoute: () => rootRoute }),
  new Route({ ...RouteFavorites, getParentRoute: () => rootRoute }),
  new Route({ ...RoutePantry, getParentRoute: () => rootRoute }),
  new Route({ ...RouteShoppingList, getParentRoute: () => rootRoute }),
>>>>>>> 93149ce (enahnce features)
]);


const router = new Router({ routeTree });


function App() {
  return <RouterProvider router={router} />;
}

export default App;
<<<<<<< HEAD
=======

>>>>>>> 93149ce (enahnce features)
