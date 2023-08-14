import { Service } from 'egg';

/**
 * Test Service
 */
export default class Users extends Service {

    public async getAll() {
        return this.ctx.model.User.findAll();
    }
}
