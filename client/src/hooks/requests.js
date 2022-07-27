const API_URL = 'v1'




async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`)
  return await response.json()
  // TODO: Once API is ready.
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
   const response = await fetch(`${API_URL}/launches`);
   const launchesData = await response.json()
  return launchesData;
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  try{
    const response = await fetch(`${API_URL}/launches`, {
    method: 'POST',
    body: JSON.stringify(launch),
    headers: {
      'Content-Type':"application/json"
    }
  })
    return response.json();
  }catch(err) {
    return {
      ok: false
    }
  }
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  try{
    const response = await fetch(`${API_URL}/launches/${id}`, {
    method: 'DELETE'
  })
    return response
  }
  catch(err) {
    return {
      ok: false
    }
  }
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};