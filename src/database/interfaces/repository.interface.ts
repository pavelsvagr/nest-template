import { createRepository, Model } from 'databless/dist/lib/repository';

type RepositoryInterface = Pick<
  ReturnType<typeof createRepository>,
  'detail' | 'list' | 'count' | 'update' | 'create' | 'createBulk' | 'delete'
>;

export abstract class Repository implements RepositoryInterface {
  protected _model: Model;

  public detail: RepositoryInterface['detail'];
  public list: RepositoryInterface['list'];
  public count: RepositoryInterface['count'];
  public update: RepositoryInterface['update'];
  public create: RepositoryInterface['create'];
  public delete: RepositoryInterface['delete'];
  public createBulk: RepositoryInterface['createBulk'];
}
