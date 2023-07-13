export const startTrainingSession = async (
  nrecords,
  userList,
  projectId,
  datetime
) => {
  try {
    const payload = {
      starting_number_of_records: nrecords,
      current_number_of_records: nrecords,
      date_started: datetime,
      date_updated: datetime,
      users: userList,
      projectId: projectId,
      domain: "Computing and information processing",
      limit_batch: 0,
    };
    
    const response = await fetch(`${window.API2_BASE_URL}/training`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const getTrainingSessionsByUser = async (id) => {
  try {
    const response = await fetch(`${window.API2_BASE_URL}/training/user/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const getTrainingSessionsByProject = async (id) => {
  try {
    const response = await fetch(
      `${window.API2_BASE_URL}/training/project/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const getUsersByProject = async (id) => {
  try {
    const response = await fetch(
      `${window.API2_BASE_URL}/training/project/${id}/users`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const checkTaskStatus = async (task_id) => {
  try {
    const response = await fetch(
      `${window.API2_BASE_URL}/training/task/${task_id}`
    );
    const data = await response.json();

    if (data.status === "completed") {
      return "Train Model";
    } else {
      return "Loading";
    }
  } catch (error) {
    console.log("Error checking task status:", error);
    return "Loading";
  }
};

//insights

export const getTrainingSessionInfo = async (sessionId) => {
  try {
    console.log(`${window.API2_BASE_URL}/training/${sessionId}/insights`);
    const response = await fetch(
      `${window.API2_BASE_URL}/training/${sessionId}/insights`
    );
    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const updatePositives = async (sessionId, userId, title, abstract) => {
  try {
    

    const updateResponse = await fetch(
      `${window.API2_BASE_URL}/training/${sessionId}/numberPositives/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          abstract: abstract,
        }),
      }
    );
    const data = await updateResponse.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const updateNegatives = async (sessionId, userId) => {
  try {
    // Update the project object with the modified participants array
    const updateResponse = await fetch(
      `${window.API2_BASE_URL}/training/${sessionId}/numberNegatives/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await updateResponse.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const updateUnknowns = async (sessionId, userId) => {
  try {
    // Update the project object with the modified participants array
    const updateResponse = await fetch(
      `${window.API2_BASE_URL}/training/${sessionId}/numberUnknown/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await updateResponse.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const updateRecordsLeft = async (sessionId) => {
  try {
    // Update the project object with the modified participants array
    const updateResponse = await fetch(
      `${window.API2_BASE_URL}/training/${sessionId}/recordsLeft`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await updateResponse.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const updateAnnotatedAbstracts = async (sessionId, abstractId) => {
  try {
    // Update the project object with the modified participants array
    const updateResponse = await fetch(
      `${window.API2_BASE_URL}/training/${sessionId}/annotatedAbstracts`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          abstractId: abstractId
        }),
      }
    );
    const data = await updateResponse.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
