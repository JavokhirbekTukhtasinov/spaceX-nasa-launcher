const launchesModel = require("../schemas/launches.schema");
const panetsModel = require("../schemas/planets.schema");
const launches = new Map();
const axios = require("axios");

const DEFAULT_FLIGHT_NUMBER = 100;

const getLatestFlightNumber = async () => {
  const flightNumber = await launchesModel.findOne(
    {},
    {},
    { sort: { flightNumber: -1 } }
  );
  if (!flightNumber) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return flightNumber.flightNumber;
};

const saveLaunch = async (launch) => {
  await launchesModel.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
};

const scheduleNewLaunch = async (launch) => {
  const planet = await panetsModel.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("Planet not found");
  }
  const flightNumber = (await getLatestFlightNumber()) + 1;
  launch.flightNumber = flightNumber;
  launch.upcoming = true;
  launch.success = false;
  launch.customers = ["SpaceX", "NASA"];
  await saveLaunch(launch);
};

const existsLaunchId = async (id) => {
  return await findLaucnh({ flightNumber: id });
};

const deleteLaunch = async (id) => {
  const abortedLaunch = await launchesModel.updateOne(
    {
      flightNumber: id,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  return abortedLaunch;
};

const getAllLaunches = async ({offset, limit}) => {
  return await launchesModel.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  ).skip(offset).limit(limit);
};


const findLaucnh = async (filter) => {
  return await launchesModel.findOne(filter);
};

const SpaceXUrl = "https://api.spacexdata.com/v4/launches/query";

const loadLaunchesData = async () => {
  const firstLauch = await findLaucnh({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

    if (firstLauch) {
    console.log("Launches already loaded");
  } else {
    const response = await axios.post(SpaceXUrl, {
      query: {},
      options: {
        pagination: false,
        populate: [
          {
            path: "rocket",
            select: {
              name: 1,
            },
          },
          {
            path: "payloads",
            select: {
              customers: 1,
            },
          },
        ],
      },
    });
    const launchDocs = response.data.docs;
    console.log("Launches data : ", response.data);
    for (let launch of launchDocs) {
      const launchDoc = {
        flightNumber: launch.flight_number,
        mission: launch.name,
        rocket: launch.rocket.name || "rocket name not found",
        launchDate: launch.date_local,
        target: launch.target_name,
        upcoming: launch.upcoming,
        success: launch.success,
        customers: launch.payloads.map((payload) => payload.customers).flat(),
      };
      await saveLaunch(launchDoc);
    }
  }
};

module.exports = {
  scheduleNewLaunch,
  loadLaunchesData,
  getAllLaunches,
  existsLaunchId,
  deleteLaunch,
};
