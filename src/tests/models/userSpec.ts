import { UserModel } from '../../models/user';

const userModel = new UserModel();

describe('User Model', () => {
  it('should create a user', async () => {
    const result = await userModel.createUser({
        username: 'Mad',
        password: '123456'
      });
    expect(result.username).toEqual('Mad');
  });

  it('should update a user', async () => {
    const users = await userModel.getUserById(2);

    const result = await userModel.updateUser({
        id: users.id,
        username: 'Shen',
        first_name: 'Shen',
        last_name: 'Long',
        password: '$2b$08$n83XcZd0oQ/zGnUbFOXnP.ZFPlTQq2oVQBG/PhYs9VhBWbnQ4yOc6'
    });
    expect(result.username).toEqual('Shen');
  });

  it('should return a list of users', async () => {
    const result = await userModel.getUsers();
    expect(result.length).toEqual(2);
  });

  it('should return the correct user by id', async () => {
    const users = await userModel.getUserById(2);
    expect(users.username).toEqual('Shen');
  });

  it('should return the correct user by username', async () => {
    const users = await userModel.getUserByUsername('Shen');
    expect(users.username).toEqual('Shen');
  });

  it('should delete the user', async () => {
    await userModel.deleteUser(3);
    const usersCurrent = await userModel.getUsers();

    expect(usersCurrent.length).toEqual(2);
  });
});
