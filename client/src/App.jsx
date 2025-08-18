import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import WriteArticle from './pages/WriteArticle';
import BlogTitles from './pages/BlogTitles';
import GenerateImages from './pages/GenerateImages';

const App = () => {
  return (
    <div>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Layout with nested Dashboard */}
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="blog-titles" element={<BlogTitles />} />

          {/* Nested Generate Images routes */}
          <Route path="generate-images" element={<GenerateImages />}>
            <Route path="remove-background" element={<GenerateImages />} />
            <Route path="remove-object" element={<GenerateImages />} />
            <Route path="review-resume" element={<GenerateImages />} />
            <Route path="community" element={<GenerateImages />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
