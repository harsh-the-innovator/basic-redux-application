import jsonPlaceHolder from "../apis/jsonplaceholder";
import _ from "lodash";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  console.log("About to fetch posts");
  await dispatch(fetchPosts());
  console.log("Fetched posts");
  // const { posts } = getState();
  // const userIds = _.uniq(_.map(posts, "userId"));
  // userIds.forEach((id) => dispatch(fetchUser(id)));

  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach((id) => dispatch(fetchUser(id)))
    .value();
};

// fetch posts action creator
export const fetchPosts = () => async (dispatch, getState) => {
  const { data } = await jsonPlaceHolder.get("/posts");

  dispatch({
    type: "FETCH_POSTS",
    payload: data,
  });
};

export const fetchUser = (userId) => async (dispatch, getState) => {
  const { data } = await jsonPlaceHolder.get(`/users/${userId}`);

  dispatch({
    type: "FETCH_USER",
    payload: data,
  });
};

// MEMOIZED VERSION:

// export const fetchUser = (userId) => (dispatch, getState) => {
//   _fetchUser(userId, dispatch);
// };

// const _fetchUser = _.memoize(async (userId, dispatch) => {
//   const { data } = await jsonPlaceHolder.get(`/users/${userId}`);
//   dispatch({
//     type: "FETCH_USER",
//     payload: data,
//   });
// });
