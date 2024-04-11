import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from '../redux/user/userSlice';
import { useDispatch } from "react-redux";

export default function SignOut() {
    const dispatch = useDispatch();
  const handleSignOut = async () => {

   


    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      window.location.href = '/signin';
    } catch (error) {
      const data = error.response.data;
      dispatch(deleteUserFailure(data.message));
    }
  };


  return (<button onClick={handleSignOut}>Sign Out</button>)
}