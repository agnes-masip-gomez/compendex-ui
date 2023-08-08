import { fetchUserData } from "./user_service";

export const fetchUsersOfAProject = async (id) => {
  try {
    const response = await fetch(`${window.API_BASE_URL}/projects/${id}`);
    const data = await response.json();
    const names = [];

    for (const p of data.participants) {
      const userData = await fetchUserData(p);
      names.push(userData.fullname);
    }
    return names;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const fetchPrecisionProject = async (id) => {
  try {
    const response = await fetch(`${window.API2_BASE_URL}/training/${id}/precision`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};


export const fetchPrecisionsLabelProject = async (id) => {
  try {
    const response = await fetch(`${window.API2_BASE_URL}/training/${id}/precision/labels`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const updateParticipants = async (id, formData) => {
  try {
    // Fetch the current project object
    console.log("update participant function")
    const response = await fetch(`${window.API_BASE_URL}/projects/${id}`);
    const project = await response.json();
    // Add the new participant to the participants array
    if(project.participants.includes(formData.participant)){
        return "participant already in list"
    }else{
      project.participants.push(formData.participant);

    // Update training sessions participants
    const tsessionResponse = await fetch(
      `${window.API2_BASE_URL}/training/project/${id}`
    );
    const tsession = await tsessionResponse.json();
    console.log(tsession)
    // TODO: refactor this for more than one training session
    if (tsession !== 0) {
      console.log("fuck")
      const updateTsessionResponse = await fetch(
        `${window.API2_BASE_URL}/training/${tsession[0]._id}/users/${formData.participant}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      const tdata = await updateTsessionResponse.json();
      console.log("yees")
      // console.log(tdata)
    }

    // Update the project object with the modified participants array
    const updatedProject = { ...project, participants: project.participants };
    //console.log(updatedProject);
    const updateResponse = await fetch(
      `${window.API_BASE_URL}/projects/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      }
    );
    const data = await updateResponse.json();
    console.log(data);
    return "added user"
    }
    
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const deleteParticipant = async (id, participant) => {
  try {
    // Fetch the current project object
    const response = await fetch(`${window.API_BASE_URL}/projects/${id}`);
    const project = await response.json();

    // Filter out the participant to be deleted
    const updatedParticipants = project.participants.filter(
      (p) => p.name !== participant._id
    );
    console.log(updatedParticipants);
    console.log(participant);

    // Update training sessions participants
    const tsessionResponse = await fetch(
      `${window.API2_BASE_URL}/training/project/${id}`
    );
    const tsession = await tsessionResponse.json();
    // TODO: refactor this for more than one training session
    if (tsession) {
      const updateTsessionResponse = await fetch(
        `${window.API2_BASE_URL}/training/${tsession[0]._id}/users/${participant}/delete`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      const tdata = await updateTsessionResponse.json();
    }
    // Update the project object with the modified participants array
    const updatedProject = { ...project, participants: updatedParticipants };
    const updateResponse = await fetch(
      `${window.API_BASE_URL}/projects/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      }
    );
    const data = await updateResponse.json();
    console.log(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const fetchData = async () => {
  const response = await fetch(`${window.API_BASE_URL}/projects`);
  const data = await response.json();
  return data;
};

export const fetchDataByRole = async (userId) => {
  var userAdmin = false;
  const userData = await fetchUserData(userId);
  userAdmin = userData.admin;

  const data = await fetchData();
  if (userAdmin) {
    return data;
  } else {
    const userProjects = data.filter((project) =>
      project.participants.some((participant) => participant === userId)
    );
    console.log(userProjects);
    return userProjects;
  }
};

export const createProject = async (formData) => {
  const response = fetch(`${window.API_BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};
