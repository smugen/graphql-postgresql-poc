import base64url from 'base64url';
import { parse, stringify, validate, version } from 'uuid';

import { ModelName } from '../schema/entities/DaoIdentity';

const DELIMITER = '.';

interface DaoIdentity {
  modelName: string | ModelName;
  _id: string;
}

const isUUIDV4 = (id: string) => validate(id) && version(id) === 4;

export function daoIdToNodeId({ modelName, _id }: DaoIdentity) {
  if (!isUUIDV4(_id)) {
    throw new TypeError(`_id is not a valid DAO id: ${_id}`);
  }

  const modelNamePart = base64url(modelName as string);
  const _idPart = base64url(Buffer.from(parse(_id) as readonly number[]));

  return {
    nodeId: [modelNamePart, _idPart].join(DELIMITER),
  };
}

export function toDaoIdentity(nodeId: string): DaoIdentity {
  if (!nodeId.includes(DELIMITER)) {
    throw new TypeError(`nodeId is not a valid node id: ${nodeId}`);
  }

  const [modelNamePart, objectIdPart] = nodeId.split(DELIMITER);
  const modelName = base64url.decode(modelNamePart);
  const idBuf = base64url.toBuffer(objectIdPart);

  return {
    modelName,
    _id: stringify(idBuf),
  };
}
