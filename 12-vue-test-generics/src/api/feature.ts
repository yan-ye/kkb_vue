import axios from "axios";

import { Feature } from "@/types";

export default function get_feature() {
   return axios.get<Feature[]>('/api/list')
}