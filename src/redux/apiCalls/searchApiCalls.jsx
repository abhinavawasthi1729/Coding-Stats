import {
  clearsearch,
  heatmapsFetchSuccess,
  platformsFetchSuccess,
  searchFailure,
  searchStart,
  searchSuccess,
} from "../searchSlice";
import { publicRequest } from "../../requestMethods";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

// Function to fetch the profile of a searched user
export const getSearchedProfile = async (dispatch, user) => {
  dispatch(searchStart());
  toast("Searching Profile!");
  try {
    // Sending a GET request to retrieve the user's profile data
    const res = await publicRequest.get(`/user/profile/${user}`);
    // Dispatching action with the retrieved user data on success
    dispatch(clearsearch());
    dispatch(
      searchSuccess({
        user: res.data.data.user,
      })
    );
    return res;
  } catch (error) {
    // Handling errors by displaying a toast notification and dispatching failure action

    toast("User not Found!");
    dispatch(searchFailure());
    dispatch(clearsearch());
    return error;
  }
};

// Function to fetch details for each coding platform associated with the searched user

export const getSearchedPlatforms = async (dispatch, platforms) => {
  dispatch(searchStart());
  toast("Fetching User Details");
  try {
    const payload = [];
    await platforms.forEach(async (platform) => {
      try {
        const res = await publicRequest.get(
          `/${platform.platformName.toLowerCase()}/userdetails/${
            platform.platformHandler
          }`
        );
        // Checking if the retrieved profile link is not already present in the payload

        payload.filter((obj) => obj.profileLink == res.data.data.profileLink)
          .length === 0;
        payload.push(res.data.data);
        // Dispatching platformsFetchSuccess action once all requests are completed

        if (payload.length === platforms.length) {
          dispatch(
            platformsFetchSuccess({
              platforms: payload,
            })
          );
        }
      } catch (error) {
        toast("Unable to fetch user details");
      }
    });
  } catch (error) {
    toast(`${error.message}`);
    dispatch(searchFailure());
  }
};

export const getSearchedHeatmaps = async (dispatch, platforms) => {
  dispatch(searchStart());
  try {
    const payload = [];
    await platforms.forEach(async (platform) => {
      // Sending a GET request to retrieve user details for the current platform

      const res = await publicRequest.post(
        `/${platform.platformName.toLowerCase()}/userHeatMap`,
        {
          username: platform.platformHandler,
          userid: platform.platformUserId,
          year: new Date().getFullYear(),
        }
      );
      console.log(res.data.data);
      payload.filter((obj) => obj.profileLink == res.data.data.profileLink)
        .length === 0;
      payload.push(res.data.data);
      // Dispatching heatmapsFetchSuccess action once all requests are completed

      if (payload.length === platforms.length) {
        dispatch(
          heatmapsFetchSuccess({
            platforms: payload,
          })
        );
      }
    });
  } catch (error) {
    // Handling errors by displaying a toast notification and dispatching failure action

    toast("Unable to fetch user details");
    dispatch(searchFailure());
  }
};
