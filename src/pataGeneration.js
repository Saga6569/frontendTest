import { resolve } from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

const getContent = (fullPath) => readFileSync(fullPath, 'utf-8');

const getFullPath = (path) => resolve(process.cwd(), path);

const getDiff = (path1) => {
  const content1 = getContent(getFullPath(path1));
  return content1;
};

const users = JSON.parse(getDiff('../__fixtures__/users.json'));
const conttentTv = JSON.parse(getDiff('../__fixtures__/content.json'));
const tvChannels = JSON.parse(getDiff('../__fixtures__/tvChannels.json'));

const makeTable = (userColl, contentColl, TVColl) => userColl.map((el) => {
  const nameUser = el.name;
  const favoriteContentId = el.favorite_content_id;
  const content = favoriteContentId.flatMap((id) => {
    const contentFavor = _.filter(contentColl, { favorite_content_id: id });
    return contentFavor;
  });
  const Tv = content.flatMap((tvObject) => {
    const nameTv = _.filter(TVColl, { channel_id: tvObject.channel_id }).map((tv) => tv.name);
    return nameTv;
  });
  return { name: nameUser, favotitTv: Array.from(new Set(Tv)) };
});

const data = makeTable(users, conttentTv, tvChannels);

console.log(data);

const makeForm = (arrUser) => {
  
};
