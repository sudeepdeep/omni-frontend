import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Feed from "../components/Home/Feed/Feed";
import axios from "axios";

function CommonLand() {
  return <Feed />;
}

export default CommonLand;
