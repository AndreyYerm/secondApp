import api, { route, fetch} from "@forge/api";
import { storage } from '@forge/api';


export async function getAllProjects() {
  const res = await api.asUser().requestJira(route`/rest/api/3/project`);
  const data = await res.json();
  return data;
}

export async function setData(key, data=''){
  await storage.set(key, data)

}

export async function getData(key) {
  const res = await storage.get(key)
  return res;
}

export async function deleteData(key){
  await storage.delete(key)

}
