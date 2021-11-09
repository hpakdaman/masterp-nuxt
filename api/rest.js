import { json } from "body-parser";
const app = require("express")();
import mongoose from "mongoose";

app.use(json());

const conn_str =
  "mongodb+srv://hamed:tp123@cluster0.65n98.mongodb.net/masterp?retryWrites=true&w=majority";

let client;
async function programs(filters) {
  if (!client || [0, 3].includes(mongoose.connection.readyState)) {
    client = await mongoose.connect(conn_str, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  var Model = require("./models/Program.js");
  // var agregator = Model.aggregate(filters);
  // var data = await Model.aggregatePaginate(agregator, { page, limit });
  var data = await Model.aggregate(filters).exec();
  return data[0];
}

app.all("/programs", async (req, res) => {
  var filters = [
    // #### commented because the data has been updated and this altration has been made
    // {
    //   $addFields: {
    //     countries: { $split: ["$countries_id", ","] },
    //     disciplines: { $split: ["$disciplines_id", ","] },
    //     tuition_fee: { $toInt: "$tuition_fee" },
    //     duration_month: {
    //       $convert: {
    //         input: {
    //           $first: {
    //             $split: ["$duration", " "],
    //           },
    //         },
    //         to: "int",
    //         onError: "",
    //         onNull: "",
    //       },
    //     },
    //   },
    // },
  ];

  var options = {
    page: parseInt(req.query.page) || 1,
    limit: 10,
  };

  // query by disciplines
  if (req.query.disciplines) {
    filters.push({
      $match: {
        disciplines: { $in: req.query.disciplines.toString().split(",") },
      },
    });
  }

  // query by countries
  if (req.query.locations) {
    filters.push({
      $match: { countries: { $in: req.query.locations.toString().split(",") } },
    });
  }

  // query by countries
  if (req.query.tuition) {
    const renge = req.query.tuition.split(",");
    filters.push({
      $match: {
        tuition_fee: {
          $gte: parseInt(renge[0]),
          $lte: parseInt(renge[1]),
        },
      },
    });
  }

  // query by countries
  if (req.query.duration) {
    const renge = req.query.duration.split(",");
    filters.push({
      $match: {
        duration_month: {
          $gte: parseInt(renge[0]) * 12,
          $lte: parseInt(renge[1]) * 12,
        },
      },
    });
  }
  // query by degree
  if (req.query.degree) {
    filters.push({
      $match: {
        degree: req.query.degree,
      },
    });
  }

  // output fields
  filters.push({
    $project: {
      title: 1,
      summary: 1,
      contents: 1,
      logo: 1,
      organisation: 1,
      countries: 1,
      countries_formated: 1,
      disciplines: 1,
      ielts: 1,
      toefl_internet: 1,
      presence: 1,
      // level: 1,
      degree: 1,
      degree_formatted: 1,
      ects_credits: 1,
      gpa_required: 1,
      gpa_scale: 1,
      density: 1,
      methods: 1,
      requirements: 1,
      duration: 1,
      languages: 1,
      url: 1,
      start: 1,
      uni_rating_avg: 1,
      tuition_fee: 1,
    },
  });

  // calc total recourds / uses in pagination
  filters.push({
    $facet: {
      total: [
        {
          $count: "id",
        },
      ],
      data: [
        {
          $addFields: {
            _id: "$_id",
          },
        },
      ],
      countByCountry: [
        { $unwind: "$countries" },
        { $sortByCount: "$countries" },
      ],
      countByDisciplines: [
        { $unwind: "$disciplines" },
        { $sortByCount: "$disciplines" },
      ],
    },
  });

  // change total from array to onject
  filters.push({
    $unwind: "$total",
  });

  // create pagination
  var skip = (options.page - 1) * options.limit;
  filters.push({
    $project: {
      data: {
        $slice: [
          "$data",
          skip,
          {
            $ifNull: [options.limit, "$total.id"],
          },
        ],
      },
      report: {
        byCountry: "$countByCountry",
        byDisciplines: "$countByDisciplines",
      },
      meta: {
        total: "$total.id",
        limit: {
          $literal: options.limit,
        },
        page: {
          $literal: skip / options.limit + 1,
        },
        totalPages: {
          $ceil: {
            $divide: ["$total.id", options.limit],
          },
        },
      },
    },
  });

  const data = await programs(filters).catch((error) =>
    console.log(error.stack)
  );
  if (!data) res.json({ data: [], message: "no data!" });
  res.json(data);
});

app.all("/program/:id", async (req, res) => {
  var filters = [
    {
      $match: {
        _id: { $eq: mongoose.Types.ObjectId(req.params.id) },
      },
    },
    { $limit: 1 },
  ];
  // output fields
  filters.push({
    $project: {
      title: 1,
      summary: 1,
      contents: 1,
      logo: 1,
      organisation: 1,
      countries: 1,
      countries_formated: 1,
      disciplines: 1,
      ielts: 1,
      toefl_internet: 1,
      presence: 1,
      // level: 1,
      degree: 1,
      degree_formatted: 1,
      ects_credits: 1,
      gpa_required: 1,
      gpa_scale: 1,
      density: 1,
      methods: 1,
      requirements: 1,
      duration: 1,
      languages: 1,
      url: 1,
      start: 1,
      uni_rating_avg: 1,
      tuition_fee: 1,
    },
  });

  await mongoose.connect(conn_str, {
    useNewUrlParser: true,
  });

  var Model = require("./models/Program.js");

  // var agregator = Model.aggregate(filters);
  // var data = await Model.aggregatePaginate(agregator, { page, limit });
  var data = await Model.aggregate(filters).exec();
  mongoose.connection.close();
  res.json(data[0]);
});

module.exports = app;
