import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly _repository;

  constructor(repository: UserRepository) {
    this._repository = repository;
  }

  getOne(id: string) {
    return this._repository.detail({ id });
  }

  getMore(/* pagination etc... */) {
    return this._repository.list();
  }

  create(dto: CreateUserDto) {
    return this._repository.create(dto);
  }

  update(id: string, dto: UpdateUserDto) {
    return this._repository.update({ id }, dto);
  }

  delete(id: string) {
    return this._repository.delete({ id });
  }
}
