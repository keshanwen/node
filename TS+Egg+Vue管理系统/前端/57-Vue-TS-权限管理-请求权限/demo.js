const path = '/api/v1/roles';
// 将来要判断的地址: /api/v1/roles/123
const reg = new RegExp(`^${path}(/[0-9]*)?$`, 'i');
console.log(reg.test('/api/v1/roles'));
console.log(reg.test('/api/v1/roles/1'));
console.log(reg.test('/api/v1/roles/123'));
console.log(reg.test('/api/v1/roles/123/123'));
console.log(reg.test('/api/v1/roles/a'));
console.log(reg.test('/api/v1/roles/a/b'));
