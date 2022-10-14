function sortSelector(sortValue) {
  switch(sortValue) {
    case 'A-Z':
      return { name: 'asc' }
    case 'Z-A':
      return { name: 'desc' }
    case 'category':
      return { category: 'asc' }
    case 'location':
      return { location: 'asc' }
    case 'rating-desc':
      return { rating: 'desc' }
    case 'rating-asc':
      return { rating: 'asc' }
  }
}

module.exports = sortSelector