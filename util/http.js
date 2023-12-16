import axios from 'axios';

const page = (url) => `http://localhost:3006/api/v1/${url}`;


export async function authenticate( email, password) {;
  const url = page('account/Login');
  const token = await axios.post(url, {
    username: email,
    password: password,
 });
  return token.data;
}

export async function createUser(email, password, fullname,phoneNumber) {
  const url = page('account');
    return await axios.post(url, {
      name: email,
      pass1: password,
      fullname: fullname,
      phoneNumber: phoneNumber
  });
}

export async function isToken(token1) {
  const url = 'account/timeToken'; 
  const headers = {
    token: token1
  };
  try {
    const response = await axios.post(page(url), {}, { headers }); 
    return response.data; 

  } catch (error) {
    throw new Error('Failed to check token');
  }
}


export async function createLocation(name, city, district,location ,phone,user_id) {
  const url = page('information');
    return await axios.post(url, {
      name: name,
      city: city,
      district:district,
      location: location ,
      phone:phone,
      user_id:user_id
  });
}

export async function getLocation(user_id) {
  const url = page(`information/${user_id}`);
    return await axios.get(url);
}






 export  const configAPI = {
      idLogin(username,password) {
         try{
            axios.post(page('account/Login'), {
                username: username,
                password: password
              })
              .then(function (res) {
                return res.data;
              })
              .catch(function (error) {
                console.log(error);
              });
         }catch(error) {
              console.error(error);
         }
      },
      isCreateUser(username,password) {
        try {
            axios.post(page('api/v1/account'), {
                 name: username,
                 pass1: password
            })
            .then(function (res){
                 return res.data;
            })
            .catch(function (error) {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
      },
      createDetail(name,city,district,location,phone,user_id) {
        try {
            axios.post(page('api/v1/account'), {
                 name: name,
                 city: city,
                 district: district,
                 location: location,
                 phone: phone, 
                 user_id:user_id

            })
            .then(function (res){
                 return res.data;
            })
            .catch(function (error) {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
      },
      selectUser() {
        try {
            axios.get(page('infor'))
            .then(function (res){
                return res.data;
           })
           .catch(function (error) {
               console.log(error);
           })
        } catch (error) {
            console.log(error);
        }
      },
     fetchProduct() {
        try {
            axios.get(page('product/getProduct'))
            .then(function (res){
                return res.data;
           })
            .catch(function (error) {
                return console.log(error);
           })
        } catch (error) {
            return console.log(error);
        }
      },    
 

}




