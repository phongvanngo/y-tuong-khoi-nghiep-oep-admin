
const userApi = {
  getMe: () => {
    // TODO: Call API to get current user
    return new Promise((resolve, reject) => {
      // reject(new Error('MY CUSTOM ERROR'));
      // return;

      // Wait 500ms --> return result
      setTimeout(() => {


        resolve({

        })
      }, 500);
    })
  }
}

export default userApi;