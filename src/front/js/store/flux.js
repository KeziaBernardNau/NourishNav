const apiUrl = process.env.BACKEND_URL;

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      token: null,
      user: null,
      favorites: [],
      saveDiet: {},
    },
    actions: {
      addFavorites: async (fav) => {
        try {
          const response = await fetch(apiUrl + "/favorites", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              recipe_name: fav,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to add favorite");
          }

          const data = await response.json();
          console.log(data);

          setStore({ favorites: [...getStore().favorites, fav] });
        } catch (error) {
          console.error("Error adding favorite:", error);
        }
      },

      removeFavorites: async (fav) => {
        try {
          const response = await fetch(apiUrl + "/favorites", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              recipe_name: fav,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to remove favorite");
          }

          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error("Error removing favorite:", error);
        }
      },

      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      signUp: async (form, callback) => {
        try {
          const response = await fetch(`${apiUrl}/api/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          });

          if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Signup failed");
          }

          const userData = await response.json();
          setStore({ user: { ...userData, weight: form.weight, activity_level: form.activity_level, name: form.name } });

          if (callback) callback();
        } catch (error) {
          console.error("Signup error:", error);
          throw error;
        }
      },

      login: async (form) => {
        try {
          const resp = await fetch(`${apiUrl}/api/token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: form.email,
              password: form.password,
            }),
          });
          if (!resp.ok) {
            // Throw an error to be caught in the catch block
            throw new Error("Wrong email or password");
          }
          const data = await resp.json();
          sessionStorage.setItem("token", data.token);
          setStore({ token: data.token });
          setStore({ user: data.user });
          return await true;
        } catch (error) {
          console.error("Login error:", error);
          // Rethrow or handle error appropriately
          throw error;
        }
      },

      logout: (navigate) => {
        setStore({ user: null });
        sessionStorage.removeItem("token");
        setStore({ token: null });
        navigate("/");
      },

      authenticateUser: () => {
        return new Promise((resolve, reject) => {
          fetch(apiUrl + "/api/private", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem('token'),
            },
          })
            .then((resp) => {
              if (!resp.ok) {
                throw new Error("Authentication failed");
              }
              return resp.json();
            })
            .then((data) => {
              setStore({ user: data });
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },



      fetchProfilePicture: async () => {
        try {
          const resp = await fetch(`${apiUrl}/api/profilePicture`, {
            method: "GET",
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem('token'),
            },
          });
          if (!resp.ok) {
            throw new Error("Failed to fetch profile picture");
          }
          const data = await resp.json();

          return data.profile_picture;
        } catch (error) {
          console.error("Fetch profile picture error:", error);
          throw error;
        }
      },

      updateUser: async (email, weight, activityLevel, profilePicture) => {
        try {
          const fetchedProfilePicture = await getActions().fetchProfilePicture();
          const resp = await fetch(`${apiUrl}/api/updateUser`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.getItem('token'),

            },
            body: JSON.stringify({
              email: email,
              weight: weight,
              activity_level: activityLevel,
              profile_picture: fetchedProfilePicture || profilePicture
            }),
          });
          if (!resp.ok) {

            throw new Error("Cannot update user");
          }
          const data = await resp.json();
          console.log(data, "user profile info")
          return true;
        } catch (error) {
          console.error("Update error:", error);

          throw error;
        }
      },
      tokenFromStore: () => {
        const token = sessionStorage.getItem("token");
        if (token && token != null && token != undefined) {
          setStore({ token: token });
        }
      },


      CreateDietPlan: (diet) => {
        setStore({ saveDiet: diet })
      }
    },

    changePassword: async (token, password) => {
      console.log(token, password);
      const opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          password: password,
        }),
      };
      const res = await fetch(process.env.BACKEND_URL + "/api/recoverPassword", opts);
      if (res.status < 200 || res.status >= 300) {
        throw new Error("There was an error changing password");
      }
      const data = await res.json();

      console.log("USER INFO HERE", data)
      return true;
    },
  };
};



export default getState;

