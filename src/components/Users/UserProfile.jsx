var UserProfile = (function() {
  var user = null;
  var organizations = [];
  var jwt = "";
  
  var getUser = function() {
    const savedUser = localStorage.getItem("user");
    const user = JSON.parse(savedUser);
    return user;    
    };
  
  var setUser = function(new_user) {
      user = new_user;
      localStorage.setItem("user", JSON.stringify(new_user));     
      
    };
  
  var getOrganizations = function() {
    const savedOrganizations = localStorage.getItem("organizations");
    const organizations = JSON.parse(savedOrganizations);
    return organizations; 
  }

  var getOrganizationFromId = function(id){
    const organizations = JSON.parse(localStorage.getItem("organizations"));
    for(let i = 0; i<organizations.length; i++){
      const org = organizations[i];
      if(org.organizationID===id){
        return org;
      }
    }
  }

  var setOrganizations = function(organizationList) {
    organizations = organizationList;
    localStorage.setItem("organizations", JSON.stringify(organizationList));
    const firstOrganization = organizationList[0];
    localStorage.setItem("selectedOrganization", firstOrganization.organizationID);
  }

  var getJwt = function() {
    const jwt = localStorage.getItem("jwt");
    return jwt;    
    };
  
  var setJwt = function(token) {
      jwt = token;     
      localStorage.setItem("jwt", token);
      
    };
  
  return {
      getUser: getUser,
      setUser: setUser,
      getOrganizations: getOrganizations,
      setOrganizations: setOrganizations,
      getOrganizationFromId: getOrganizationFromId,
      getJwt: getJwt,
      setJwt: setJwt     
    }
  
  })();
  
  export default UserProfile;