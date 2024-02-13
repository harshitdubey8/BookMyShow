import React from "react";
import "./AdminScreen.css";
import MovieAdmin from "./Admin/MovieAdmin";
import AdminTheater from "./Admin/AdminTheater";

function AdminScreen() {
  return (
    <div>
      <MovieAdmin />

      <AdminTheater />
    </div>
  );
}

export default AdminScreen;
