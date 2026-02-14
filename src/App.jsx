import { RouterProvider, createRouter, createRoute, Outlet, useRouterState, createRootRoute } from '@tanstack/react-router';
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

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen bg-stone-50">
        <AnimatedOutlet />
      </div>
    </>
  ),
});


const routeTree = rootRoute.addChildren([
  createRoute({ ...RouteIndex, getParentRoute: () => rootRoute }),
  createRoute({ ...RouteRecipe, getParentRoute: () => rootRoute }),
  createRoute({ ...RouteFavorites, getParentRoute: () => rootRoute }),
  createRoute({ ...RoutePantry, getParentRoute: () => rootRoute }),
  createRoute({ ...RouteShoppingList, getParentRoute: () => rootRoute }),
]);


const router = createRouter({ routeTree });


function App() {
  return <RouterProvider router={router} />;
}

export default App;
