// src/components/PageTransitionWrapper.jsx
import { motion, AnimatePresence } from "framer-motion";

const PageTransitionWrapper = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        key="page-transition"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: 20 }} 
        transition={{ duration: 0.4 }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransitionWrapper;
