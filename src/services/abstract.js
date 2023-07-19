
export const getRandomAbstract = async (sessionId) => {
    try {
      const response = await fetch(`${window.API2_BASE_URL}/training/${sessionId}/abstracts`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  export const checkBatch = async (sessionId) => {
    try {
      const response = await fetch(`${window.API2_BASE_URL}/training/${sessionId}/batch`);
      const data = await response.json();

     
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  export const newBatchProcess = async (sessionId) => {
    try {
      const response = await fetch(`${window.API2_BASE_URL}/training/${sessionId}/newBatch`);
      const data = await response.json();

     
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  export const getNextAbstractRanked = async (sessionId) => {
    try {
      const response = await fetch(`${window.API2_BASE_URL}/training/${sessionId}/abstracts/ranked`);
      const data = await response.json();
     
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  export const createUserResponse = async (sessionId, id, userId, pid, datetime, label) => {
    try {
      const updateResponse = await fetch(`${window.API2_BASE_URL}/training/${sessionId}/abstracts/${id}/response`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: 
            JSON.stringify({
                "abstractId": id,
                "user": userId,
                "projectId": pid,
                "trainingSessionId": sessionId,
                "prediction": label,
                "time_starts": datetime
            })
        });
        const responseData = await updateResponse.json();
      return responseData;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  export const userRespond = async (responseId, response, finalTimeSpent) => {
    try {
        // Update the project object with the modified participants array
        const updateResponse = await fetch(`${window.API2_BASE_URL}/training/response/${responseId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: 
            JSON.stringify({
                "response": response,
                "time_spent": finalTimeSpent
            })
        });
        const data = await updateResponse.json();
        
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};


export const addAbstractBackToList = async (sessionId, id) => {
  try {
    const updateResponse = await fetch(`${window.API2_BASE_URL}/training/${sessionId}/abstracts/${id}/exit`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      });
      const responseData = await updateResponse.json();
    return responseData;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};