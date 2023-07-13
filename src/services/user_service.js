export const fetchUsers = async () => {
    try {
      const response = await fetch(`${window.API_BASE_URL}/users`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  export const fetchUserData = async(userId) =>{
    try{
      const response = await fetch(`${window.API_BASE_URL}/users/${userId}`);
      const data = await response.json();
      return data;
    }catch(error){
      console.error('There was a problem with the fetch operation:', error);
    }
    
    
  };

  