import { ADD_USER, EDIT_USER, DELETE_USER } from '../Constant';

export const AddUser = (data) => {
  return {
    type: ADD_USER,
    data: data,
  };
};
export const editUser = (data, id) => {
  return {
    type: EDIT_USER,
    data: data,
    id: id,
  };
};
export const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    id: id,
  };
};
