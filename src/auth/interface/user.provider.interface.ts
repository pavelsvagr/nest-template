export default interface UserProvider {
  getOne(id: string): Promise<any>;
}
