import Resolver from '@forge/resolver';
import { deleteData, getAllProjects, getData, setData } from './my_API';

const resolver = new Resolver();

resolver.define('getText', (req) => {
    console.log(req);

    return 'Hello, world!';
});


resolver.define('getAllProjects', async () => {
  const res = await getAllProjects()
  return res
})

resolver.define('setData', async ({payload}) => {
  await setData(payload.key, payload.data)
})

resolver.define('getData', async ({payload}) => {
  const res = await getData(payload.key)
  return res
})

resolver.define('deleteData', async ({payload}) => {
  await deleteData(payload.key)
})

export const handler = resolver.getDefinitions();

