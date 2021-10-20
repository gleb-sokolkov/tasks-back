interface RestAPIRoutes<T, P, D> {
  getOne(p: P): Promise<T>;
  getAll(p: P): Promise<T[]>;
  createOne(p: P, d: D): Promise<T>;
  deleteOne(p: P): Promise<void>;
  deleteAll(p: P): Promise<void>;
  updateOne(p: P, d: D): Promise<T>;
}

interface RestAPIService<T, P, D> {
  findOne(p: P): Promise<T>;
  findAll(p: P): Promise<T[]>;
  createOne(p: P, d: D): Promise<T>;
  deleteOne(p: P): Promise<void>;
  deleteAll(p: P): Promise<void>;
  updateOne(p: P, d: D): Promise<T>;
}

export { RestAPIRoutes, RestAPIService };
