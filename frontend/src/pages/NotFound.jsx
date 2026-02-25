import React from "react";

const NotFound = () => (
  <div className="min-h-[60vh] flex items-center justify-center p-8">
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">404 — Page not found</h1>
      <p className="text-gray-600">Looks like you are lost. <a href="/" className="text-primary underline">Go back home</a></p>
    </div>
  </div>
);

export default NotFound;
