import ImageCode from '../util/imageCode';

module.exports = {
    createImageCode() {
        return ImageCode.createImageCode(this.ctx);
    },
    verifyImageCode(clientCode){
        ImageCode.verifyImageCode(this.ctx, clientCode);
    }
};
