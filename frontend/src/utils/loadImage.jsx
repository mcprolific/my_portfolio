import React from 'react'

const loadImage = (filename) => {
  return new URL(`../assets/${filename}`, import.meta.url).href;
}

export default loadImage