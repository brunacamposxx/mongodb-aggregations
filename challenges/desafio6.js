db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /Won \d Oscars?/ },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      "media-rating": { $avg: "$imdb.rating" },
      "desvio-padrao": { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media-rating", 1] },
      desvio_padrao: { $round: ["$desvio-padrao", 1] },
    },
  },
]);
