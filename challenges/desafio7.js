db.movies.aggregate([
  {
    $match: {
      languages: "English",
    },
  },
  { $unwind: "$cast" },
  { $group: {
    _id: "$cast",
    numeroFilmes: { $sum: 1 },
    media: { $avg: "$imdb.rating" },
  },
  },
  { $sort: { numeroFilmes: -1, _id: -1 } },
  { $project: {
    _id: 1,
    numeroFilmes: 1,
    mediaIMDB: { $round: ["$media", 1] },
  },
  },
]);
